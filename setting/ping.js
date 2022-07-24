const conn = require('./sql/mysql');
const ping = require('ping');
const Conn = conn.Conn;
const log = require('./log');
const fs = require('fs');
const date = new Date;
const today = new Date(date);

const writeStream = fs.createWriteStream(`./log/log_${today.getTime()}.txt`);
async function idGet(filds, constraint) {
    try {
        Conn.query(`SELECT ${filds} FROM ${constraint}`, (e, result) => {
            adressEquip(JSON.parse(JSON.stringify(result)))
        });
        Conn.end();
    } catch (e) {
        console.log('erro')
    }
}

function adressEquip(query) {
    for (var i = 0; i < query.length; i++) {
        if ((query[i].equip_ip || query[i].name) != null) {
            let ip = query[i].equip_ip;
            let name = query[i].equip_name;
            let status = query[i].online_status;
            //console.log(i + " <> " + ip)
            Ping(ip, name, status);
            log.logs(query, today, writeStream);
        }
    }
}

const Ping = async(ip, name, status) => {

    // WARNING: -i 2 argument may not work in other platform like windows
    const res = await ping.promise.probe(ip).then(e => {
        let on = [],
            off = [];
        if (e.alive) {
            on = e.host;
        } else {
            off = e.host;
        }
        console.log(`${name} | ${status}||| ${on}${off} || ${e.alive}`)
    });
}
const postStatus = ip => {

}
module.exports = {
    run: idGet
}