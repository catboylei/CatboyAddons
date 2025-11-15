import Settings from "../../config"

let centerX
let centerY

// refreshes variables at a sensible rate
register("step", () => {
    if (!Settings().meowGui || !Settings().toggle) return
    centerX = Renderer.screen.getWidth() / 2
    centerY = Renderer.screen.getHeight() / 2 
}).setFps(5)

// loads images and sets sizes
left_ear = new Image("leftEar5.png", "../../assets/leftEar5.png")
leftEarWidth = left_ear.getTextureWidth() / 1.2
leftEarHeight = left_ear.getTextureHeight() / 1.2

right_ear = new Image("rightEar.png", "../../assets/rightEar.png")
rightEarWidth = right_ear.getTextureWidth() / 1.2
rightEarHeight = right_ear.getTextureHeight() / 1.2

tail = new Image("tail.png", "../../assets/tail.png")
tailWidth = tail.getTextureWidth() / 1
tailHeight = tail.getTextureHeight() / 1

function playAnimation() {
    setTimeout(() => { left_ear = new Image("leftEar1.png", "../../assets/leftEar1.png") }, 0)
    setTimeout(() => { left_ear = new Image("leftEar2.png", "../../assets/leftEar2.png") }, 100)
    setTimeout(() => { left_ear = new Image("leftEar3.png", "../../assets/leftEar3.png") }, 300)
    setTimeout(() => { left_ear = new Image("leftEar4.png", "../../assets/leftEar4.png") }, 400)
    setTimeout(() => { left_ear = new Image("leftEar5.png", "../../assets/leftEar5.png") }, 500)
}

// random animation trigger
register("step", () => {
    if (!Settings().meowGui || !Settings().toggle) return
    if (Math.random()*10 < 8) return
    playAnimation()
}).setFps(1)

// renderer
register("guiRender", (_, __, gui) => {
    if (!Settings().meowGui || !Settings().toggle) return

    if (gui instanceof net.minecraft.client.gui.inventory.GuiInventory && Settings().meowInventory) {
        Renderer.translate(0,0,200)
        Renderer.drawImage(left_ear, centerX - 100, centerY - 178, leftEarWidth, leftEarHeight)
        Renderer.translate(0,0,200)
        Renderer.drawImage(right_ear, centerX + 20, centerY - 158, rightEarWidth, rightEarHeight)
        Renderer.translate(0,0,200)
        Renderer.drawImage(tail, centerX + 87, centerY - 65, tailWidth, tailHeight)
    }

    if (gui instanceof net.minecraft.client.gui.inventory.GuiChest && Settings().meowChest) {
        const size = (Player.getContainer().getSize())
        
        let leftOffset = 116 + size
        let rightOffset = 96 + size

        Renderer.translate(0,0,200)
        Renderer.drawImage(left_ear, centerX - 100, centerY - leftOffset, leftEarWidth, leftEarHeight)
        Renderer.translate(0,0,200)
        Renderer.drawImage(right_ear, centerX + 20, centerY - rightOffset, rightEarWidth, rightEarHeight)
        Renderer.translate(0,0,200)
        Renderer.drawImage(tail, centerX + 87, centerY - 65, tailWidth, tailHeight)
    }
})