const bcrypt = require('bcrypt');

exports.hashPassword =  async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword
}

exports.comparePassword = async ({password, hashPassword}) => {
    return (await bcrypt.compare(password, hashPassword))
}
