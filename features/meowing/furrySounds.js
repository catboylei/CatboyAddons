import Settings from "../../config"
import { removeFormatting, hasMeow } from "../../utils/meowUtils"

register("chat", (event) => { 
    if (!Settings().meowSounds || !Settings().toggle) return;

    let msg = ChatLib.getChatMessage(event, true); // getting message 
    msg = removeFormatting(msg)

    if (hasMeow(msg, Settings().toggleWoof)) {

        //ChatLib.chat(`&dtriggered by : &r[${msg.match(regsexMeow)?.[0]}]`);
        
        (Settings().toggleWoof ? World.playSound("mob.wolf.bark", 0.5, 1) : World.playSound("mob.cat.meow", 0.5, 1) ) ;
    }
})