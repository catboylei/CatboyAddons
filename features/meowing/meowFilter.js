import Settings from "../../config"
import { meow, woof } from "../../utils/meowUtils"

register("chat", (event) => {                                      
    
    if (!Settings().meowFilter || !Settings().toggle) return; 

    let cancelled = false 
    
    let filterList = Settings().meowFilterCustom.split(" "); // imports list of custom words from config
    let msg = ChatLib.getChatMessage(event, true);   

    for (let word of filterList) {

        if (msg.includes(word) && filterList.length > 0) {   // returns if custom list empty so it doesnt shit itself
            
            cancel(event)                                              
            cancelled = true
            
            msg = msg.replaceAll(word, (Settings().toggleWoof ? woof() : meow()) )             
        }
    }
        
    if (!cancelled) return; // only sends new message if cancelled
    ChatLib.chat(msg)
    
})