const db = require("../../mongoDB");
const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {
  if (queue) {
    if (!client.config.opt.loopMessage && queue?.repeatMode !== 0) return;
    if (queue?.textChannel) {
      const embed = new EmbedBuilder()
      .setAuthor({
        name: 'Actualmente ya estoy reproduciendo una pista uwu',
        iconURL: 'https://cdn.discordapp.com/attachments/1140841446228897932/1144671132948103208/giphy.gif', 
        url: 'https://discord.gg/FUEHs7RCqz'
    })
    .setDescription(`\n ‎ \n▶️ **Details :** **${song?.name}**\n▶️ **Disfruta de la última experiencia de músca :D ** \n▶️ **Si el enlace se interrumpe, no dudes en contactarme!.**`)
.setImage(queue.songs[0].thumbnail)
    .setColor('#FF0000')
    .setFooter({ text: 'More info - Use /help command [RTX GAMING]' });
     
      queue?.textChannel?.send({ embeds: [embed] }).catch(e => { });
    }
  }
}

/*

  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   
   # MADE BY RTX!! FEEL FREE TO USE ANY PART OF CODE
   ## FOR HELP CONTACT ME ON DISCORD
   ## Contact    [ DISCORD SERVER :  https://discord.gg/FUEHs7RCqz ]
   ## YT : https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A
*/
