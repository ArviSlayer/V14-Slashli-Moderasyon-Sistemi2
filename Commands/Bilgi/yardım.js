const {
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
} = require("discord.js");
//ArviS#0011
module.exports = {
  data: new SlashCommandBuilder()
    .setName("yardım")
    .setDescription("Botta Bulanan Komutları Gösterir"),
  async execute(interaction) {
    const emojis = {
      eğlence: "<a:yuvarlanankedi:997610191006740573>",
      bilgi: "<a:EmojiGifM3L1H246:939264728172228708>",
      moderasyon: "<a:EmojiGifM3L1H186:939264733855490169>",
      tepkirol: "<a:buyutec:997610195997966507>",
    };

    const directories = [
      ...new Set(interaction.client.commands.map((cmd) => cmd.folder)),
    ];

    const formatString = (str) =>
      `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

    const categories = directories.map((dir) => {
      const getCommands = interaction.client.commands
        .filter((cmd) => cmd.folder === dir)
        .map((cmd) => {
          return {
            name: cmd.data.name,
            description:
              cmd.data.description ||
              "Bu Komuta Bir Açıklama Girilmemiş",
          };//ArviS#0011
        });

      return {
        directory: formatString(dir),
        commands: getCommands,
      };
    });

    const embed = new EmbedBuilder()
    .setDescription("<a:pikachuselam:997610147167870986>・Merhaba \n\n\n <a:asagiok:997610182836228157>・**Aşağıdaki Menüyü Kullanarak Komutlar Arasında Geçiş Yapabilirsiniz** \n\n <a:dikkat:997074866371039322>・__Bu Menünün Bir Süresi Var, Bu Süreyi Geçtiğiniz Takdirde Kategoriler Çalışmayacak. Yeniden /yardım Yazmanız Gerekecek__")
    .setTitle("Logocum Artz | ArviS#0011")
    .setColor("5b54bb")
    .setImage("https://media.discordapp.net/attachments/1036246221251162164/1039573682923774032/image.png");

    const components = (state) => [
      new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId("yardım-menüsü")
          .setPlaceholder("Kategori Seç")
          .setDisabled(state)
          .addOptions(
            categories.map((cmd) => {
              return {
                label: cmd.directory,
                value: cmd.directory.toLowerCase(),
                description: `${cmd.directory} Kategorisinin Komutları`,
                emoji: emojis[cmd.directory.toLowerCase() || null],
              };
            })
          )//ArviS#0011
      ),
    ];

    const initialMessage = await interaction.reply({
      embeds: [embed],
      components: components(false),
    });

    const filter = (interaction) =>
      interaction.user.id === interaction.member.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,//ArviS#0011
      componentType: ComponentType.SelectMenu,
    });

    collector.on("collect", (interaction) => {
      const [directory] = interaction.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );

      const categoryEmbed = new EmbedBuilder()
      .setColor("5b54bb")
      .setImage("https://media.discordapp.net/attachments/1036246221251162164/1039573682923774032/image.png")
        .addFields(
          category.commands.map((cmd) => {
            return {
              name: `\`${cmd.name}\``,
              value: cmd.description,
              inline: true,
            };
          })
        );

      interaction.update({ embeds: [categoryEmbed] });
    });

    collector.on("end", () => {
      initialMessage.edit({ components: components(true) });
    });
  },
};
