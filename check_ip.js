const bucket = require('./bucket.js')

function callback()
{
    let ip = '45.76.29.156'
    let ret = bucket.check(ip)
    console.log(ip,ret)
}
bucket.init(callback)

