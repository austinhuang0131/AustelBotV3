const Discord = require("discord.js");
var client = new Discord.Client();
const ClientId = '479672416574898177';
var prefix = "A!";

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

client.on("guildMemberAdd", function(member) {               
    member.addRole(member.guild.roles.find("name", ">! Membre !<"));
    var games = [
    "A!help | AUSTELBOT V1.2",
    "Développé par XeCrafT",
    "http://austelclient.net",
    " " + new Date(),
     client.users.size + " utilisateurs !"
 ]
  client.user.setActivity(setInterval(function() {
  client.user.setActivity(games[Math.floor(Math.random() * games.length)], {url:"https://www.twitch.tv/AustelBot", type: "STREAMING"})
  }, 3000))
  
  if(member.guild.id !== serverStats.guildID) return;
  
  client.channels.get(serverStats.totalUsersID).setName(`Membres totals : ${member.guild.memberCount}`);
  client.channels.get(serverStats.memberCountID.setName(`Membres : ${member.guild.members.filter(m => !m.user.bot).size}`);
  client.channels.get(serverStats.botCountID.setName(`Robots : ${member.guild.members.filter(m => m.user.bot).size}`);
  
 member.guild.channels.find("name", "austel-chat").sendMessage("", {    
            embed: {
                color: 0x008000,
                author: '',
                title: '', 
                description: '', 
                fields: [
                    {
                        name: member.displayName,
                        value: 'a rejoint :white_check_mark: ',
                        inline: false
                   }],                     
                                   footer: {
            text: 'Bievenue à toi ! :D',
          },
            }
 });
});

client.on("guildMemberRemove", function(member) {
    
    var games = [
    "A!Help | AUSTELBOT V2.0",
    "Développé par XeCrafT",
    "http://austelclient.net",
    " " + new Date(),
     client.users.size + " utilisateurs !"
 ]
  client.user.setActivity(setInterval(function() {
  client.user.setActivity(games[Math.floor(Math.random() * games.length)], {url:"https://www.twitch.tv/AustelBot", type: "STREAMING"})
  }, 3000))

  if(member.guild.id !== serverStats.guildID) return;
  
  client.channels.get(serverStats.totalUsersID).setName(`Membres totals : ${member.guild.memberCount}`);
  client.channels.get(serverStats.memberCountID.setName(`Membres : ${member.guild.members.filter(m => !m.user.bot).size}`);
  client.channels.get(serverStats.botCountID.setName(`Robots : ${member.guild.members.filter(m => m.user.bot).size}`);
    
 member.guild.channels.find("name", "austel-chat").sendMessage("", {    
            embed: {
                color: 0xFF0000,
                author: '',
                title: '', 
                description: '', 
                fields: [
                    {
                        name: member.displayName,
                        value: 'a quitté le serveur :x:',
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
    
});

client.login(process.env.TOKEN);
