const Discord = require("discord.js");
var client = new Discord.Client();

var prefix = "A!";

client.on("ready", function () {
    client.user.setGame("", "https://www.twitch.tv/austelengine")
    console.log("AustelBot V3 - Connecté");
});

client.on('message', message => {
    
    var ping = client.ping;
    
    if (message.content === prefix + "ping"){
        if(ping <= 20) {
             var embed = new Discord.RichEmbed()
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(`${Math.round(client.ping)} ms`)
             .setColor("0x228b22")
             .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
        message.channel.sendEmbed(embed);
        } else if(ping <= 80) {
             var embed = new Discord.RichEmbed()
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(`${Math.round(client.ping)} ms`)
             .setColor("0xffe200")
                         .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
             message.channel.sendEmbed(embed);
        } else if(ping <= 999) {
             var embed = new Discord.RichEmbed()
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(`${Math.round(client.ping)} ms`)
             .setColor("0xdb3328")
             .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
             message.channel.sendEmbed(embed);
        }
    }
    
});

client.login(process.env.TOKEN);
