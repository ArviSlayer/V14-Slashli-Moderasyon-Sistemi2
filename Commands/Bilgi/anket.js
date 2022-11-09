const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
//ArviS#0011
module.exports = {
    data: new SlashCommandBuilder()//ArviS#0011
        .setName("anket-başlat")
        .setDescription("Belirttiğin Kanalda Anket Başlat")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("açıklama")
                .setDescription("Anketin Açıklaması")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName("kanal")
                .setDescription("Anketin Atılacağı Kanal")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),
    async execute(interaction) {
        const { options } = interaction;

        const channel = options.getChannel("kanal");
        const description = options.getString("açıklama");

        const embed = new EmbedBuilder()
            .setImage("https://media.discordapp.net/attachments/997105193256747028/1039563280315846717/logox2_white.png")
            .setColor("00fff5")
            .setDescription(description)
            .setTimestamp();

        try {
            const m = await channel.send({ embeds: [embed] });
            await m.react("<a:912450075958050926:975468658602176572>");
            await m.react("<a:912450075161149490:975468658342121543>");
            await interaction.reply({ content: "Anket Başarıyla Açıldı", ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}