import Settings from '../../config'

register("chat", (ign) => {
    if (!Settings().toggle || !Settings().autoPchat) return
    if (ign === Player.name) ChatLib.command('chat p')
}).setCriteria("Party Finder > ${ign} joined the dungeon group! ${class}")

register("chat", () => {
    if (!Settings().toggle || !Settings().autoPchat) return
    ChatLib.command('chat p')
}).setCriteria("You have joined ${player} party!")