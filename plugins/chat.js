const Discord = require('discord.js');
const {prefix, webhook_id, webhook_token} = require('../config.js');

module.exports = {
    calculista: {
        description: 'Frio e calculista.',

        /**
         *
         * @param {Message} message
         * @return {Promise<*>}
         */
        fn: async message => {
            await message.channel.send('https://cdn.discordapp.com/attachments/720001553259560980/732265392575086642/calculista.gif');
            await message.delete();
        },
    },

    amaralcoca: {
        description: 'Amaral patrocinado da Coca.',

        /**
         *
         * @param {Message} message
         * @return {Promise<*>}
         */
        fn: async message => {
            await message.channel.send('https://cdn.discordapp.com/attachments/726967953249271889/738110385596661872/14088635_10210564297732608_934088823122108351_n.png');
            await message.delete();
        },
    },

    matematico: {
        description: '@Matemático.',

        /**
         *
         * @param {Message} message
         * @return {Promise<*>}
         */
        fn: async message => {
            await message.channel.send('https://cdn.discordapp.com/attachments/726967953249271889/738108978948603977/37912_palestrante.png');
            await message.delete();
        },
    },

    meninoney: {
        description: 'Menino Neylan.',

        /**
         *
         * @param {Message} message
         * @return {Promise<*>}
         */
        fn: async message => {
            await message.channel.send('https://cdn.discordapp.com/attachments/726967953249271889/738108981595078666/Neylan-Leal.png');
            await message.delete();
        },
    },

    citar: {
        description: 'Cria uma citação para o canal #falas.',

        /**
         *
         * @param {Message} message
         * @param {String[]} args
         * @return {Promise<*>}
         */
        fn: async (message, args) => {
            const msg = message.content.slice(prefix.length).replace(/^citar /, '');

            if (!/\/de{[^}]+}/gm.test(msg)) {
                return message.reply('Informe quem você quer citar.');
            }

            const from = /\/de{(?<From>[^}]+)}/gm.exec(msg).groups.From;
            const cite = msg.replace(/\/de{[^}]+}/gm, '').trim();

            await message.channel.send(`_"${cite}"_\n                                                                                                    **${from}**`)
                .then(() => message.delete());
        },
    },

    recitar: {
        description: 'Edita uma citação.',

        /**
         *
         * @param {Message} message
         * @param {String[]} args
         * @return {Promise<*>}
         */
        fn: async (message, args) => {
            const msg = message.content.slice(prefix.length).replace(/^recitar /, '');

            if (!/\/id{\d+}/gm.test(msg)) {
                return message.reply('Informe a ID da mensagem.');
            }

            if (!/\/de{[^}]+}/gm.test(msg)) {
                return message.reply('Informe quem você quer citar.');
            }

            const ID = /\/id{(?<ID>\d+)}/gm.exec(msg).groups.ID;
            const from = /\/de{(?<From>[^}]+)}/gm.exec(msg).groups.From;
            const cite = msg.replace(/\/id{\d+}/gm, '').replace(/\/de{[^}]+}/gm, '').trim();

            await message.channel.messages.fetch(ID)
                .then(message => message.edit(`_"${cite}"_\n                                                                                                    **${from}**`))
                .then(() => message.delete())
                .catch(e => {
                    message.reply('Deu ruim aqui.');
                    console.error(e);
                });
        },
    },

    notificar: {
        description: 'Notifica no canal #avisos.',

        /**
         *
         * @param {Message} message
         * @param {String[]} args
         * @return {Promise<*>}
         */
        fn: async (message, args) => {
            if (args.length === 0) {
                return await message.channel.send('Informe a mensagem do anúncio.');
            }

            const msg = args.join(' ');
            const webhook = new Discord.WebhookClient(webhook_id, webhook_token);

            await webhook.send(msg);
        }
    },

    furry: {
        description: 'Alerta de furry.',

        /**
         *
         * @param {Message} message
         * @return {Promise<*>}
         */
        fn: async message => {
            const sirene = message.guild.emojis.cache.find(e => e.name === 'sirene');
            await message.channel.send(`${sirene} ALERTA DE FURRY ${sirene}`);
            await message.delete();
        },
    },

    copypasta: {
        description: 'Copypasta da velha.',
    
        fn: async (message, args) => {
            const msg = message.content.slice(prefix.length).replace(/^copypasta /, '');

            if (!/\/nome{[^}]+}/gm.test(msg) || !/\/ra{[^}]+}/gm.test(msg)) {
                return await message.channel.send(`Eu, colocar seu nome e RA, declaro que esta prova reflete meu conhecimento sobre o conteúdo da disciplina de Álgebra Linear e que não houve qualquer comunicação com os demais alunos da turma ou com outras pessoas durante o período de sua realização.`);
            }

            const nome = /\/nome{(?<Nome>[^}]+)}/gm.exec(msg).groups.Nome;
            const ra = /\/ra{(?<RA>[^}]+)}/gm.exec(msg).groups.RA;
            const cite = msg.replace(/\/nome{[^}]+}/gm, '').replace(/\/ra{[^}]+}/gm, '').trim();

            await message.channel.send(`Eu, ${nome} ${ra}, declaro que esta prova reflete meu conhecimento sobre o conteúdo da disciplina de Álgebra Linear e que não houve qualquer comunicação com os demais alunos da turma ou com outras pessoas durante o período de sua realização.`);
        }
    },
}
