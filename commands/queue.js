/*

  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   
   # EN DESARROLLO BY BATU
   ## PARA AYUDA ESCRÍBEME POR MENSAJE PRIVADO
   ## Contact    [ DISCORD SERVER :  https://discord.gg/kawaiianimes ]
   ## YT : https://www.youtube.com/channel/UCt2ZB6mzc983GzKw7-tNbCQ
*/
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
  name: "queue",
  description: "Esto te mostrara la lista de reproducción.",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    
    try {

     const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: '⚠️ No hay música sonando!!', ephemeral: true }).catch(e => { })
      if (!queue.songs[0]) return interaction.reply({ content: '⚠️ La lista está vacía!!', ephemeral: true }).catch(e => { })

      const trackl = []
      queue.songs.map(async (track, i) => {
        trackl.push({
          title: track.name,
          author: track.uploader.name,
          user: track.user,
          url: track.url,
          duration: track.duration
        })
      })

      const backId = "emojiBack"
      const forwardId = "emojiForward"
      const backButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        emoji: "⬅️",
        customId: backId
      });

      const deleteButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        emoji: "❌",
        customId: "close"
      });

      const forwardButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        emoji: "➡️",
        customId: forwardId
      });


      let kaçtane = 8
      let page = 1
      let a = trackl.length / kaçtane

      const generateEmbed = async (start) => {
        let sayı = page === 1 ? 1 : page * kaçtane - kaçtane + 1
        const current = trackl.slice(start, start + kaçtane)
        if (!current || !current?.length > 0) return interaction.reply({ content: '⚠️ La lista está vacía!!', ephemeral: true }).catch(e => { })
        return new EmbedBuilder()
          .setTitle(`${interaction.guild.name}  Queue`)
          .setThumbnail(interaction.guild.iconURL({ size: 2048, dynamic: true }))
          .setColor(client.config.embedColor)
          .setDescription(`▶️ Now plawying: \`${queue.songs[0].name}\`
    ${current.map(data =>
            `\n\`${sayı++}\` | [${data.title}](${data.url}) | (Executed by <@${data.user.id}>)`
          )}`)
          .setFooter({ text: `Page ${page}/${Math.floor(a + 1)}` })
      }

      const canFitOnOnePage = trackl.length <= kaçtane

      await interaction.reply({
        embeds: [await generateEmbed(0)],
        components: canFitOnOnePage
          ? []
          : [new ActionRowBuilder({ components: [deleteButton, forwardButton] })],
        fetchReply: true
      }).then(async Message => {
        const filter = i => i.user.id === interaction.user.id
        const collector = Message.createMessageComponentCollector({ filter, time: 120000 });


        let currentIndex = 0
        collector.on("collect", async (button) => {
          if (button?.customId === "close") {
            collector?.stop()
           return button?.reply({ content: 'Command Cancelled', ephemeral: true }).catch(e => { })
          } else {

            if (button.customId === backId) {
              page--
            }
            if (button.customId === forwardId) {
              page++
            }

            button.customId === backId
              ? (currentIndex -= kaçtane)
              : (currentIndex += kaçtane)

            await interaction.editReply({
              embeds: [await generateEmbed(currentIndex)],
              components: [
                new ActionRowBuilder({
                  components: [
                    ...(currentIndex ? [backButton] : []),
                    deleteButton,
                    ...(currentIndex + kaçtane < trackl.length ? [forwardButton] : []),
                  ],
                }),
              ],
            }).catch(e => { })
            await button?.deferUpdate().catch(e => { })
          }
        })

        collector.on("end", async (button) => {
          button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("⬅️")
              .setCustomId(backId)
              .setDisabled(true),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("❌")
              .setCustomId("close")
              .setDisabled(true),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("➡️")
              .setCustomId(forwardId)
              .setDisabled(true))

          const embed = new EmbedBuilder()
            .setTitle('Command Timeout')
            .setColor(`#ecfc03`)
            .setDescription('▶️ Ejecuta el comando de lista de nuevo!!')
          return interaction?.editReply({ embeds: [embed], components: [button] }).catch(e => { })

        })
      }).catch(e => { })

    } catch (e) {
    console.error(e); 
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

   
   # EN DESARROLLO BY BATU
   ## PARA AYUDA ESCRÍBEME POR MENSAJE PRIVADO
   ## Contact    [ DISCORD SERVER :  https://discord.gg/kawaiianimes ]
   ## YT : https://www.youtube.com/channel/UCt2ZB6mzc983GzKw7-tNbCQ
*/
