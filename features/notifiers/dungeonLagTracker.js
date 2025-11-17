import Settings from "../../config"
// skid from trimonu

let _onServerTick = []
let _scheduleTaskList = []

const onTick = (fn) => {
    if (typeof fn !== "function") throw `${fn} is not a valid function.`

    _onServerTick.push(fn)
}

register("packetReceived", (packet) => {
    if (!(Settings().announceDungeonLag) || !(Settings().toggle)) return
    if (packet.func_148890_d() > 0) return

    for (let idx = 0; idx < _onServerTick.length; idx++) {
        _onServerTick[idx]()
    }

    for (let idx = _scheduleTaskList.length - 1; idx >= 0; idx--) {
        let delay = _scheduleTaskList[idx][1]--

        if (delay !== 0) continue

        let fn = _scheduleTaskList[idx][0]
        fn()

        _scheduleTaskList.splice(idx, 1)
    }
}).setFilteredClass(net.minecraft.network.play.server.S32PacketConfirmTransaction)

let timeServer = 0
let timeClient = 0

const split = () => {
    if (!(Settings().announceDungeonLag) || !(Settings().toggle)) return
    if (timeClient < timeServer) {
        timeClient = timeServer
    }
    setTimeout(() => {
        ChatLib.say(`[CatboyAddons] ${(timeClient - timeServer) / 20} seconds lost to server lag!`)
        timeServer = 0
        timeClient = 0
    }, 750);
}

onTick(() => { 
    timeServer += 1
})

const client = register("Tick", () => {
    if (!(Settings().announceDungeonLag) || !(Settings().toggle)) return
    timeClient += 1
}).unregister()

register("Chat", () => {
    client.register()
    timeServer = 0
    timeClient = 0
}).setCriteria("[NPC] Mort: Here, I found this map when I first entered the dungeon.")

register("Chat", () => {
    if (!(Settings().announceDungeonLag) || !(Settings().toggle)) return
    split()
}).setCriteria("                             > EXTRA STATS <")