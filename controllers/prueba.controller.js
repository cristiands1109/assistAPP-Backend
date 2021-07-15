const { response, request } = require("express");
// const { getDATA, getResultado } = require('../helpers/getGeo.helper');
// const ipstack = require('ipstack');
const { getResultGeo } = require("../helpers/getGeo.helper");


// const ipprueba = req.headers['x-forwarded-for'] || '181.123.0.29';



const prueba = async (req = request, resp = response) => {
    
    const accesskey = '4c2594c643861f24b775bb0d5ca4086e';
    // const ip = req.headers['x-forwarded-for'];
    const ip = '181.123.0.29';
    // const ip = '170.51.53.148';

    if(!ip) {
       return resp.json({
           msg: 'No se puede obtener la ubicacion, favor contactar con el ADMINISTRADOR'
       })
    }
    const data = await getResultGeo(ip, accesskey);
    
    console.log('hola desde nose', data);
    const [lat, lng] = [data.latitude, data.longitude]
    resp.json({
        lat,
        lng,
        data
    })
    
}

module.exports = {
    // prueba
    prueba
}