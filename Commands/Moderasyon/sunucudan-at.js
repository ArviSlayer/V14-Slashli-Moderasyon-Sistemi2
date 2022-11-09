const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sunucudan-at")
        .setDescription("Üyeyi Sunucudan Kicklersiniz")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("üye")
                .setDescription("Atılacak Üye")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("sebep")
                .setDescription("Atılma Sebebi")
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser("üye");
        const reason = options.getString("sebep") || "Atılma Sebep Girilmemiş";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Daha Yüksek Bir Role Sahip Olduğu İçin **${user.username}** Üstünde İşlem Yapamazsınız`)
            .setColor("#ff0000");

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setTitle("**<a:912450075958050926:975468658602176572>・Üye Başarıyla Atıldı**")
            //.setDescription(`${user} - Başarıyla Kicklendi`)
            .addFields(
                { name: "Üye", value: `${user}`, inline: true },
                { name: "Sebep", value: `${reason}`, inline: true }
            )
            .setColor("#0eff00")
            .setTimestamp();;

        await interaction.reply({
            embeds: [embed],
        });
    }
}