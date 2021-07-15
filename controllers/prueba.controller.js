const { response, request } = require("express");
// const { getDATA, getResultado } = require('../helpers/getGeo.helper');
const ipstack = require('ipstack');
const { getResultGeo } = require("../helpers/getGeo.helper");


const point = 'http://api.ipstack.com';
// const ipprueba = req.headers['x-forwarded-for'] || '181.123.0.29';
const ipprueba = req.headers['x-forwarded-for'];
// const ipprueba = '181.123.0.29';
const accesskey = '4c2594c643861f24b775bb0d5ca4086e';
const url = `${point}/${ipprueba}?access_key=${accesskey}`;



const prueba = async (req = request, resp = response) => {
  

    const data = await getResultGeo(ipprueba, accesskey);
    console.log('hola desde nose', data);
   
    
}

module.exports = {
    // prueba
    prueba
}