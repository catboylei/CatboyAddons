import Settings from "../../config"
import { meow, woof } from "../../utils/meowUtils"

register("chat", (event) => {                                      
    if (!Settings().meowFilter || !Settings().toggle) return; 

    let cancelled = false 
    let filterList = Settings().meowFilterCustom.split(" ")
    let msg = ChatLib.getChatMessage(event, true)

    for (let word of filterList) {

        if (msg.includes(word) && filterList.length > 0) {
            
            cancel(event)                                              
            cancelled = true
            
            msg = msg.replaceAll(word, (Settings().toggleWoof ? woof() : meow()) )             
        }
    }
        
    if (!cancelled) return; 
    ChatLib.chat(msg)
    
})