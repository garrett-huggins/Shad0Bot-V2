const { SlashCommandBuilder } = require("@discordjs/builders");
const { MOD } = require("../roles.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears the number of previous messages."),
  async execute(interaction) {
    if (interaction.member.roles.cache.has(MOD)) {
      await interaction.reply("clear messages");
    } else {
      await interaction.reply("You lack permission to use this command.");
    }
  },
};
