const assets = Runtime.getAssets();
const dbConnectionPath = assets['/db/connection.js'].path;
const dbConnection = require(dbConnectionPath);

exports.handler = async function(context, event, callback) {
  console.log('amigo estou aqui')
  let response = {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: {
      data: null,
      success: false
    }
  }
  let db = {}
  const document = event.clientDocument
  try {
    db = await dbConnection(context)
    console.log('document',document);
    const client = await db.query(`
      SELECT * FROM clients
      WHERE document = ${document}
    `);
    console.log('cliente',client);
    if (client.length > 0){
      response.body = {
        data: client,
        success: true
      }
      return callback(null, response);
    }
  } catch (error) {
    console.log(error);
    return callback('Erro ao buscar cliente!', response);
  } finally {
    if (db !== {})
      await db.close();
  }
  // response = {
  //   statusCode: 200,
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ data })
  // };

  return callback('Cliente inexistente', response);
};
