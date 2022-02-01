const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("./config.json");

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

//create array commands[] with each command from the commands folder

const rest = new REST({ version: "9" }).setToken(token);

//node deploy-commands.js to register commands
(async () => {
  try {
    console.log("started refreshing application");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("Successfuly registered application commands");
  } catch (err) {
    console.error(err);
  }
})();
