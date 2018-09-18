const Discord = require("discord.js");
const YTDL = require("ytdl-core");
var client = new Discord.Client();
const ClientId = '479672416574898177';
var prefix = "A!";
const queue = new Map();

var servers = {};

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
    var args = message.content.split(' ');
  
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
            message.channel.sendMessage("[AustelBot - Musique] - Vous devez être dans un salon vocal.");    
             return;
             }
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
     }
  
     if (message.content === prefix + "stop"){
             if(!message.member.voiceChannel) {
             message.channel.sendMessage("[AustelBot - Musique] - Vous devez être dans un salon vocal.");     
             return;
            }
             const serverQueue = queue.get(message.guild.id);
             var server = servers[message.guild.id];
             if (!serverQueue) return message.channel.send("[AustelBot - Musique] - Aucune musique est joué, je ne peux donc exécuter cette commande.")
            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
     }
});

// MUSIC SYSTEM IS BASED OF https://github.com/anthonyholstein/Swea-Bot/blob/master/.gitignore/index.js

client.on('message', async message => {
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();


    if (message.content.startsWith(`${prefix}mute`)) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            var MuteEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle("Vous n'avez pas la permission !")
            .setColor("0x000ff")
            .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
            message.delete()
            return message.channel.send(MuteEmbed);
        } else {
            let userToMute = message.mentions.users.first();
            if (!userToMute) {
                var MuteEmbed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTitle("Merci de mentionner l'utilisateur à mute")
                .setColor("0x000ff")
                .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
                message.delete()
                return message.channel.send(MuteEmbed);
            } else {
                let role = message.guild.roles.find(r => r.name === "🔇 Mute");
                if (!role) {
                    try {
                        role = await message.guild.createRole({
                            name: "🔇 Mute",
                            color: "#c4c1c1",
                            permissions: []
                        });
                        message.guild.channels.forEach(async (channel) => {
                            await channel.overwritePermissions(role, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false
                            });
                        });
                    } catch (e) {
                        console.log(e.stack);
                    }
                }
                const memberToMute = message.guild.member(userToMute) || await message.guild.fetchMember(userToMute);
                await memberToMute.addRole(role);
                var MuteEmbed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .addField(`Le mute a bien été effectué.`,`L'utilisateur ${message.mentions.users.first()} à était mute par ${message.author.tag}.`)
                .setColor("0x000ff")
                .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
                message.delete()
                message.channel.send(MuteEmbed); 
                return;
            }
        }
    }

    if (message.content.startsWith(`${prefix}unmute`)) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            var MuteEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle("Vous n'avez pas la permission !")
            .setColor("0x000ff")
            .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
            message.delete()
            return message.channel.send(MuteEmbed);
        } else {
            let userToMute = message.mentions.users.first();
            if (!userToMute) {
                var MuteEmbed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTitle("Merci de mentionner l'utilisateur à unmute")
                .setColor("0x000ff")
                .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
                message.delete()
                return message.channel.send(MuteEmbed);
            } else {
                let role = message.guild.roles.find(r => r.name === "🔇 Mute");

                const memberToMute = message.guild.member(userToMute) || await message.guild.fetchMember(userToMute);
                
                await memberToMute.removeRole(role);
                var MuteEmbed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .addField(`Le unmute a bien été effectué.`,`L'utilisateur ${message.mentions.users.first()} à était demute par ${message.author.tag}.`)
                .setColor("0x000ff")
                .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
                message.delete()
                message.channel.send(MuteEmbed);
                return;
           }                                                              
        }
    }

  if(message.content.startsWith(prefix + "ban")){
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            var BanEmbed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTitle(`Tu n'as la permssion de faire cette commande.`)
                .setColor("0x000ff")
                .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
                message.delete()
            return message.channel.send(BanEmbed).catch((error) => { console.log(error.message) })
        }
            
        let member = message.mentions.members.first();
        if(!member) {
          var BanEmbed = new Discord.RichEmbed()
              .setAuthor(message.author.username, message.author.avatarURL)
              .setTitle(`Merci de mentionner l'utilisateur à bannir`)
              .setColor("0x000ff")
              .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
          message.delete()
          return message.channel.send(BanEmbed).catch((error) => { console.log(error.message) });
        }
        if(!member.bannable) {
                var EmbedBan = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTitle(`Je ne peux pas interdire cet utilisateur! Ont-ils un rôle plus élevé? Ai-je des droits BAN_MEMBERS?`)
                .setColor("0x000ff")
                .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
            message.delete()
                return message.channel.send(EmbedBan).catch((error) => { console.log(error.message) });
        }
    
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "Aucune raison fournie.";
        
        member.ban(reason)
          .catch(error => message.reply(`Désolé ${message.author} Je ne peux pas interdire à cause de: ${error}`));
          message.channel.send(new Discord.RichEmbed()
          .setAuthor(message.author.username, message.author.avatarURL)
          .setDescription(`${message.mentions.members.first()} a été banni par ${message.author.tag} car: ${reason}`)
          .setColor("0x000ff")
          .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")).catch((error) => { console.log(error.message) });
    }
});

client.login(process.env.TOKEN);
