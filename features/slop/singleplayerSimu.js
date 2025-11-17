import Settings from "../../config"
import { getEtherwarpBlock } from "../../../BloomCore/utils/Utils"
import { prefix } from "../../utils/utils"
import { C08PacketPlayerBlockPlacement } from "../../utils/packetUtils"

function isInSingleplayer() {
    return Client.getMinecraft().func_71356_B()
}

function isHoldingAotv() {
    return Player.getHeldItem()?.getName().includes("Diamond Shovel")
}

register("packetSent", (packet) => {
    if (!Settings().singleplayerEwarp || !isInSingleplayer() || !isHoldingAotv() || !Player.isSneaking() || !Settings().toggle || !Settings().toggleSimu) return

    const dir = packet.func_149568_f()
    if (dir !== 255) return

    const target = getEtherwarpBlock()
    if (!target) return
    const [x, y, z] = target

    World.playSound("mob.enderdragon.hit", 1, 0.5396825671195984)

    Client.scheduleTask(0, () => {
        Player.getPlayer().func_70107_b(x+0.5, y+1.05, z+0.5)
        Player.getPlayer().func_70016_h(0, 0, 0)
    })

    ChatLib.chat(`${prefix} &dSimulating Etherwarp`)
}).setFilteredClass(C08PacketPlayerBlockPlacement)

register("tick", () => {
    if (!isInSingleplayer() || !Settings().toggle || !Settings().toggleSimu) return
    const { field_70159_w: motionX, field_70179_y: motionZ } = Player.getPlayer()
    const block = World.getBlockAt(Player.getX(), Player.getY(), Player.getZ()).type.getRegistryName()

    if (Settings().singleplayerLavaBounce && Player.getPlayer().func_180799_ab()) {
        ChatLib.chat(`${prefix} &dSimulating Lava Bounce`)
        Client.scheduleTask(() => Player.getPlayer().func_70016_h(motionX, 1.83, motionZ))
    } else if (Settings().singleplayerSuperbounce && block.includes("rail")) {
        ChatLib.chat(`${prefix} &dSimulating Super Bounce`)
        Client.scheduleTask(() => Player.getPlayer().func_70016_h(motionX, 3.44, motionZ))
    }
})

register("tick", () => {
    if (!Settings().singleplayerSpeed || !isInSingleplayer() || !Settings().toggle || !Settings().toggleSimu) return
    Player.getPlayer().func_110148_a(net.minecraft.entity.SharedMonsterAttributes.field_111263_d).func_111128_a(0.50000000745)
    Player.getPlayer().field_71075_bZ.func_82877_b(0.50000000745)
})