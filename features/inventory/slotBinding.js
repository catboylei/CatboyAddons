import Settings from "../../config"
import { prefix, data, isInDungeon } from "../../utils/meowUtils" 

let firstSlot = null
//const Keybind = Keyboard.getKeyIndex((Settings().slotBindingKeybind).toUpperCase())
const Keybind = Settings().slotBindingKeybind

// (Client.getMinecraft().field_71442_b).func_78753_a ( window id, slot 1, slot 2, 2, player ) is the method to switch items

const getPlayerController = () => Client.getMinecraft().field_71442_b

const handleShiftClick = (slot) => {

    if (slot < 36 || slot > 44) { // if inventory slot
        if (!(slot in data.slotBindings)) return // returns if there is no binding on said slot

        const hotbarSlot = data.slotBindings[slot] % 36 // get other slot (has to be hotbar)
        if (hotbarSlot == null || hotbarSlot >= 9) return // if other slot null or not hotbar return

        getPlayerController().func_78753_a( // switch function (ty obfuscated code)
            Player.getContainer().getWindowId(), 
            slot, 
            hotbarSlot, 
            2,
            Player.getPlayer()
        )

        if (Settings().slotBindingSound) (Settings().toggleWoof) ? World.playSound("mob.wolf.bark", 0.5, 1) : World.playSound("mob.cat.meow", 0.5, 1);

        data.slotBindingsHistory[data.slotBindings[slot]] = slot  // saves a history of the last inv slot used with hotbar slot
        data.save()
    }

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
    if (!Settings().slotBinding || !Settings().toggle || !(gui instanceof net.minecraft.client.gui.inventory.GuiInventory)) return; 
    if (Settings().slotBindingDungeon && !isInDungeon()) return;
    
    let slot = gui.getSlotUnderMouse()?.field_75222_d // gets the current hovered slot through more obfuscated functions wooo

    // handle right click
    
    if (mbtn === 1 && Keyboard.isKeyDown(Settings().slotBindingKeybind)) {
        cancel(event)

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
    
    // handle left click

    if (mbtn !== 0 ) return 

    if (!slot || slot < 5) return // return if crafting slot or no slot

    if (firstSlot && (slot < 36 || slot > 44)) { // if there is a firstSlot and second click isnt a hotbar, handle it by switching them around lmao
        const tempslot = firstSlot
        firstSlot = slot; slot = tempslot // this just switches the values, have to do it with a const bc ct is dumb
    }

    if (Keyboard.isKeyDown(Keyboard.KEY_LSHIFT) && ( slot in data.slotBindings || slot in data.slotBindingsHistory) ) { // if shift is pressed and there is a binding on that slot, handle it
        cancel(event)
        handleShiftClick(slot)
        slot = null
        firstSlot = null
        return
    }

    if (!Keyboard.isKeyDown(Settings().slotBindingKeybind)) return // returns if setting key isnt pressed
    
    if ((data.slotBindings[slot]) || data.slotBindings[firstSlot]) {
        ChatLib.chat(`${prefix} &dThis slot is already bound to a hotbar slot.`)
        firstSlot = null
        slot = null
        return
    }

    if (!firstSlot) firstSlot = slot // if no firstSlot, current slot set to it (CAN STILL BE NULL IF CLICKED OUTSIDE)

        // so this does something and fixes something but idk how and why and what so ill just keep it as is
    if (!(slot in data.slotBindings) && !firstSlot) { // slot does not have a binding and no firstSlot, initializes binding
        data.slotBindings[slot] = null
        data.save()
    }

    cancel(event)

    if (slot === firstSlot) return // if were at the first click, return

    if (!(slot > 35 && slot < 45) && !(firstSlot > 35 && slot < 45)) { // returns if no hotbar slot choosen
        ChatLib.chat(`${prefix} &dPlease bind one of the slots to the hotbar.`)
        delete data.slotBindings[firstSlot]
        data.save()
        firstSlot = null

        return
    }

    data.slotBindings[firstSlot] = slot // sets binding of firstslot to the current slot
    data.slotBindingsHistory[slot] = firstSlot
    data.save()

    ChatLib.chat(`${prefix} &dSaved binding.`)

    firstSlot = null // resets firstSlot since binding has been added
}) 

const opacity = 50
let hotbarColors = []

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

function drawSlotOutline(x, y, size = 16, thickness = 1, color = Renderer.color(255, 255, 255, 255)) {
    
    Renderer.drawRect(color, x, y, 16, 16)

    const colorOutline = Renderer.color((color >> 16) & 255, (color >> 8) & 255, color & 255, 150)

    Renderer.drawRect(colorOutline, x, y, size, thickness)
    Renderer.drawRect(colorOutline, x, y + size - thickness, size, thickness)
    Renderer.drawRect(colorOutline, x, y, thickness, size)
    Renderer.drawRect(colorOutline, x + size - thickness, y, thickness, size)
}

register("renderSlot", (slot, gui) => {
    if (!(gui instanceof net.minecraft.client.gui.inventory.GuiInventory)) return
    if (!Settings().slotBindingThemeToggle || !Settings().slotBinding || !Settings().toggle ) return
    if (Settings().slotBindingDungeon && !isInDungeon()) return;

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