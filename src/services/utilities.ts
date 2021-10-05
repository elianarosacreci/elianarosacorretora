import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import slug from 'slug';

const mapKind = new Map()
mapKind.set('Apartamento', 'AP')
mapKind.set('Cobertura', 'CO')
mapKind.set('Casa', 'CA')
mapKind.set('Casa de Condominio', 'CACO')
mapKind.set('Terreno', 'TE')
mapKind.set('Conjunto Comercial', 'COCO')
mapKind.set('Galpão', 'GA')
mapKind.set('Sitio/Fazenda', 'SIFA')
mapKind.set('Prédio Inteiro', 'PRIN')
mapKind.set('Loja', 'LO')
mapKind.set('Imóvel Comercial', 'IMCO')

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

async function validateUUID(uuid) {
    return new Promise(async (resolve, reject) => {
        try {
            let validated = uuidValidate(uuid)
            resolve(validated);
        } catch (error) {
            console.log('services - utilities.js - validateUUID - Erro: ', error);
            reject('error');
        };
    });
};

async function getCode(immobileKind) {
    return new Promise(async (resolve, reject) => {
        try {
            let uuid = uuidv4();
            let newUuid = uuid.replace(/-.*/, '')
            let code = `${mapKind.get(immobileKind)}-${newUuid}`
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
    validateUUID,
    getCode,
    getSlug
};