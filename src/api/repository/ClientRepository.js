const BaseRepository = require('./BaseRepository');
const {flatObject} = require('../helpers/utilities');

class ClientRepository extends BaseRepository {
    static add = async (client) => {
        try {
            let flated = flatObject(client);

            return await super.add('clients', flated);
        }
        catch (err) {
            throw err;
        }
    }

    static update = async (client) => {
        try {
            let flated = flatObject(client);

            return await super.update('clients', flated);
        }
        catch (err) {
            throw err;
        }
    }

    static getById = async (id) => {
        try {
            let client =  await super.getById('clients', 'id', id);      
            
            if(client){
                return client;
            }
            else{
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }

    static find = async (full_name) => {
        try {
            let results = await super.find('clients', 'full_name', full_name);

            if (results.length > 0) {
                return results;
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = ClientRepository;