const ping = require('./ping');
const log = (filds, today, writeStream) => {
    const x = json(filds);
    writeStream.write(`${today}\n`);
    for (var i = 0; i < x.length; i++) {
        const html = `=========================\n
        id: ${filds[i].equip_id},
        Equip: ${filds[i].equip_name},
        IP: ${filds[i].equip_ip},
        status: ${filds[i].online_status} \n\n`;
        writeStream.write(`${html}`);
    }
}
const json = filds => {
    return JSON.parse(JSON.stringify(filds));
}

module.exports = {
    logs: log
}