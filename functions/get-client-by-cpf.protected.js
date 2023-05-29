const assets = Runtime.getAssets();
const dbConnectionPath = assets['/db/connection.js'].path;
const dbConnection = require(dbConnectionPath);

exports.handler = async function(context, event, callback) {
  let response = {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: {
      data: null,
      success: false,
    },
  }
  let db = {};
  const document = event.clientDocument;

  try {
    db = await dbConnection(context);
    const client = await db.query(`
      SELECT * FROM clients
      WHERE document = ${document}
    `);

    if (client.length > 0){
      response.body = {
        data: client,
        success: true,
      };
      return callback(null, response);
    }
  } catch (error) {
    console.log(error);
    return callback('Erro ao buscar cliente!', response);
  } finally {
    if (db !== {})
      await db.close();
  }

  return callback('Cliente inexistente', response);
};
