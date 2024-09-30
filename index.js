const Discord = require('discord.js');
const {prefix, token} = require('./config.js');
const {isAsync} = require('./lib/utils');
const commands = require('./plugins');

const client = new Discord.Client();

client.on('ready', () => {
    client.user.setPresence({
        activity: {
            name: 'Teoria de jogos',
            type: 'PLAYING',
        },

        status: 'online',
    }).then(() => {
        console.log(`O Pai tá on.`);
    });
});

client.on('message', async message => {
    if (message.content.startsWith(prefix) && !message.author.bot) {
        const args = message.content.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();

        if (!(command in commands)) {
            return await message.channel.send('Que isso');
        }

        const fn = commands[command].fn;

        try {
            if (isAsync(fn)) {
                await fn(message, args, client);
            } else {
                fn(message, args, client);
            }
        } catch (e) {
            console.error(e);
            await message.channel.send('Deu ruim.');
        }
    } else if (message.author.id === '716828755003310091') {
        if (message.embeds.length > 0 && message.embeds[0].title === 'Que porra de música é essa que tá tocando caraio!') {
            const song = message.embeds[0].description;

            client.user.setPresence({
                activity: {
                    name: song,
                    type: 'LISTENING',
                },

                status: 'online',
            });
        } else if (message.content.startsWith('Sai Minerva filha da puta.')) {
            client.user.setPresence({
                activity: {
                    name: 'Teoria de jogos',
                    type: 'PLAYING',
                },

                status: 'online',
            });
        }
    } else if (message.author.id === '604700564504182814') {
        message.react('1290138834004213770');

        if (message.content === '$tu') {
            message.react('785920500371161179');
        }
    }
});

client.on('messageDelete', async message => {
    if (message.author.id === '716828755003310091' && message.embeds.length > 0 && message.embeds[0].title === 'Que porra de música é essa que tá tocando caraio!') {
        client.user.setPresence({
            activity: {
                name: 'Teoria de jogos',
                type: 'PLAYING',
            },

            status: 'online',
        });
    }
});

client.login(token);
