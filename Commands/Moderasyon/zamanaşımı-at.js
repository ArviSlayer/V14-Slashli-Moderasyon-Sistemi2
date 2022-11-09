const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("zamanaşımı-at")
        .setDescription("Üyeye, Zamanaşımı Uygularsınız")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName("üye")
                .setDescription("Zamanaşımı Atılacak Üye")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("süre")
                .setDescription("Zamanaşımının Süresi")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("sebep")
                .setDescription("Zamanaşımı Atılma Sebebi")
        ),

    async execute(interaction) {
        const { guild, options } = interaction;

        const user = options.getUser("üye");
        const member = guild.members.cache.get(user.id);
        const time = options.getString("süre");
        const convertedTime = ms(time);
        const reason = options.getString("sebep") || "Zamanaşımı Atılma Sebep Girilmemiş";

        const errEmbed = new EmbedBuilder()
            .setDescription('Hata! Daha Sonra Tekrar Dene')
            .setColor("#ff0000")

        const succesEmbed = new EmbedBuilder()
            .setTitle("**<a:912450075958050926:975468658602176572>・Zamanaşımı Başarıyla Uygulandı**")
            //.setDescription(`${user} - Susturuldu`)
            .addFields(
                { name: "Üye", value: `${user}`, inline: true },
                { name: "Sebep", value: `${reason}`, inline: true },
                { name: "Süre", value: `${time}`, inline: true }
            )
            .setColor("#0eff00")
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true }); // this if statement is optional (but recommended)

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        if (!convertedTime)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        try {
            await member.timeout(convertedTime, reason);

            interaction.reply({ embeds: [succesEmbed], ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}