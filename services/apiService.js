const axios = require('axios');

const ApiUrl = 'https://www.demonslayer-api.com/api/v1/characters?';

async function getAllCharacters(limit = 10,page = 1) {
    const response = await axios.get(ApiUrl + `limit=${limit}&page=${page}`);
    return response.data.content;
}

async function getCharacterByName(nombre) {
    const response = await axios.get(ApiUrl + `name=${nombre}`);
    return response.data.content;
}

async function getCharacterById(id) {
    const response = await axios.get(ApiUrl + `id=${id}`);
    return response.data.content;
}

module.exports = {
    getAllCharacters,
    getCharacterByName,
    getCharacterById
};
