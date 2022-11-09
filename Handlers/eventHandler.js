function loadEvents(client) {//ArviS#0011
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading('Eventler', 'Durum');//ArviS#0011
//ArviS#0011
    const folders = fs.readdirSync('./Events');//ArviS#0011
    for (const folder of folders) {
        const files = fs.readdirSync(`./Events/${folder}`).filter((file) => file.endsWith(".js"));//ArviS#0011
//ArviS#0011
        for (const file of files) {
            const event = require(`../Events/${folder}/${file}`);
//ArviS#0011
            if (event.rest) {
                if(event.once)
                    client.rest.once(event.name, (...args) =>//ArviS#0011
                    event.execute(...args, client)
                );//ArviS#0011
                else//ArviS#0011
                    client.rest.on(event.name, (...args) =>
                        event.execute(...args, client)
                    );//ArviS#0011
            } else {//ArviS#0011
                if (event.once)
                    client.once(event.name, (...args) => event.execute(...args, client));//ArviS#0011
                else client.on(event.name, (...args) => event.execute(...args, client));
            }
            table.addRow(file, "Yüklendi");
            continue;
        }
    }//ArviS#0011
    return console.log(table.toString(), " \n YÜKLENDİ: Eventler");
}
//ArviS#0011
module.exports = {loadEvents};//ArviS#0011
//ArviS#0011








//ArviS#0011