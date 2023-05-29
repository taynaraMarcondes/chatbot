const assets = Runtime.getAssets();
const validateNamePath = assets['/validate.js'].path;
const {validateName} = require(validateNamePath);

exports.handler = function(context, event, callback) {
    if (validateName(event.name)) {
        return callback();
    }
    return callback('Error');
};