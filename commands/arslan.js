// commands/arslan.js
const axios = require("axios");

async function luckyCommand(sock, chatId, message, q) {
  try {
    if (!q) {
      return await sock.sendMessage(
        chatId,
        { text: "⚠️ Please provide a query.\n\n📌 Example:\n.TAFADZWA What is AI?" },
        { quoted: message }
      );
    }

    // React ⏳ while processing
    await sock.sendMessage(chatId, { react: { text: "⏳", key: message.key } });

    const apiUrl = `https://api.dreaded.site/api/chatgpt?text=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl, { headers: { "User-Agent": "Mozilla/5.0" } });

    const aiResponse = response.data?.result?.prompt || "❌ No response received from TAFADZWA AI.";
    const AI_IMG = "https://files.catbox.moe/cs4vek.jpg";

    await sock.sendMessage(
      chatId,
      {
        image: { url: AI_IMG },
        caption: `🤖 *TAFADZWA AI Response:*\n\n${aiResponse}`,
        contextInfo: { mentionedJid: [message.sender] },
      },
      { quoted: message }
    );

    // React ✅ on success
    await sock.sendMessage(chatId, { react: { text: "✅", key: message.key } });
  } catch (error) {
    console.error("luckyCommand error:", error);

    await sock.sendMessage(
      chatId,
      { text: `❌ Failed to fetch TAFADZWA AI response.\n\n🛠 Error: ${error.message}` },
      { quoted: message }
    );

    // React ❌ on error
    await sock.sendMessage(chatId, { react: { text: "❌", key: message.key } });
  }
}

module.exports = luckyCommand;
