const assets = Runtime.getAssets();
const validateBirthdatePath = assets['/validate.js'].path;
const {validateBirthdate} = require(validateBirthdatePath);

exports.handler = function(context, event, callback) {
  if (validateBirthdate(event.birthdate)) {
      return callback();
  }
  return callback('Error');
};