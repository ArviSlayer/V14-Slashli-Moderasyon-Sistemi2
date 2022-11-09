const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban-at")
        .setDescription("Üyeyi Sunucudan Banlarsınız")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName("üye")
                .setDescription("Banlanacak Üye")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("sebep")
                .setDescription("Ban Sebebi")
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser("üye");
        const reason = options.getString("sebep") || "Banlanma Sebep Girilmemiş";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Daha Yüksek Bir Role Sahip Olduğu İçin **${user.username}** Üstünde İşlem Yapamazsınız`)
            .setColor("#ff0000");

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.ban({ reason });

        const embed = new EmbedBuilder()
        .setTitle("**<a:912450075958050926:975468658602176572>・Üye Başarıyla Yasaklandı**")
            //.setDescription(`${user} Başarıyla Banlandı \n Sebep: ${reason}`)
            .addFields(
                { name: "Üye", value: `${user}`, inline: true },
                { name: "Sebep", value: `${reason}`, inline: true }
            )
            .setColor("#0eff00")
            .setTimestamp()

        await interaction.reply({
            embeds: [embed]
        });
    }
}