module.exports = {
    matar: {
        description: 'Mata o {usuário}.',

        /**
         *
         * @param {Message} message
         * @param {String[]} args
         * @return {Promise<*>}
         */
        fn: async (message, args) => {
            if (!(message.mentions.members.first())) {
                return message.reply('Mencione quem você quer matar.');
            }

            const dead = message.member.guild.roles.cache.find(role => role.name === 'Morto');

            const person = message.mentions.members.first();

            if (person.id === '334736345094160387') {
                await message.channel.send(`A ousadia de ${mention(message.author)} foi tão grande que irritou os deuses.\nUm relâmpago cai do céu e leva sua vida também.`);
                return await message.member.roles.add(dead);
            }

            if (message.member.hasPermission('ADMINISTRATOR')) {
                await message.channel.send(`Com o poder concedido a ele pelos deuses da Computaria, ${mention(message.author)} tira de ${person} a imortalidade da alma aos mortos no chat.`);
                await person.roles.add(dead);
            } else {
                await message.channel.send(`${mention(message.author)} suplica aos deuses da Computaria para que ${person} morra...`);
                const rnd = Math.floor((Math.random() * 10) + 1);

                if (rnd < 5) {
                    await message.channel.send(`E o pedido é aceito!\n${person} está morto.`);
                    await person.roles.add(dead);
                } else if (rnd < 7) {
                    await message.channel.send('O pedido é aceito com uma condição: **A vida do orador é levada como pagamento**.');
                    await person.roles.add(dead);
                    await message.member.roles.add(dead);
                } else if (rnd < 9) {
                    await message.channel.send('Mas o pedido é recusado.');
                } else {
                    await message.channel.send(`A ousadia de ${mention(message.author)} foi tão grande que irritou os deuses.\nUm relâmpago cai do céu e leva sua vida também.`);
                    await message.member.roles.add(dead);
                }
            }
        },
    },
}

function mention(author) {
    return `<@${author.id}>`;
}
