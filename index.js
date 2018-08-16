const Discord = require("discord.js");
var client = new Discord.Client();

client.on("ready", function () {
    client.user.setGame("", "https://www.twitch.tv/austelengine")
    console.log("AustelBot V3 - Connecté");
});

client.login(process.env.TOKEN);
