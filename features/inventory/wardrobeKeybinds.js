import Settings from "../../config"
import { sendWindowClick } from "../../utils/packetUtils" 
import { prefix } from "../../utils/utils"

let isWardrobeOpen = false
let lastWardrobeSlot = -1

// yeah dont ask this is cursed
const limeDye = new Item("minecraft:dye")
limeDye.itemStack.func_77964_b(10)

const pinkDye = new Item("minecraft:dye")
pinkDye.itemStack.func_77964_b(9)

// stores last opened gui to check for wardrobe
register("packetReceived", (packet) => {
    if (!Settings().wardrobeHotkeys || !Settings().toggle) return
    const title = ChatLib.removeFormatting(packet.func_179840_c().func_150254_d()) // uses S2DPacketOpenWindow to check if gui is wardrobe
    if (title.includes("Wardrobe")) { 
        isWardrobeOpen = true
        return
    }
    isWardrobeOpen = false
}).setFilteredClass(net.minecraft.network.play.server.S2DPacketOpenWindow)

// handles wardrobe hotkeys
register("guiKey", (key, _, gui, event) => {
    if (!Settings().wardrobeHotkeys || !Settings().toggle) return
    if (!(gui instanceof net.minecraft.client.gui.inventory.GuiChest)) return
    
    key = parseInt(key)
    if (!isWardrobeOpen || !(key > 0 && key < 10 )) return

    cancel(event)

    const slotIndex = key + 35
    const slot = gui.field_147002_h.func_75139_a(slotIndex)

    if (lastWardrobeSlot === slotIndex) {
        if (Settings().unequipWardrobe) {
            sendWindowClick(gui.field_147002_h.field_75152_c, slotIndex, 0, 0)
            lastWardrobeSlot = -1
            if (Settings().pinglessWardrobe) slot.func_75215_d(pinkDye.itemStack)
            return
        }
        return
    }
    sendWindowClick(gui.field_147002_h.field_75152_c, slotIndex, 0, 0) 
    
    let lastSlot
    if (lastWardrobeSlot !== -1) lastSlot = gui.field_147002_h.func_75139_a(lastWardrobeSlot)

    if (Settings().pinglessWardrobe) {
        if (lastSlot) lastSlot.func_75215_d(pinkDye.itemStack)
        slot.func_75215_d(limeDye.itemStack)
    }
    
    lastWardrobeSlot = slotIndex

    ChatLib.chat(`${prefix} &dSwitched to Wardrobe slot &r#${key}!`)
})