const rrSchema = require("../../Models/ReactionRoles");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tepki-rol-ekle")
        .setDescription("Özel Tepki Rolü Ekler")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addRoleOption(option =>
            option.setName("rol")
                .setDescription("Verilecek Rol")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("açıklama")
                .setDescription("Rol Açıklaması")
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName("emoji")
                .setDescription("Rol Emojisi")
                .setRequired(false)
        ),
    async execute(interaction) {
        const { options, guildId, member } = interaction;

        const role = options.getRole("rol");
        const description = options.getString("açıklama");
        const emoji = options.getString("emoji");

        try {

            if (role.position >= member.roles.highest.position)
                return interaction.reply({ content: "Rolü Ayarlamak İçin Yeterli Yetkim Bulunmuyor", ephemeral: true });

            const data = await rrSchema.findOne({ GuildID: guildId });

            const newRole = {
                roleId: role.id,
                roleDescription: description || "Açıklama Girilmemiş",
                roleEmoji: emoji || "",
            }

            if (data) {
                let roleData = data.roles.find((x) => x.roleId === role.id);

                if (roleData) {
                    roleData = newRoleData;
                } else {
                    data.roles = [...data.roles, newRole]
                }

                await data.save();
            } else {
                await rrSchema.create({
                    GuildID: guildId,
                    roles: newRole,
                });
            }

            return interaction.reply({ content: `Yeni Rol Oluşturuldu: **${role.name}**` });

        } catch (err) {
            console.log(err);
        }
    }
}