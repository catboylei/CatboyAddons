import Settings from "../../config"
import { meow, woof } from "../../utils/meowUtils"

let sendingReplacement = false

register("messageSent", (message, event) => {
    if (sendingReplacement) return // this is there to prevent recursion
    if (!Settings().meowSpeak || !Settings().toggle) return
    if (message.startsWith("/")) return // yes this actually matters, yes its because of odin
    
    sendingReplacement = true

    cancel(event)

    ChatLib.say(`${message} ${(Settings().toggleWoof ? woof() : meow() )}`)

    sendingReplacement = false
})