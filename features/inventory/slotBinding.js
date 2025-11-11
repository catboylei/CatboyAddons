import Settings from "../../config"
import { prefix, data, isInDungeon } from "../../utils/meowUtils" 

let firstSlot = null

const getPlayerController = () => Client.getMinecraft().field_71442_b

const handleShiftClick = (slot) => {

    // handles clicking on inventory slot
    if (slot < 36 || slot > 44) {
        if (!(slot in data.slotBindings)) return

        const hotbarSlot = data.slotBindings[slot] % 36
        if (hotbarSlot == null || hotbarSlot >= 9) return

        // switching the slots
        getPlayerController().func_78753_a(
            Player.getContainer().getWindowId(), 
            slot, 
            hotbarSlot, 
            2,
            Player.getPlayer()
        )

        if (Settings().slotBindingSound) (Settings().toggleWoof) ? World.playSound("mob.wolf.bark", 0.5, 1) : World.playSound("mob.cat.meow", 0.5, 1)

        data.slotBindingsHistory[data.slotBindings[slot]] = slot
        data.save()
    }

    // handles clicking on hotbar slot
    if (data.slotBindingsHistory[slot]) {

        getPlayerController().func_78753_a(
            Player.getContainer().getWindowId(), 
            data.slotBindingsHistory[slot], 
            slot % 36, 
            2,
            Player.getPlayer()
        )

        if (Settings().slotBindingSound) Settings().toggleWoof ? World.playSound("mob.wolf.bark", 0.5, 1) : World.playSound("mob.cat.meow", 0.5, 1)
    }
}

register("guiMouseClick", (_, __, mbtn, gui, event) => {
    if (!Settings().slotBinding || !Settings().toggle || !(gui instanceof net.minecraft.client.gui.inventory.GuiInventory)) return
    if (Settings().slotBindingDungeon && !isInDungeon()) return
    
    let slot = gui.getSlotUnderMouse()?.field_75222_d // gets the current hovered slot

    // handles right click with key held
    if (mbtn === 1 && Keyboard.isKeyDown(Settings().slotBindingKeybind)) {
        cancel(event)

        // handles clicking hotbar slots
        if (slot > 35 && slot < 45) {

            let matches = 0
            
            for (let key in data.slotBindings) {
                if (data.slotBindings[key] === slot) {
                    
                    matches++

                    delete data.slotBindings[key]
                }
            }

            delete data.slotBindingsHistory[slot]
            data.save()

            if (matches > 0) { 
                ChatLib.chat(`${prefix} &dRemoved &r${matches} &dbinding(s)`)
                return
            }

            ChatLib.chat(`${prefix} &dNo bindings to remove on that slot.`)
            return
        }
 
        if (!(slot in data.slotBindings)) {
            ChatLib.chat(`${prefix} &dNo bindings to remove on that slot.`)
            return
        }

        data.slotBindingsHistory[data.slotBindings[slot]] = -1
        delete data.slotBindings[slot]
        data.save()
        
        ChatLib.chat(`${prefix} &dRemoved binding.`)
        return 
    }
    
    // handles left click
    if (mbtn !== 0 ) return 

    if (!slot || slot < 5) return
    
    // handles clicking on hotbar first
    if (firstSlot && (slot < 36 || slot > 44)) {
        const tempslot = firstSlot
        firstSlot = slot; slot = tempslot
    }

    // handles shift clicking on bound slot
    if (Keyboard.isKeyDown(Keyboard.KEY_LSHIFT) && ( slot in data.slotBindings || slot in data.slotBindingsHistory) ) {
        cancel(event)
        handleShiftClick(slot)
        slot = null
        firstSlot = null
        return
    }

    // handles binding slots
    if (!Keyboard.isKeyDown(Settings().slotBindingKeybind)) return
    
    if ((data.slotBindings[slot]) || data.slotBindings[firstSlot]) {
        ChatLib.chat(`${prefix} &dThis slot is already bound to a hotbar slot.`)
        firstSlot = null
        slot = null
        return
    }

    if (!firstSlot) firstSlot = slot

    if (!(slot in data.slotBindings) && !firstSlot) {
        data.slotBindings[slot] = null
        data.save()
    }

    cancel(event)

    // handles second click and actually binding
    if (slot === firstSlot) return

    if (!(slot > 35 && slot < 45) && !(firstSlot > 35 && slot < 45)) {
        ChatLib.chat(`${prefix} &dPlease bind one of the slots to the hotbar.`)
        delete data.slotBindings[firstSlot]
        data.save()
        firstSlot = null

        return
    }

    data.slotBindings[firstSlot] = slot
    data.slotBindingsHistory[slot] = firstSlot
    data.save()

    ChatLib.chat(`${prefix} &dSaved binding.`)

    firstSlot = null
}) 

const opacity = 50
let hotbarColors = []

// ai slop themes....
if (Settings().slotBindingTheme === 0) {
    hotbarColors = [
        Renderer.color(255, 182, 193, opacity), // Slot 0 - Light Pink 🌸
        Renderer.color(255, 153, 204, opacity), // Slot 1 - Pink 💖
        Renderer.color(255, 128, 191, opacity), // Slot 2 - Hot Pink 🌷
        Renderer.color(238, 104, 210, opacity), // Slot 3 - Orchid 🌺
        Renderer.color(221, 76, 192, opacity),  // Slot 4 - Fuchsia 🌸
        Renderer.color(186, 85, 211, opacity),  // Slot 5 - Medium Purple 💜
        Renderer.color(148, 0, 211, opacity),   // Slot 6 - Dark Violet 🔮
        Renderer.color(123, 0, 179, opacity),   // Slot 7 - Dark Purple 🟣
        Renderer.color(75, 0, 130, opacity)     // Slot 8 - Indigo 🟪
    ]
}

if (Settings().slotBindingTheme === 1) {
    hotbarColors = [
        Renderer.color(228, 3, 3, opacity),    // Slot 0 - Pride Red ❤️
        Renderer.color(255, 140, 0, opacity),  // Slot 1 - Pride Orange 🧡
        Renderer.color(255, 237, 0, opacity),  // Slot 2 - Pride Yellow 💛
        Renderer.color(0, 128, 38, opacity),   // Slot 3 - Pride Green 💚
        Renderer.color(0, 77, 255, opacity),   // Slot 4 - Pride Blue 💙
        Renderer.color(117, 7, 135, opacity),  // Slot 5 - Pride Purple 💜
        Renderer.color(91, 206, 250, opacity), // Slot 6 - Trans Light Blue 💙
        Renderer.color(245, 169, 184, opacity),// Slot 7 - Trans Pink 💖
        Renderer.color(255, 255, 255, opacity) // Slot 8 - Trans White 🤍
    ]
}

// draws outline on specified slot coords
function drawSlotOutline(x, y, size = 16, thickness = 1, color = Renderer.color(255, 255, 255, 255)) {
    
    Renderer.drawRect(color, x, y, 16, 16)

    const colorOutline = Renderer.color((color >> 16) & 255, (color >> 8) & 255, color & 255, 150)

    Renderer.drawRect(colorOutline, x, y, size, thickness)
    Renderer.drawRect(colorOutline, x, y + size - thickness, size, thickness)
    Renderer.drawRect(colorOutline, x, y, thickness, size)
    Renderer.drawRect(colorOutline, x + size - thickness, y, thickness, size)
}

// slot binding display
register("renderSlot", (slot, gui) => {
    if (!(gui instanceof net.minecraft.client.gui.inventory.GuiInventory)) return
    if (!Settings().slotBindingThemeToggle || !Settings().slotBinding || !Settings().toggle ) return
    if (Settings().slotBindingDungeon && !isInDungeon()) return

    const slotIndex = slot.getIndex()
    let color = null

    if (data.slotBindings[slotIndex] !== undefined) { // inventory slot
        const hotbarIndex = data.slotBindings[slotIndex]
        color = hotbarColors[hotbarIndex - 36]
    } 
    else if (data.slotBindingsHistory[slotIndex] !== undefined && data.slotBindingsHistory[slotIndex] !== -1) { // hotbar slot
        color = hotbarColors[slotIndex - 36]
    }

    if (!color) return

    drawSlotOutline(slot.getDisplayX(), slot.getDisplayY(), 16, 1, color)
})