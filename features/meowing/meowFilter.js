import Settings from "../../config"

function filterString(str, filterList) {
    
    for (let word of filterList) {
        if (str.includes(word) && filterList.length > 0) {                                            
            str = str.replaceAll(word, 'meow' )             
        }
    }

    return str
}

register("chat", (event) => {                                      
    if (!Settings().meowFilter || !Settings().toggle) return; 

    let filterList = Settings().meowFilterCustom.split(" ")
    let msg = ChatLib.getChatMessage(event, true)

    msg = filterString(msg, filterList)

    cancel(event)
    ChatLib.chat(msg)
})