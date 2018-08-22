const Discord = require("discord.js");
const YTDL = require("ytdl-core");
var client = new Discord.Client();
const ClientId = '479672416574898177';
var prefix = "A!";
const queue = new Map();

const serverStats = {
  guildID: '439522665800138752',
  totalUsersID: '481578470502170624',
  memberCountID: '481580084105576468',
  botCountID: '481580212392427531'
};

client.on("ready", function () {
 //   client.user.setGame("", "https://www.twitch.tv/austelengine")
    console.log("AustelBot V3 - Connecté");
});

function play(connection, message) {
 var server = servers[message.guild.id];
    
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    
    server.queue.shift();
    
    server.dispatcher.on("end", function() {
     if (server.queue[0]) play(connection, message);
     else connection.disconnect();
    });
}

client.on('message', message => {
    
    var ping = client.ping;
    var member = message.member;
    var users = client.users.size;
    var args = message.content.substring(PREFIX.length).split (" ");
  
    if (message.content === prefix + "ping"){
        if(ping <= 99) {
             var embed = new Discord.RichEmbed()
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(`${Math.round(client.ping)} ms`, "Le robot a actuellement une bonne connexion.")
             .setColor("0x7cc576")
             .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
             message.channel.sendEmbed(embed);
        } else if(ping <= 200) {
             var embed = new Discord.RichEmbed()
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(`${Math.round(client.ping)} ms`, "Le robot a une connexion moyenne.")
             .setColor("0xffe200")
             .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
             message.channel.sendEmbed(embed);
        } else if(ping <= 999) {
             var embed = new Discord.RichEmbed()
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(`${Math.round(client.ping)} ms`, "Le robot a une mauvaise connexion.")
             .setColor("0xdb3328")
             .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
             message.channel.sendEmbed(embed);
        }
    }
    if (message.content === prefix + "users"){
         if(users <= 100) {
             var embed = new Discord.RichEmbed()
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(users + " membres", "Le Discord a actuellement moins de 100 membres.")
             .setColor("0xdb3328")
             .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
             message.channel.sendEmbed(embed);
        } else if(users <= 200) {
             var embed = new Discord.RichEmbed()
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(users + " membres", "Le Discord a actuellement 200 membres et moins.")
             .setColor("0x7cc576")
             .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
             message.channel.sendEmbed(embed);
        } else if(users >= 201) {
             var embed = new Discord.RichEmbed()
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(users + " membres", "Le Discord a actuellement plus de 200 membres !")
             .setColor("0xffe200")
             .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
             message.channel.sendEmbed(embed);
        }
    }
  
      if (message.content === prefix + "invite"){
            var embed = new Discord.RichEmbed()
           .setAuthor(message.author.username, message.author.avatarURL)
           .addField("Voici un lien d'invitation", "https://discord.gg/mF9tEaW")
           .setColor("0x000ff")
           .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
           message.channel.sendEmbed(embed);
     }
       
      if (message.content === prefix + "play"){
             if (!args[1]) {
             message.channel.sendMessage("[AustelBot - Musique] - Vous devez mettre un lien.");   
             return;
            }
            if(!message.member.voiceChannel) {
             message.channel.sendMessage("[AustelBot - Musique] - Vous devez être dans un salon vocal.");    
             return;
            }
            
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
            
            var server = servers[message.guild.id];
      
            server.queue.push(args[1]);
            
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
               play(connection, message) 
            });
     }
  
   if (message.content === prefix + "skip"){
             if(!message.member.voiceChannel) {
             message.channel.sendMessage("[SweaBot Musique] - Vous devez être dans un salon vocal.");   
             return;
             }
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
     }
  
     if (message.content === prefix + "stop"){
             if(!message.member.voiceChannel) {
             message.channel.sendMessage("[SweaBot Musique] - Vous devez être dans un salon vocal.");   
             return;
            }
             const serverQueue = queue.get(message.guild.id);
             var server = servers[message.guild.id];
             if (!serverQueue) return message.channel.send("[SweaBot Musique] - Aucune musique est joué, je ne peux donc pas exécuter cette commande.")
            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
     }
});

client.login(process.env.TOKEN);
