"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundTottaly = exports.pagination = exports.checkIsAValidCategory = exports.categories = exports.checkIsAValidNumber = exports.isValidEmail = exports.isAValidString = void 0;
const isAValidString = (value, maxLength = 15) => {
    if (!value || typeof value !== 'string')
        return false;
    if (value.length <= 4 || value.length >= maxLength)
        return false;
    return true;
};
exports.isAValidString = isAValidString;
const isValidEmail = (email) => {
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
const checkIsAValidNumber = (value) => {
    if (typeof value === 'boolean')
        return false;
    const number = Number(value);
    if (value === null ||
        value === undefined ||
        value === '' ||
        isNaN(number) ||
        number <= 0) {
        return false;
    }
    const isValidFormat = /^[0-9]+(\.[0-9]+)?$/.test(String(value));
    if (!isValidFormat)
        return false;
    return true;
};
exports.checkIsAValidNumber = checkIsAValidNumber;
exports.categories = [
    "Roupas",
    "Eletrônicos",
    "Livros",
    "Brinquedos",
    "Beleza",
    "Esporte",
    "Automotivo",
    "Cozinha",
    "Celulares",
    "Informática",
    "Jardim",
    "Petshop",
    "Mercearia",
    "Moda",
    "Acessórios"
];
const normalizeString = (str) => str.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const checkIsAValidCategory = (category) => {
    const normalizedInput = normalizeString(category);
    return exports.categories.some(cat => normalizeString(cat) === normalizedInput);
};
exports.checkIsAValidCategory = checkIsAValidCategory;
const pagination = ({ totalItems, page, limit }) => {
    const totalPages = Math.ceil(totalItems / limit);
    if (page > totalPages) {
        page = totalPages;
    }
    const skip = (page - 1) * limit;
    return {
        currentPage: page,
        skip,
        totalPages
    };
};
exports.pagination = pagination;
const roundTottaly = (value, decimals = 2) => {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
exports.roundTottaly = roundTottaly;
