const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban-kaldır")
        .setDescription("Üyenin Banını Açarsınız")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName("üyeid")
                .setDescription("Üyenin Kullanıcı ID'si")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const userId = options.getString("üyeid");

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
            .setTitle("**<a:912450075958050926:975468658602176572>・Üyenin Yasağı Başarıyla Kaldırıldı**")
                .setDescription(`**${userId}** ID'sine Sahip Üyenin Banı Kaldırıldı`)
                .setColor("#0eff00")
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
            });
        } catch (err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setDescription(`Geçersiz Üye ID'si`)
                .setColor("#ff0000");

            interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    }
}