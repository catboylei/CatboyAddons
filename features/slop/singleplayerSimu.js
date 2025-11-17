import Settings from "../../config"
import { getEtherwarpBlock } from "../../../BloomCore/utils/Utils"
import { C08PacketPlayerBlockPlacement } from "../../utils/packetUtils"
import { isInSingleplayer, isHoldingAotv, predictTeleport } from "../../utils/simuUtils"

// handle etherwarp simu
register("packetSent", (packet) => {
    if (!Settings().singleplayerEwarp || !isInSingleplayer() || !isHoldingAotv() || !Settings().toggle || !Settings().toggleSimu) return

    const dir = packet.func_149568_f()
    if (dir !== 255) return

    const target = (Player.isSneaking()) ? getEtherwarpBlock() : predictTeleport()
    if (!target) return
    const [x, y, z] = target

    Client.scheduleTask(0, () => {
        Player.getPlayer().func_70107_b(x+0.5, y+1.05, z+0.5)
        Player.getPlayer().func_70016_h(0, 0, 0)
    })
}).setFilteredClass(C08PacketPlayerBlockPlacement)

// handle speed and lava simu
register("tick", () => {
    if (!isInSingleplayer() || !Settings().toggle || !Settings().toggleSimu) return
    
    // speed handler
    if (Settings().singleplayerSpeed) {
        Player.getPlayer().func_110148_a(net.minecraft.entity.SharedMonsterAttributes.field_111263_d).func_111128_a(0.50000000745)
        Player.getPlayer().field_71075_bZ.func_82877_b(0.50000000745)
    }

    const { field_70159_w: motionX, field_70179_y: motionZ } = Player.getPlayer()
    const block = World.getBlockAt(Player.getX() - 1, Player.getY(), Player.getZ()).type.getRegistryName()

    if (Settings().singleplayerLavaBounce && Player.getPlayer().func_180799_ab()) {
        return Client.scheduleTask(() => Player.getPlayer().func_70016_h(motionX, 1.83, motionZ))
    }

    if (Settings().singleplayerSuperbounce && (block.includes("rail")) || block.includes("flower")) {
        return Client.scheduleTask(() => Player.getPlayer().func_70016_h(motionX, 3.44, motionZ))
    }
})