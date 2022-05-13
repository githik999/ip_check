const fs = require('fs')
const iptn = require('./ipv4_to_number.js')

const bucket = 
{
    data : [],
    init:function(callback)
    {
        fs.readFile('chn_ip_number_format.txt', (err, data) => {
            if (err) throw err
            let vec = data.toString().split('\n')
            for (const str of vec)
            {
                let arr = str.split(',')
                
                let start = parseInt(arr[0])
                let end = parseInt(arr[1])
                let range = []
                range.push(start)
                range.push(end)

                let k_start = bucket.get_key(start)
                let k_end = bucket.get_key(end)
                for (let i = k_start; i <= k_end; i++) 
                {
                    bucket.insert(i,range)
                }
            }
            callback()
        })
    },

    insert : function(key,data)
    {
        if(!bucket.data[key]){bucket.data[key] = []}
        bucket.data[key].push(data)
    },
    check : function(ip)
    {
        let num = iptn.ip_to_number(ip)
        return bucket.check_num(num)
    },

    check_num : function(num)
    {
        let k = bucket.get_key(num)
        console.log(num,k)
        let data = bucket.data[k]
        if(!data){return false}
        
        for (const vec of data) 
        {
            if(num >= vec[0] && num <= vec[1])
            {
                return true
            }
        }
        return false
    },

    get_key : function(num)
    {
        return Math.floor(num/1000000)
    }

}

module.exports = bucket




