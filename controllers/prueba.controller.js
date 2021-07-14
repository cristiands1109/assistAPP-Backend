const { response, request } = require("express");
const http = require('http');
let datosObtenidos = '';



const prueba = (req = request, resp = response) => {
    // http://api.ipstack.com/134.201.250.155?access_key=4c2594c643861f24b775bb0d5ca4086e
    const point = 'http://api.ipstack.com';
    const accesskey = '4c2594c643861f24b775bb0d5ca4086e';
    // const ipprueba = '181.123.0.29'
    // const ipprueba = req.headers['x-forwarded-for'] || '181.123.0.29';
    const ipprueba = req.headers['x-forwarded-for'];
    const url = `${point}/${ipprueba}?access_key=${accesskey}`;

    
    getDATA(url, function(resultado) {
        // console.log('datos', resultado);
        getResultado(resultado);
    });
    
    function getDATA (url, callback) {
        http.get(url, function(res){
            res.on('data', function(datos) {
                callback(JSON.parse(datos))
            });
            res.on('error', function(error) {
                console.log(error);
            })
        })
    }

    function getResultado(resultado) {
        // console.log(resultado.latitude);
        const [lat, lng] = [resultado.latitude, resultado.longitude]
        return resp.status(200).json({
            lat, lng
        });
    }

}


module.exports = {
    prueba
}