import Settings from "../../config"

register("chat", () => { // initializes minecraft title renderer when dungeon starts
    if (!Settings().toggle) return
    Client.showTitle(`&dmeow`, "", 0, 60, 0)
}).setCriteria("[NPC] Mort: Here, I found this map when I first entered the dungeon.")

// rag axe
register("chat", () => {
    if (!Settings().ragAxeTitle || !Settings().toggle || !Settings().toggleBossfightTitles) return
    Client.showTitle(`&drag`, "", 0, 60, 0)
    World.playSound("note.pling", 10, 0.75)
}).setCriteria("[BOSS] Wither King: I no longer wish to fight, but I know that will not stop you.")

//wither keys
let keyId = []

// key spawn
register("renderEntity", (entity) => {
    if (!(entity.getName?.().includes("Wither Key")) && !(entity.getName?.().includes("Blood Key"))) return // returns asap if not what we want as to not kill performance (yes i tried other methods)
    if (!Settings().witherKeySpawn || !Settings().toggle || !Settings().toggleBloodRush) return
    
    if (keyId === entity.getUUID?.()) return // only proc once per key by storing current key uuid
    keyId = entity.getUUID?.()

    Client.showTitle(`&dKey spawned!`, "", 0, 30, 0)
    World.playSound("note.pling", 10, 0.75)
})

// wither key pickup
register("chat", () => {
    if (!Settings().witherKeyPickup || !Settings().toggle || !Settings().toggleBloodRush) return
    Client.showTitle(`&dWither Key picked up!`, "", 0, 30, 0)
    World.playSound("note.pling", 10, 0.75)
}).setCriteria("RIGHT CLICK on a WITHER door to open it. This key can only be used to open 1 door!")

// wither door open
register("chat", (player) => {
    if (!Settings().witherDoorOpen || !Settings().toggle || !Settings().toggleBloodRush) return
    if (player === Player.name) { // if opener is user, show a different title (without player name)
        Client.showTitle(`&dOpened door!`, "", 0, 30, 0)
        World.playSound("note.pling", 10, 0.75)
        return
    }
    Client.showTitle(`&d${player} at door!`, "", 0, 30, 0)
    World.playSound("note.pling", 10, 0.75)
}).setCriteria("${player} opened a WITHER door!")

// blood key pickup
register("chat", () => {
    if (!Settings().witherKeyPickup || !Settings().toggle || !Settings().toggleBloodRush) return
    Client.showTitle(`&dBlood Key picked up!`, "", 0, 30, 0)
    World.playSound("note.pling", 10, 0.75)
}).setCriteria("RIGHT CLICK on the BLOOD DOOR to open it. This key can only be used to open 1 door!")

// blood open 
register("chat", () => {
    if (!Settings().bloodOpen || !Settings().toggle || !Settings().toggleBloodRush) return
    Client.showTitle(`&dBlood Started!`, "", 0, 30, 0)
    World.playSound("note.pling", 10, 0.75)
}).setCriteria("[BOSS] The Watcher: Things feel a little more roomy now, eh?")