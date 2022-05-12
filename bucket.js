const fs = require('fs')
const iptn = require('./ipv4_to_number.js')

const bucket = 
{
    data : [],
    init:function()
    {
        fs.readFile('chn_ip_number_format.txt', (err, data) => {
            if (err) throw err
            let vec = data.toString().split('\n')
            for (const str of vec) 
            {
                let arr = str.split(',')
                let k = Math.floor(arr[0]/10000000)
                if(!bucket.data[k]){bucket.data[k] = []}
                let num_arr = []
                for (const s of arr) 
                {
                    num_arr.push(parseInt(s))
                }
                bucket.data[k].push(num_arr)
            }
            let ip = '101.32.245.151'
            let num = iptn.ip_to_number(ip)
            console.log(num)
            let ret = this.check(num)
            console.log(ret)
        })
    },

    check : function(num)
    {
        let k = Math.floor(num/10000000)
        let data = bucket.data[k]
        if(!data){return false}
        console.log(k,data.length)
        for (const vec of data) 
        {
            if(num >= vec[0] && num <= vec[1])
            {
                return true
            }
        }
        return false
    }

}

module.exports = bucket




