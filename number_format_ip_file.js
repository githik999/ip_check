const fs = require('fs')

fs.readFile('chn_ip.txt', (err, data) => {
    if (err) throw err
    //console.log(data)
    let vec = data.toString().split('\n')
    let ret = vec_to_vec(vec)
    let str = ret.join('\n')
    fs.writeFile('chn_ip_number_format.txt',str,(err)=>{
        console.log(err)
    })
})


function vec_to_vec(vec)
{
    let ret = []
    for (const str of vec) 
    {
        let number_arr = []
        let arr = str.split(' ')
        for (const ip of arr) 
        {
            number_arr.push(ip_to_number(ip))
        }
        ret.push(number_arr.toString())
    }
    return ret
}

function ip_to_number(ip)
{
    let ret = 0
    let vec = ip.split('.')
    for (const key in vec) 
    {
        let m = vec[key] * Math.pow(2,8*(3-key))
        ret += m
    }
    return ret
}