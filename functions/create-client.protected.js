const assets = Runtime.getAssets();
const dbConnectionPath = assets['/db/connection.js'].path;
const validatePath = assets['/validate.js'].path;
const dbConnection = require(dbConnectionPath);
const {validateBirthdate,validateName,validateEmail,validateDocument} = require(validatePath);

let db = {}
let response = {
  statusCode: 200,
  headers: { 'Content-Type': 'application/json' },
  body: {
    success: false
  }
}
exports.handler = async function(context, event, callback) {
  console.log('amigo estou ali')

  try {
    db = await dbConnection(context)
    const {
        name,
        document,
        birthdate,
        email
    } = JSON.parse(event.body);

    const isOk = await validateBody(JSON.parse(event.body))
    console.log('isok', isOk)
    console.log('response', response)
    if (!isOk) {
      return callback('Erro', response);
    }
    const { affectedRows } = await db.query(`
      INSERT INTO clients (client_name, document, birthdate, email)
      VALUES (?, ?, ?, ?)
    `,[name, document, birthdate, email]);
    console.log('affectedRows',affectedRows);
    if (affectedRows !== 0){
      response.body = {
        data: JSON.parse(event.body),
        success: true
      }
      return callback(null, response);
    }
  
  } catch (error) {
    console.log(error)
    return callback('Erro ao criar cliente!', response);
  } finally {
    if (db !== {})
      await db.close();
  }
  return callback('Erro ao criar cliente!', response);
};

const validateBody = async (body) => {
  try {
    const docExists = await validateClient(body.document)
    if (docExists === 1){
      response.body.message = 'Document already exists!'
      return true
    } else if (!validateName(body.name)) {
      response.body.message = 'Error to validate name field'
    } else if (!validateEmail(body.email)) {
      response.body.message = 'Error to validate email field'
    } else if (!validateDocument(String(body.document))){
      console.log('docfield',body.document)
      response.body.message = 'Error to validate document field'
    } else if (!validateBirthdate(body.birthdate)) {
      response.body.message = 'Error to validate birthdate field'
    } else {
      return true
    }
    return false
  } catch (error) {
    console.log(error)
  }
}

const validateClient = async (document) => {
  const data = (await db.query(`
    SELECT 1 AS docExists 
    FROM clients
    WHERE document = ${document}
  `))
  let docExists = 0
  if (data.length > 0)
    [{ docExists }] = data

  return docExists
}