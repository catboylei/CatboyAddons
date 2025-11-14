import Settings from "../../config"
import { hasMeow } from "../../utils/meowUtils"

register("chat", (event) => { 
    if (!Settings().meowSounds || !Settings().toggle) return

    let msg = ChatLib.getChatMessage(event, true)
    msg = ChatLib.removeFormatting(msg)

    if (hasMeow(msg, Settings().toggleWoof)) {
        (Settings().toggleWoof ? World.playSound("mob.wolf.bark", 0.5, 1) : World.playSound("mob.cat.meow", 0.5, 1) )
    }
})