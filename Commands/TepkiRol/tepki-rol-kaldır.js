const rrSchema = require("../../Models/ReactionRoles");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tepki-rol-kaldır")
        .setDescription("Özel Tepki Rolünü Kaldırır")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addRoleOption(option =>
            option.setName("rol")
                .setDescription("Kaldırılacak Rol")
                .setRequired(true)
        ),
    async execute(interaction) {
        const { options, guildId, member } = interaction;

        const role = options.getRole("rol");

        try {

            const data = await rrSchema.findOne({ GuildID: guildId });

            if (!data)
                return interaction.reply({ content: "Bu Sunucuda Herhangi Bir Veri Yok", ephemeral: true });

            const roles = data.roles;
            const findRole = roles.find((r) => r.roleId === role.id);

            if (!findRole)
                return interaction.reply({ content: "Bu Rol Verilerde Bulunamıyor", ephemeral: true });

            const filteredRoles = roles.filter((r) => r.roleId !== role.id);
            data.roles = filteredRoles;

            await data.save();

            return interaction.reply({ content: `Kaldırılan Rol: **${role.name}**` });

        } catch (err) {
            console.log(err);
        }
    }
}