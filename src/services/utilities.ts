import { v4 as uuidv4 } from 'uuid';
import slug from 'slug';

async function getUUID() {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(uuidv4());
        } catch (error) {
            console.log('services - utilities.js - getUUID - Erro: ', error);
            reject('error');
        };
    });
};

async function getCode() {
    return new Promise(async (resolve, reject) => {
        try {
            let uuid = uuidv4();
            let code = uuid.replace(/-.*/, '')
            resolve(code);
        } catch (error) {
            console.log('services - utilities.js - getCode - Erro: ', error);
            reject('error');
        };
    });
};

async function getSlug(text) {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(slug(text));
        } catch (error) {
            console.log('services - utilities.js - getSlug - Erro: ', error);
            reject('error');
        };
    });
};

export default {
    getUUID,
    getCode,
    getSlug
};