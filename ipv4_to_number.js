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