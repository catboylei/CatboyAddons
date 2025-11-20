import Settings from "../../config"
import { data } from "../../utils/utils"
import { renderBoxFromCorners } from "../../../BloomCore/RenderUtils"

// used to reset all pos messages
function reset() {
    for (let key in data.posMessages) {
        data.posMessages[key][0] = true
    }
    data.save()
}

// transforms 0,255 rgb values into 0,1 for tesselator
function toTessColor([r, g, b]) {
    r = Math.max(0, Math.min(255, r))
    g = Math.max(0, Math.min(255, g))
    b = Math.max(0, Math.min(255, b))

    return [r / 255, g / 255, b / 255]
}

// checks if player is in range of given position
function isInRange(coords) {
    let x = Player.getX()
    let y = Player.getY()
    let z = Player.getZ()
    
    if ((x > coords[1][0] && x <= coords[1][1]) && (y > coords[2][0] && y <= coords[2][1]) && (z > coords[3][0] && z <= coords[3][1])) return true
    
    return false
}

// stores if player is in f7 bossfight and resets all posmsgs when boss starts
let inF7Boss = false
register('chat', () => {
    inF7Boss = true
    reset()
}).setCriteria("[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!")
register('worldLoad', () => {
    inF7Boss = false
})

// resets posmsgs when p3 starts
register('chat', () => {
    reset()
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?")

// posmsgs
data.posMessages = { 
    'In p2': [true, [68, 79], [218, 220], [32, 50]],
    'At ss': [true, [107, 110], [119, 121], [93, 95]],
    'At low ee2': [true, [49, 59], [108, 110], [130, 132]],
    'At high ee2': [true, [59, 62], [131, 133], [138, 142]],
    'At i3': [true, [-1, 4], [119, 121], [76, 79]],
    'At low ee3': [true, [1, 3], [108, 110], [101, 106]],
    'At high ee3': [true, [18, 19], [120.5, 122.5], [91, 100]],
    'At core': [true, [53, 56], [114, 116], [50, 54]],
    'At i4': [true, [62, 65], [126, 128], [34, 37]],
    'At mid': [true, [49, 60], [64, 66], [71, 82]],
    'In p5': [true, [51, 58], [54, 56], [73, 80]],
}
data.save()

let previous = ''

//message logic
register("step", () => {
    if (!inF7Boss || !Settings().posMessages) return

    let pos = ''
    for (let key in data.posMessages) {
        if (isInRange(data.posMessages[key])) pos = key
    }

    if (previous === pos) return //ChatLib.chat('already in the guy')
    previous = pos

    if (!pos) return
    if (!Settings()[pos.toLowerCase().replaceAll(' ', '')]) return // this is pretty scuffed but its a lot better than having one if statement per hard coded value...

    if (Settings().triggerOnce) {
        if (!data.posMessages[pos][0]) return
        data.posMessages[pos][0] = false
        data.save()
    }

    ChatLib.chat(`pc ${pos}`)
    if (Settings().posSounds) Settings().toggleWoof ? World.playSound("mob.wolf.bark", 0.5, 1) : World.playSound("mob.cat.meow", 0.5, 1)
    if (Settings().posTitles) Client.showTitle(`&d${pos}`, "", 0, 30, 0)
})

// renderer logic
let rainbow = 0
register('renderWorld', () => {
    if (!inF7Boss || !Settings().posMessages || !Settings().posDisplay) return
    for (let key in data.posMessages) {

        if (isInRange(data.posMessages[key])) return

        let [sent, [x1, x2], [y1, y2], [z1, z2]] = data.posMessages[key]
        if (!sent || !Settings()[key.toLowerCase().replaceAll(' ', '')]) continue

        const [r, g, b] = toTessColor(Renderer.getRainbowColors(rainbow, 200))
        renderBoxFromCorners(x1, y1, z1, x2, y2 - 1, z2, r, g, b, 1, false, 3, false)
    }
    rainbow++
})

// debug commands
register('command', () => {
    reset()
}).setName('reset')

register('command', () => {
    inF7Boss = true
}).setName('forceboss')