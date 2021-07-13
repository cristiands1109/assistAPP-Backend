const { Router, request, response } = require('express');
const http = require('http');



const router = Router();



router.get('/', function (req = request, resp = response) {
   const access_key = '4c2594c643861f24b775bb0d5ca4086e';
   const endpoint = 'http://api.ipstack.com/'
   const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
   let data = ''
   const URL = `${endpoint}${ip}?access_key=${access_key}`

   console.log(URL);
   http.get(URL, (datos) => {
      data = datos
   })
   // if (req.socket.remoteAddress ) {
   //    return resp.status(404).json({
   //       msg: 'No es posible obtener la ubicacion, contacte con el administrador'
   //    })
   // }
   resp.status(200).json(data, URL);
   
   
});



module.exports = router;
