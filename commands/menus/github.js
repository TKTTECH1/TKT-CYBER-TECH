const settings = require('../../settings');
const path = require('path');
const fs = require('fs');

const imagePath = path.join(__dirname, '../../assets/bot_image.jpg');

module.exports = async (sock, chatId, message) => {
    const caption = `
╭═✦〔 ✅ *ꜱᴇʟᴇᴄᴛᴇᴅ* ✅ 〕✦═╮
│🛠️ ᴘʀᴇғɪx  : [ ${settings.prefix} ]
│🚀 ᴠᴇʀsɪᴏɴ : *${settings.version}*
╰═══⭘════════════⚬═╯
  𝓒𝓡𝓔𝓐𝓣𝓞𝓣 :𝐓𝐀𝐅𝐀𝐃𝐙𝐖𝐀-𝐓𝐊𝐓🇿🇼
╭═✦〔 💻 *ɢɪᴛʜᴜʙ ᴄᴍᴅꜱ* 〕✦═╮
│
│🔹 .git
│🔹 .github
│🔹 .sc
│🔹 .script
│🔹 .repo
│
╰═✪╾✦═✦═✦═✦═✦╼✪═╯
> ${settings.caption}
`;

    let imageBuffer = null;
    if (fs.existsSync(imagePath)) {
        imageBuffer = fs.readFileSync(imagePath);
    }

    await sock.sendMessage(chatId, {
        ...(imageBuffer ? { image: imageBuffer } : {}),
        caption,
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363418027651738@newsletter',
                newsletterName: 'TKT-CYBER-TECH',
                serverMessageId: -1
            }
        }
    }, { quoted: message });

    await sock.sendMessage(chatId, {
        react: { text: '📂', key: message.key }
    });
};
