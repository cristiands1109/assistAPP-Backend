const { Router, request, response } = require('express');
const geoIP = require('geoip-lite')


const router = Router();



router.get('/', function (req = request, resp = response) {
  
   const ip = req.socket.remoteAddress;
   console.log(req.socket.remoteAddress);

   // const ip2 = "207.97.227.239"
   // const ge2 = geoIP.lookup(ip2)

   // const [la, lon] = ge2.ll
   // console.log(la);
   // console.log(lon);

   // console.log('ip2' , ge2);
   const ip2 = req.headers['x-forwarded-for'] || req.socket.remoteAddress 

   resp.status(200).json({
      ip,
      ip2
   })

   
});



module.exports = router;
