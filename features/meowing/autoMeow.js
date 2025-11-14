import Settings from "../../config"
import { meow, woof, hasMeow } from "../../utils/meowUtils"
import { prefix } from "../../utils/utils"

let lastMeow = 0

register("chat", (event) => {

    if (!Settings().autoMeow || !Settings().toggle) return

    let msg = ChatLib.getChatMessage(event, true);
    msg = ChatLib.removeFormatting(msg)

    // friend join
    if (Settings().autoMeowFriend && msg.startsWith('Friend > ') && msg.includes(' joined.')) {
        const player = msg.split('> ')[1].split(' ')[0]
        setTimeout(() => {ChatLib.command(`msg ${player} ${(Settings().toggleWoof ? woof() : meow())}`)}, 500)
        return
    }

    // party join
    if (( msg.includes("joined the party.") || msg.includes("joined your party!") ) && Settings().autoMeowParty) {          
        ChatLib.command(`pc ${(Settings().toggleWoof ? woof() : meow())}`)
        return
    }
    
    // meowback and player message (player message disables final check in meowback)
    if (!Settings().autoMeowBack && !Settings().gigaAutoMeow) return
    
    const colonIndex = msg.indexOf(":")
    if (colonIndex === -1) return // no colon found, :c ... or rather c

    const nickRank = msg.substring(0, colonIndex).trim()
    if (nickRank.includes(Player.name) || nickRank.includes("To ")) return
    
    const body = msg.substring(colonIndex+1).trim()
    if ( !hasMeow(body, Settings().toggleWoof) && !Settings().gigaAutoMeow) return

    let cooldown = Number(Settings().autoMeowCooldown)
    if (isNaN(cooldown) || cooldown <= 0) cooldown = 500

    // cooldown logic
    const now = Date.now()
    if (now - lastMeow < cooldown) {
        setTimeout(() => {ChatLib.chat(`${prefix} &dAuto meow is on cooldown, you meowed too hard...`)}, 10)
        return
    }

    ChatLib.command(
        `${nickRank.includes("Party") ? "pc" : 
        nickRank.includes("Guild") ? "gc" :    
        nickRank.includes("Co-op") ? "cc" :    
        nickRank.includes("From") ? "r" :     
        "ac"} ${(Settings().toggleWoof ? woof() : meow())}` 
    );

    lastMeow = now
})