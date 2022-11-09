function loadCommands(client) {//ArviS#0011
  const ascii = require("ascii-table");
  const fs = require("fs");
  const table = new ascii().setHeading("Komutlar", "Durum");//ArviS#0011
//ArviS#0011
  let commandsArray = [];

  const commandsFolder = fs.readdirSync("./Commands");//ArviS#0011
  for (const folder of commandsFolder) {
    const commandFiles = fs
      .readdirSync(`./Commands/${folder}`)
      .filter((file) => file.endsWith(".js"));//ArviS#0011
//ArviS#0011
    for (const file of commandFiles) {
      const commandFile = require(`../Commands/${folder}/${file}`);//ArviS#0011
//ArviS#0011
      const properties = { folder, ...commandFile };
      client.commands.set(commandFile.data.name, properties);//ArviS#0011
//ArviS#0011
      commandsArray.push(commandFile.data.toJSON());
//ArviS#0011
      table.addRow(file, "Yüklendi");//ArviS#0011
      continue;//ArviS#0011
    }//ArviS#0011
  }

  client.application.commands.set(commandsArray);//ArviS#0011
//ArviS#0011
  return console.log(table.toString(), "\n YÜKLENDİ: Komutlar");//ArviS#0011
}
//ArviS#0011
module.exports = { loadCommands };//ArviS#0011









//ArviS#0011