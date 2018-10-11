const Discord = require("discord.js");
const YTDL = require("ytdl-core");
var client = new Discord.Client();
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

 //  client.user.setGame("", "https://www.twitch.tv/austelengine")
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


bot.on("guildMemberAdd", function(member) {               
    member.addRole(member.guild.roles.find("name", ">! Membre !<"));
    var games = [
    "A!help | AUSTELBOT V1.2",
    "Développé par XeCrafT",
    "http://austelclient.net",
    " " + new Date(),
     bot.users.size + " utilisateurs !"
 ]
  bot.user.setActivity(setInterval(function() {
  bot.user.setActivity(games[Math.floor(Math.random() * games.length)], {url:"https://www.twitch.tv/AustelBot", type: "STREAMING"})
  }, 3000))
  
 member.guild.channels.find("name", "austel-chat").sendMessage("", {    
            embed: {
                color: 0x008000,
                author: '',
                title: '', 
                description: '', 
                fields: [
                    {
                        name: member.displayName + " a rejoint ! :white_check_mark: ",
                        value: 'Nous sommes désormais ' + bot.users.size + " utilisateurs !",
                        inline: false
                   }],                     
                                   footer: {
            text: 'Bievenue à toi ! :D',
          },
            }
 });
});

bot.on("guildMemberRemove", function(member) {
    
    var games = [
    "A!Help | AUSTELBOT V2.0",
    "Développé par XeCrafT",
    "http://austelclient.net",
    " " + new Date(),
     bot.users.size + " utilisateurs !"
 ]
  bot.user.setActivity(setInterval(function() {
  bot.user.setActivity(games[Math.floor(Math.random() * games.length)], {url:"https://www.twitch.tv/AustelBot", type: "STREAMING"})
  }, 3000))
    
 member.guild.channels.find("name", "austel-chat").sendMessage("", {    
            embed: {
                color: 0xFF0000,
                author: '',
                title: '', 
                description: '', 
                fields: [
                    {
                        name: member.displayName + " a quitté ! :x:",
                        value: 'Nous sommes désormais ' + bot.users.size + " utilisateurs !",
                        inline: false
                   }],                     
                                   footer: {
            text: 'À Bientôt !',
          },
            }
 });
    
});

client.on('message', message => {
    
    var ping = client.ping;
    var member = message.member;
    var users = client.users.size;
    var args = message.content.split(' ');

    if (message.content === prefix + "help"){
        var embed = new Discord.RichEmbed()
        .setTitle("Ci-dessous, les nombreuses commandes du AustelBot.")
        .addField("**__Commandes utiles:__**",`[${prefix}help](https://discord.gg/mF9tEaW) - Liste des commandes du bot. \n[${prefix}ping](https://discord.gg/mF9tEaW) - Ping d'Austelbot. \n[${prefix}user](https://discord.gg/mF9tEaW). Voir le nombre de personne sur le discord. \n[${prefix}invite](https://discord.gg/mF9tEaW). Invitation pour le discord Austel Engine. \n[${prefix}austeltv](https://discord.gg/mF9tEaW). Lien twitch d'AustelTV. \n[${prefix}twitter](https://discord.gg/mF9tEaW). Lien twitter d'AustelEngine. \n[${prefix}partenaires](https://discord.gg/mF9tEaW). Liste des partenaires et lien du formulaire.`)
        .addField("**__Commandes de modération:__**",`[${prefix}kick @user raison](https://discord.gg/mF9tEaW) - Exclure un utilisateur n'ayant pas respecter le règlement. \n[${prefix}ban @user raison](https://discord.gg/mF9tEaW) - Bannir un utilisateur dans un cas extrême.\n[${prefix}clear (nombre)](https://discord.gg/mF9tEaW) - Supprime un nombre x de message dans un salon. \n[${prefix}mute @user raison](https://discord.gg/mF9tEaW) - Mute un utilisateur n'ayant pas respecter le règlement.`)
        .setColor("0x000ff")
        .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
        message.delete() 
    message.channel.send(embed);
    }
  
    if (message.content === prefix + "ping"){
        if(ping <= 99) {
             var embed = new Discord.RichEmbed()
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(`${Math.round(client.ping)} ms`, "Le robot a actuellement une bonne connexion.")
             .setColor("0x7cc576")
             .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
             message.channel.send(embed);
        } else if(ping <= 200) {
             var embed = new Discord.RichEmbed()
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(`${Math.round(client.ping)} ms`, "Le robot a une connexion moyenne.")
             .setColor("0xffe200")
             .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
             message.channel.send(embed);
        } else if(ping <= 999) {
             var embed = new Discord.RichEmbed()
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(`${Math.round(client.ping)} ms`, "Le robot a une mauvaise connexion.")
             .setColor("0xdb3328")
             .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
             message.channel.send(embed);
        }
    }
    if (message.content === prefix + "users"){
         if(users <= 100) {
             var embed = new Discord.RichEmbed()
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(users + " membres", "Le Discord a actuellement moins de 100 membres.")
             .setColor("0xdb3328")
             .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
             message.channel.send(embed);
        } else if(users <= 200) {
             var embed = new Discord.RichEmbed()
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(users + " membres", "Le Discord a actuellement 200 membres et moins.")
             .setColor("0x7cc576")
             .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
             message.channel.send(embed);
        } else if(users >= 201) {
             var embed = new Discord.RichEmbed()
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(users + " membres", "Le Discord a actuellement plus de 200 membres !")
             .setColor("0xffe200")
             .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
             message.channel.send(embed);
        }
    }

    if(message.content.startsWith(prefix + "clear")){
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
               var ClearEmbed = new Discord.RichEmbed()
               .setAuthor(message.author.username, message.author.avatarURL)
               .setTitle("Vous n'avez pas la permission !")
               .setColor("0x000ff")
               .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
               message.delete()
            return message.channel.send(ClearEmbed)};
            var ClearrEmbed = new Discord.RichEmbed()
              .setAuthor(message.author.username, message.author.avatarURL)
              .setTitle("Vous devez préciser le nombre de message à supprimer.")
              .setColor("0x000ff")
              .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
              message.delete()
           let args = message.content.split(" ").slice(1);
           if(!args[0]) return message.channel.send(ClearrEmbed);
            message.channel.bulkDelete(args[0]).then(() => {
                var ClearEmbed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTitle(`${args[0]} messages ont été suprimés.`)
                .setColor("0x000ff")
                .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
                message.delete()
                message.channel.send(ClearEmbed);
           });
        }
  
      if (message.content === prefix + "invite"){
            var embed = new Discord.RichEmbed()
           .setAuthor(message.author.username, message.author.avatarURL)
           .addField("Voici un lien d'invitation", "https://discord.gg/mF9tEaW")
           .setColor("0x000ff")
           .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
           message.channel.send(embed);
        }
        if (message.content == prefix + "twitter"){
            var EmbedTwitter = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .addField("Voici le lien du twitter.", `[Cliquez ici](https://twitter.com/austelenginefr)`)
            .setColor("0x000ff")
            .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
            message.delete()
            message.channel.send(EmbedTwitter)
        }
        if (message.content == prefix + "austeltv"){
            var EmbedTwitter = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .addField("Voici le lien Twitch.", `[Cliquez ici](https://www.twitch.tv/austelengine)`)
            .setColor("0x000ff")
            .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
            message.delete()
            message.channel.send(EmbedTwitter)
        }  
        if (message.content == prefix + "partenaires"){
            var EmbedTwitter = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .addField("Il n'y a pas encore de partenaire .", `[Cliquez ici](https://goo.gl/forms/ghn1D2Ff5mABCciq2) pour le devenir`)
            .setColor("0x000ff")
            .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
            message.delete()
            message.channel.send(EmbedTwitter)
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

//Commandes de modération 

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
    
    if(message.content.startsWith(prefix + "kick")){
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            var KickEmbed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTitle(`Tu n'as la permssion de faire cette commande.`)
                .setColor("0x000ff")
                .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
                message.delete()
           return message.reply(KickEmbed).catch(console.log("permission = null"));
       }
        if(message.mentions.users.size === 0) {
            var KickEmbed = new Discord.RichEmbed()
              .setAuthor(message.author.username, message.author.avatarURL)
              .setTitle(`Merci de mentionner l'utilisateur à expluser`)
              .setColor("0x000ff")
              .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
          message.delete()
           return message.reply(KickEmbed).catch(console.log("mention = null"));
       }
        let kickMember = message.guild.member(message.mentions.users.first());
         if(!kickMember) {
            var EmbedKick = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`Cet utilisateur est introuvable ou impossible à expluser.`)
            .setColor("0x000ff")
            .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
            message.delete()
              return message.reply(EmbedKick).catch(console.log("perm = null"));
        }
        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            var EmbedKick = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`Je n'ai pas la permission KICK_MEMBERS pour faire ceci.`)
            .setColor("0x000ff")
            .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
            message.delete()
            return message.reply(EmbedKick).catch(console.log("KICK_MEMBERS = null"));
        }
         kickMember.kick().then(member => {
            var EmbedKick = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription(`**${member.user.username}** a été expulsé du discord par **${message.author.username}.**`)
            .setColor("0x000ff")
            .setFooter("AustelEngine, un produit de Nietsloh Inc. © Tous droits réservés. 2016-2018")
            message.delete()
        message.channel.send(EmbedKick).catch(console.log("Expulsion reussie"))}).catch(console.log("Expulsion reussie"));
    }

});

client.login(process.env.TOKEN);
