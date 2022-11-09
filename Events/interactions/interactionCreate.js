const { CommandInteraction } = require("discord.js");//ArviS#0011
//ArviS#0011
module.exports = {
  name: "interactionCreate",
//ArviS#0011

  async execute(interaction, client) {//ArviS#0011
    const { customId, values, guild, member } = interaction; //ArviS#0011
    if (interaction.isChatInputCommand()) {//ArviS#0011
      const command = client.commands.get(interaction.commandName);
      if (!command) {//ArviS#0011
        return interaction.reply({ content: "Eski Komut" });//ArviS#0011
      }
      command.execute(interaction, client);//ArviS#0011
    } else if (interaction.isButton()) {//ArviS#0011

      if (customId == "verify") {
        const role = interaction.guild.roles.cache.get("933657148091691009");
        return interaction.member.roles.add(role).then((member) =>
          interaction.reply({
            content: `${role} Başarıyla Verildi`,
            ephemeral: true,//ArviS#0011
          })
        );//ArviS#0011
      }
    } else if (interaction.isSelectMenu()) {//ArviS#0011
      if (customId == "reaction-roles") {//ArviS#0011
        for (let i = 0; i < values.length; i++) {//ArviS#0011
          const roleId = values[i];
//ArviS#0011
          const role = guild.roles.cache.get(roleId);
          const hasRole = member.roles.cache.has(roleId);

          switch (hasRole) {
            case true:
              member.roles.remove(roleId);
              break;
            case false:
              member.roles.add(roleId);
              break;
          }
        }//ArviS#0011
//ArviS#0011
        interaction.reply({"Rolleriniz Güncellendi", ephemeral: true });
      }
    } else {
      
      return;
    }
  },//ArviS#0011
};//ArviS#0011
//ArviS#0011








//ArviS#0011