const assets = Runtime.getAssets();
const validateEmailPath = assets['/validate.js'].path;
const {validateEmail} = require(validateEmailPath);

exports.handler = function(context, event, callback) {
    if (validateEmail(event.email)) {
        return callback();
    }
    return callback('Error');
  };