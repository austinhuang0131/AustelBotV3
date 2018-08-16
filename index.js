const Discord = require("discord.js");
var client = new Discord.Client();

bot.on("ready", function () {
    bot.user.setGame("", "https://www.twitch.tv/austelengine")
    console.log("AustelBot V3 - Connecté");
});

bot.login(process.env.TOKEN);
