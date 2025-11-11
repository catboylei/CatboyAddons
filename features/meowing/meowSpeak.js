import Settings from "../../config"
import { meow, woof } from "../../utils/meowUtils"

let sendingReplacement = false;

register("messageSent", (message, event) => {
    if (sendingReplacement) return; // no recursion
    if (!Settings().meowSpeak || !Settings().toggle) return;
    if (message.startsWith("/")) return; // this is for mod comp, odin....
    
    sendingReplacement = true;

    cancel(event)  // cancel sent message

    ChatLib.say(`${message} ${(Settings().toggleWoof ? woof() : meow() )}`) // send the new message

    sendingReplacement = false;
})