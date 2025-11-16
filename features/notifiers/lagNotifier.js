import Settings from "../../config"
import { S32PacketConfirmTransaction } from "../../utils/packetUtils"
import { prefix } from "../../utils/utils"
// feature idea credits to chloe
let lastPacket = Date.now()
let lagged = ""

function formatMilliseconds(ms) {
  const seconds = Math.floor(ms / 1000)
  const milliseconds = ms % 1000
  return `${seconds}s, ${milliseconds}`
}

// stops counting switching servers as lag
register("worldLoad", () => {
    lastPacket = Date.now()
})

register("packetReceived", () => {
    if (!Settings().notifyLag || !Settings().toggle) return
    lastPacket = Date.now()
    if (lagged) {
        ChatLib.chat(`${prefix} &dServer lagged for ${lagged}ms`)
        lagged = ''
    }
}).setFilteredClass(S32PacketConfirmTransaction)

register("step", () => {
    if (!Settings().notifyLag || !Settings().toggle) return
    const timeLagged = Date.now() - lastPacket
    if (timeLagged > Settings().minLag) {
       lagged = (Math.floor(timeLagged / 1000) > 0) ? formatMilliseconds(timeLagged) : timeLagged
    }
})