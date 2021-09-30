const Users = require('../models/dbModel');
const bcrypt = require('bcrypt');

module.exports = class UserService {
    async create(details) {
        const dataa = await Users.query().where('email', details.email)
        if (!dataa[0]) {

            const pass = await bcrypt.hash(details.password, 5)
            details['password'] = pass
            return await Users.query().insert(details);
        }
        return ({ "email": "already use" })
    }
    async findAll(txn) {
        return await Users.query();
    }
    async findById(userid) {
        const userId = await Users.query().findById(userid);
        if (userId == undefined) {
            return ({ "Sorry": "user not found" })
        }
        return userId;
    }
    async deleteById(wedelete) {
        const ip = await Users.query().deleteById(wedelete);
        if (ip == 0) {
            return ({ "Sorry": "user id not found" })
        }
        return ({ "id": "successfull deleted" })
    }
    async updateById(id, updated) {
        //////
        const pass = await bcrypt.hash(updated.password, 5)
        updated['password'] = pass
        ///////
        const upp = await Users.query()
            .update(updated)
            .where('id', id);
        if (upp == 0) {
            return ({ "sorry": "id not found" });
        }
        return ({ "data": "successful added" })
    }
    async loginById(loged) {

        const { email, password } = loged;
        if (!email || !password) {
            return ({ "Sorry": "user email or password not found" })
        }

        const logg = await Users.query().where('email', loged.email)

        if (!logg[0]) {

            return ({ "user": "email not correct" })
        }

        const pass = await bcrypt.compare(loged.password, logg[0].password)
        console.log(pass);
        if (pass) {
            return ({ "user": "successful login" })
        }return ({"message":'incorrect password'})
    }
}
