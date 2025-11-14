import Settings from "../../config"
import { prefix, data } from "../../utils/utils"

let centerX = 0
let centerY = 0
let disabledColor = Renderer.color(150, 150, 150, 100)
let color = Renderer.color(255, 206, 255, 50)

// default button settings [x, y, toggle, action]
let defaultButtons = {
    1: [-80, -100, false, "meow"],
    2: [-62, -100, true, "meow"],
    3: [-44, -100, true, "meow"],
    4: [-26, -100, true, "meow"],
    5: [-8, -100, true, "meow"],
    6: [10, -100, true, "meow"],
    7: [28, -100, true, "meow"],
    8: [46, -100, true, "meow"],
    9: [64, -100, true, "meow"],
    10: [89, 59, true, "meow"],
    11: [89, 36, true, "meow"],
    12: [89, 18, true, "meow"],
    13: [89, 0, true, "meow"],
    14: [89, -23, true, "meow"],
    15: [89, -41, true, "meow"],
    16: [89, -59, true, "meow"],
    17: [89, -77, true, "meow"],
    18: [-105, -77, true, "meow"],
    19: [-105, -59, true, "meow"],
    20: [-105, -41, true, "meow"],
    21: [-105, -23, true, "meow"],
    22: [-105, 0, true, "meow"],
    23: [-105, 18, true, "meow"],
    24: [-105, 36, true, "meow"],
    25: [-105, 59, true, "meow"],
    26: [-80, 84, true, "meow"],
    27: [-62, 84, true, "meow"],
    28: [-44, 84, true, "meow"],
    29: [-26, 84, true, "meow"],
    30: [-8, 84, true, "meow"],
    31: [10, 84, true, "meow"],
    32: [28, 84, true, "meow"],
    33: [46, 84, true, "meow"],
    34: [64, 84, true, "meow"],
}

// adds the default buttons to data file if missing
for (key in defaultButtons) {
    if (!data.inventoryButtons[key]) {
        data.inventoryButtons[key] = defaultButtons[key]
        data.save()
    }
}

// refreshes variables at a sensible rate
register("step", () => {
    if (!Settings().inventoryButtons || !Settings().toggle) return
    centerX = Renderer.screen.getWidth() / 2
    centerY = Renderer.screen.getHeight() / 2 
    let [r, g, b, o] = Settings().enabledColor 
    color = Renderer.color(r, g, b, o)
    let [r1, g1, b1, o1] = Settings().disabledColor
    disabledColor = Renderer.color(r1, g1, b1, o1)
}).setFps(5)

// return id of hovered button or false
function buttonHovered(mouseX, mouseY) {
    for (key in data.inventoryButtons) {
        if (
            mouseX > centerX + data.inventoryButtons[key][0] && 
            mouseX < centerX + data.inventoryButtons[key][0] + 16 &&
            mouseY > centerY + data.inventoryButtons[key][1] && 
            mouseY < centerY + data.inventoryButtons[key][1] + 16
        ) return (key)
    }
    return false
}

// render a button at coords with color
function drawButton(enabled, x, y) {
    
    // disabled circle outline
    if (!enabled) {
        if (Settings().hideDisabled) return
        Renderer.drawRect(disabledColor, x + 1, y, 14, 1)       
        Renderer.drawRect(disabledColor, x + 1, y + 15, 14, 1)  
        Renderer.drawRect(disabledColor, x, y + 1, 1, 14)      
        Renderer.drawRect(disabledColor, x + 15, y + 1, 1, 14)
        return
    }

    Renderer.drawRect(color, x, y, 16, 16)

    const colorOutline = Renderer.color((color >> 16) & 255, (color >> 8) & 255, color & 255, 150)
    Renderer.drawRect(colorOutline, x + 1, y, 14, 1)       
    Renderer.drawRect(colorOutline, x + 1, y + 15, 14, 1)  
    Renderer.drawRect(colorOutline, x, y + 1, 1, 14)      
    Renderer.drawRect(colorOutline, x + 15, y + 1, 1, 14)
}

// renders all of the buttons
register("guiRender", (mouseX, mouseY, gui) => {
    if (!Settings().inventoryButtons || !Settings().toggle) return
    if (!(gui instanceof net.minecraft.client.gui.inventory.GuiInventory)) return
    for (key in data.inventoryButtons) {
        drawButton(data.inventoryButtons[key][2], centerX + data.inventoryButtons[key][0], centerY + data.inventoryButtons[key][1])
    }
})

// handle clicking on buttons
register("guiMouseClick", (mouseX, mouseY, mbtn, gui, event) => {
    if (!Settings().inventoryButtons || !Settings().toggle) return
    if (!(gui instanceof net.minecraft.client.gui.inventory.GuiInventory)) return
    if (!buttonHovered(mouseX, mouseY)) return

    cancel(event)

    // handle left click (execute action)
    if (mbtn === 0 && data.inventoryButtons[buttonHovered(mouseX, mouseY)][2]) {
        ChatLib.say(data.inventoryButtons[buttonHovered(mouseX, mouseY)][3])
    }

    // handle right click (enable/disable)
    if (mbtn === 1) {
        data.inventoryButtons[buttonHovered(mouseX, mouseY)][2] = !data.inventoryButtons[buttonHovered(mouseX, mouseY)][2]
        data.save()
    }

    // handle middle click (set action)
    if (mbtn === 2 && data.inventoryButtons[buttonHovered(mouseX, mouseY)][2]) {
        ChatLib.chat(`${prefix} &dSet button message or command :`)
        
        const listener = register("messageSent", (msg, event) => {
            cancel(event)
            listener.unregister()
            data.inventoryButtons[buttonHovered(mouseX, mouseY)][3] = msg
            data.save()
            ChatLib.chat(`${prefix} &dButton now sends "${data.inventoryButtons[buttonHovered(mouseX, mouseY)][3]}"`)
        })
    }
})