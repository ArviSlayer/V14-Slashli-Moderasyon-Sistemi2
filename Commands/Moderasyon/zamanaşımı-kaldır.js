const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("zamanaşımı-kaldır")
        .setDescription("Üyenin, Zamanaşımını Kaldırır")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName("üye")
                .setDescription("Zamanaşımı Yemiş Üye")
                .setRequired(true)
        ),
    async execute(interaction) {
        const { guild, options } = interaction;

        const user = options.getUser("üye");
        const member = guild.members.cache.get(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription('Hata! Daha Sonra Tekrar Dene')
            .setColor("#ff0000")

        const succesEmbed = new EmbedBuilder()
            .setTitle("**<a:912450075958050926:975468658602176572>・Zamanaşımı Başarıyla Kaldırıldı**")
            //.setDescription(`${user}'ın Zamanaşımı Başarıyla Kaldırıldı`)
            .addFields(
                { name: "Üye", value: `${user}`, inline: true },
            )
            .setColor("#0eff00")
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true }); // this if statement is optional (but recommended)

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        try {
            await member.timeout(null);

            interaction.reply({ embeds: [succesEmbed], ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}