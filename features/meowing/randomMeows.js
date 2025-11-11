import Settings from "../../config"
import { meow, woof } from "../../utils/meowUtils"

let counter = 0 // YEP THIS IS A FUCKING TICK COUNTER FUCK YOU

register("step", () => {
    if (!Settings().randomMeows || !Settings().toggle) return;

    counter++; // :fire:
    
    if (counter >= Settings().randomMeowsTime * 20) { // will only trigger when tick counter reaches amount defined in config
        counter = 0;
        
        if (Math.random() > (Settings().randomMeowsChance / 100) ) return; // rolls according to chance in config
        ChatLib.say((Settings().toggleWoof ? woof() : meow()));
    }
}).setFps(20)