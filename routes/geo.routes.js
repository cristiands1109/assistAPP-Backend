const { Router, request, response } = require('express');
const geoIP = require('geoip-lite')


const router = Router();



router.get('/', function (req = request, resp = response) {
   
   const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 

   // if (req.socket.remoteAddress ) {
   //    return resp.status(404).json({
   //       msg: 'No es posible obtener la ubicacion, contacte con el administrador'
   //    })
   // }

   const geo = geoIP.lookup(ip)



   const a = req.url
   if (a === '/'){
      return resp.json(a)
   } else {
      const b = req.url
      return resp.json({
         msg: 'produc',
         b         
      })
   }
   resp.status(200).json(geo)
   
});



module.exports = router;
