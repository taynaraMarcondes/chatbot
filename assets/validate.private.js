const { validate } =require('gerador-validador-cpf');

module.exports = {
    validateDocument(document){
        return validate(document);
    },
    validateBirthdate(birthdate){
        const regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([1-9][0-9]{3})$/;
        const [day, month, year] = birthdate.split('/');
        const currentYear = new Date().getFullYear();

        return regex.test(birthdate) && year < currentYear;
    },
    validateEmail(email){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);
    },
    validateName(name){
        const regex = /^[a-zA-Z]+$/;

        return regex.test(name);
    },
}