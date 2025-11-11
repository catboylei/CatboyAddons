import Settings from "../../config"
import { meow, woof, regsexMeow, regsexWoof, removeFormatting, prefix, hasMeow } from "../../utils/meowUtils"

let lastMeow = 0
//const cooldown = Settings().autoMeowCooldown

register("chat", (event) => {

    if (!Settings().autoMeow || !Settings().toggle) return;  

    let msg = ChatLib.getChatMessage(event, true);
    msg = removeFormatting(msg)

    // friend join

    if (Settings().autoMeowFriend && msg.startsWith('Friend > ') && msg.includes(' joined.')) {
        const player = msg.split('> ')[1].split(' ')[0];
        setTimeout(() => {ChatLib.command(`msg ${player} ${(Settings().toggleWoof ? woof() : meow())}`)}, 500);
        return
    }

    // party join

    if (( msg.includes("joined the party.") || msg.includes("joined your party!") ) && Settings().autoMeowParty) {          
        ChatLib.command(`pc ${(Settings().toggleWoof ? woof() : meow())}`)
        return
    }
    
    // meowback and player message (player message just disables final check in meowback)

    if (!Settings().autoMeowBack && !Settings().gigaAutoMeow) return;  // stops here if no player message detection needed
    
    const colonIndex = msg.indexOf(":");
    if (colonIndex === -1) return;                                   // no colon found, :c ... or rather c (system message)

    const nickRank = msg.substring(0, colonIndex).trim(); 
    if (nickRank.includes(Player.name) || nickRank.includes("To ")) return;                      // not a self message
    
    const body = msg.substring(colonIndex+1).trim();
    if ( !hasMeow(body, Settings().toggleWoof) && !Settings().gigaAutoMeow) return;  // no meow/woof in message 

    let cooldown = Number(Settings().autoMeowCooldown)
    if (isNaN(cooldown) || cooldown <= 0) cooldown = 500;

    const now = Date.now()
    if (now - lastMeow < cooldown) {
        setTimeout(() => {ChatLib.chat(`${prefix} &dAuto meow is on cooldown, you meowed too hard...`)}, 10)
        return; // cooldown, mainly to avoid chaining with another automeow
    }

    ChatLib.command(
        `${nickRank.includes("Party") ? "pc" : // pchat
        nickRank.includes("Guild") ? "gc" :    // gchat
        nickRank.includes("Co-op") ? "cc" :    // coopchat
        nickRank.includes("From") ? "r" :      // dm
        "ac"} ${(Settings().toggleWoof ? woof() : meow())}`      // all chat 
    );

    lastMeow = now
})