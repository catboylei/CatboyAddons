import Settings from "../../config"
import { S32PacketConfirmTransaction, S03PacketTimeUpdate } from "../../utils/packetUtils"
import { isInDungeon } from "../../utils/utils"

let ticks = -1;

register("packetReceived", () => {
    if (!Settings().toggle || !Settings().deathTick || !isInDungeon()) return
    ticks--
    if (ticks <= 0) ticks = 40
}).setFilteredClass(S32PacketConfirmTransaction)

register("packetReceived", (packet) => {
    if (!Settings().toggle || !Settings().deathTick || !isInDungeon()) return
    const totalWorldTime = packet.func_149366_c()
    if (!totalWorldTime) return

    ticks = 40 - (totalWorldTime % 40)
}).setFilteredClass(S03PacketTimeUpdate)


register("renderOverlay", () => {
    if (!Settings().toggle || !Settings().deathTick || !isInDungeon()) return
    let scale = Settings().deathTickScale
    Renderer.scale(scale)
    Renderer.drawString(`&dDeathtick: ${ticks}`, (((Renderer.screen.getWidth() / 2) / scale )- 31), 50 / scale, true)
})