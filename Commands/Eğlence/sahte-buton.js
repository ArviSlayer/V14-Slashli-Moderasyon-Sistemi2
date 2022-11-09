const {EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('sahte-buton')
    .setDescription('Sahte Buton Sistemini Ayarlara')
    .addChannelOption(option =>
        option.setName('kanal')
        .setDescription('Butonun Gönderilecek Kanalını Ayarla')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('kanal');
        const verifyEmbed = new EmbedBuilder()
        .setTitle("ArviS#0011 TROOLL")
        .setDescription('Butona Basarak Bedava Nitro Kazanabilirsin')
        .setColor(0x5fb041)
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('niyto').setLabel('Nitroyu Kap!').setStyle(ButtonStyle.Danger),
                ),
            ],
        });
        if (!sendChannel) {
            return interaction.reply({content: 'Hata! Daha Sonra Tekrar Dene', ephemeral: true});
        } else {
            return interaction.reply({content: 'Sahte Buton Başarıyla Ayarlandı', ephemeral: true});
        }
    },
};