const db = require("../mongoDB");
module.exports = {
  name: "previous",
  description: "Escucha la canción anterior.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ No hay musica sonando!!`, ephemeral: true }).catch(e => { })
      try {
        let song = await queue.previous()
        interaction.reply({ content: `**Volviendo a escuchar el pasado!!**` }).catch(e => { })
      } catch (e) {
        return interaction.reply({ content: `❌ No hay una canción previa!!`, ephemeral: true }).catch(e => { })
      }
    } catch (e) {
    console.error(e); 
  }
  },
};
