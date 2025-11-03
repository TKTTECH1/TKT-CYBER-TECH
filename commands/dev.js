// commands/dev.js
async function devCommand(sock, chatId, message, q) {
  try {
    const senderJid = message.key?.participant || message.key?.remoteJid || message.sender || '';
    const pushname =
      message.pushName ||
      message.message?.pushName ||
      (senderJid ? senderJid.split('@')[0] : 'there');

    const name = pushname || 'there';

    const caption = `
╭─⌈ *👨‍💻 ʙᴏᴛ ᴅᴇᴠᴇʟᴏᴘᴇʀ* ⌋─
│
│ 👋 Hello, *${name}*!
│
│ 🤖 I'm *Arslan 218*, the creator and
│    maintainer of this smart WhatsApp bot.
│
│ 👨‍💻 *ᴅᴇᴠ ɪɴꜰᴏ:*
│ ──────────
│ 🧠 *Name:* Arslan 218
│ 🎂 *Age:* +24
│ 📞 *Contact:* wa.me/256789966218
│ 📺 *YouTube:* Arslan Tech Hub
│     https://youtube.com/@ArslanMDofficial
│
╰─────────

>⚡Powered By Arslan Tech Hub
    `.trim();

    const contextInfo = {
      mentionedJid: senderJid ? [senderJid] : [],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363348739987203@newsletter",
        newsletterName: "🪀『 𝐀𝐑𝐒𝐋𝐀𝐍 𝐓𝐄𝐂𝐇 𝐁𝐎𝐓 』🪀",
        serverMessageId: 143
      },
      externalAdReply: {
        title: "𝐀𝐑𝐒𝐋𝐀𝐍 𝐓𝐄𝐂𝐇 𝐁𝐎𝐓",
        body: "Created with ❤️ by Arslan 218",
        thumbnailUrl: "https://files.catbox.moe/suqejh.jpg",
        mediaType: 1,
        renderSmallerThumbnail: true,
        showAdAttribution: true,
        mediaUrl: "https://youtube.com/@ArslanMDofficial",
        sourceUrl: "https://youtube.com/@ArslanMDofficial"
      }
    };

    await sock.sendMessage(
      chatId,
      {
        image: { url: "https://files.catbox.moe/suqejh.jpg" },
        caption,
        contextInfo
      },
      { quoted: message }
    );
  } catch (err) {
    console.error("devCommand error:", err);
    await sock.sendMessage(chatId, { text: `❌ Error showing dev info: ${err.message}` }, { quoted: message });
  }
}

module.exports = devCommand;
