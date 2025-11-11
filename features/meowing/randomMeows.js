import Settings from "../../config"
import { meow, woof } from "../../utils/meowUtils"

// tick counter colon three
let counter = 0

register("step", () => {
    if (!Settings().randomMeows || !Settings().toggle) return;
    counter++
    
    if (counter >= Settings().randomMeowsTime * 20) {
        counter = 0
        
        if (Math.random() > (Settings().randomMeowsChance / 100) ) return
        ChatLib.say((Settings().toggleWoof ? woof() : meow()))
    }
}).setFps(20)