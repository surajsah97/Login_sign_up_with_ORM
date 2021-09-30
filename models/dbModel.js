const { Model } = require('objection')
const knex = require('../config/db')
Model.knex(knex)

class Users extends Model{
    static get tableName(){
        return 'user'
    }
    static get jsonSchema(){
        return{
            type:'object',
            required:['email'],
            properties:{
                id:'integer',
                name:{type:'string'},
                email:{type:'string'},
                password:{type:'string'},

            }
        }
    }

    
}

module.exports = Users