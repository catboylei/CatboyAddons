import Settings from "../../config"
import { data, prefix } from "../../utils/utils"

// im too tired to comment this shit its 3 in the morning set me free from the mines please
register("messageSent", (msg, event) => {
    if (!Settings().toggle || !Settings().customAliases || !msg.startsWith("/")) return

    if (msg.startsWith("/aliashelp")) {
        cancel(event)
        ChatLib.chat(`&dTo set new aliases -> &r/setalias [alias] [command] \n&dTo remove aliases -> &r/removealias [alias/all]`)
    }
    
    if (msg.startsWith("/setalias")) {
        cancel(event)

        const meow = msg.split(' ')
        let alias = meow[1]
        let command = meow.slice(2).join(" ")

        if (!(command.startsWith("/"))) command = `/${command}`
        if (!(alias.startsWith("/"))) alias = `/${alias}`

        data.customAliases[alias] = command
        data.save()

        ChatLib.chat(`${prefix} &dSuccessfully bound the alias "&r${alias}&d" to the command "&r${command}&d"`)
    }

    if (msg.startsWith("/removealias")) {
        cancel(event)

        const meow = msg.split(' ')

        let alias = meow[1]

        if (!(alias.startsWith("/"))) alias = `/${alias}`

        for (key in data.customAliases) {
            if (alias === key || alias === "/all") {
                delete data.customAliases[key]
                data.save()

                ChatLib.chat(`${prefix} &dSuccessfully removed the alias "&r${key}&d"`)
            }
        }
    }

    for (key in data.customAliases) {
        if (msg === key) {
            cancel(event)
            ChatLib.say(data.customAliases[key])
        }
    }
})