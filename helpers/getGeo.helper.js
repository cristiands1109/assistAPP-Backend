
const ipstack = require('ipstack');
const getResultGeo = (ip = '', accesskey = '') => {

    return new Promise((resolve, reject) => {

        ipstack(ip, accesskey, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result)
        });
    });

}

module.exports = {
    getResultGeo
}