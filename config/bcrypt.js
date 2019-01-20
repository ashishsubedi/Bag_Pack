const bcrypt = require('bcryptjs');


    // generating a hash
    generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };
    // checking if password is valid
    validPassword = function (password, databasePassword) {
        return bcrypt.compareSync(password,databasePassword);
    };

module.exports = {
    generateHash,validPassword
};

