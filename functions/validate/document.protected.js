const assets = Runtime.getAssets();
const validateDocumentPath = assets['/validate.js'].path;
const {validateDocument} = require(validateDocumentPath);

exports.handler = function(context, event, callback) {
    if (!validateDocument(event.document))
        return callback('Document not valid')

    return callback()
};