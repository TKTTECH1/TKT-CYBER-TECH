const insults = [
    "Teri aukaat teri pocket money jaisi hai - limited aur har mahine khatam.",
 "Tere moves corrupt neta ki promise jaishe hain - sirf dikhawa hai.",
 "Tu human version hai 'low battery' ki - jab bhi kaam aaye, off ho jaata hai.",
"Tere game ki setting mein hi problem hai - na graphics hai na gameplay.",
"Tujhse better toh mere bot ki coding hai - kam se kam woh actually kaam karta hai! 😂",
"Teri thinking roadside chai jaisi hai- cheap aur har koi use kar leta hai.",
"Tere moves exam copy karne jaishe hain - pakde gaye toh fail.",
"Tera game corrupt file jaisa hai - na open ho raha hai na delete.",
"Tujhse baat karna buffering jaisa hai - bore aur time waste! 🚫"
];

async function insultCommand(sock, chatId, message) {
    try {
        if (!message || !chatId) {
            console.log('Invalid message or chatId:', { message, chatId });
            return;
        }

        let userToInsult;
        
        // Check for mentioned users
        if (message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
            userToInsult = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }
        // Check for replied message
        else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            userToInsult = message.message.extendedTextMessage.contextInfo.participant;
        }
        
        if (!userToInsult) {
            await sock.sendMessage(chatId, { 
                text: 'Please mention someone or reply to their message to insult them!'
            });
            return;
        }

        const insult = insults[Math.floor(Math.random() * insults.length)];

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));

        await sock.sendMessage(chatId, { 
            text: `Hey @${userToInsult.split('@')[0]}, ${insult}`,
            mentions: [userToInsult]
        });
    } catch (error) {
        console.error('Error in insult command:', error);
        if (error.data === 429) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            try {
                await sock.sendMessage(chatId, { 
                    text: 'Please try again in a few seconds.'
                });
            } catch (retryError) {
                console.error('Error sending retry message:', retryError);
            }
        } else {
            try {
                await sock.sendMessage(chatId, { 
                    text: 'An error occurred while sending the insult.'
                });
            } catch (sendError) {
                console.error('Error sending error message:', sendError);
            }
        }
    }
}

module.exports = { insultCommand };
