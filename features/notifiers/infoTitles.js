import Dungeon from "../../../BloomCore/dungeons/Dungeon"
import Settings from "../../config"

// initializes minecraft title renderer when dungeon starts
register("chat", () => { 
    if (!Settings().toggle) return
    Client.showTitle(`&dmeow`, "", 0, 60, 0)
}).setCriteria("[NPC] Mort: Here, I found this map when I first entered the dungeon.")

// maxor wish
register("chat", () => {
    if (!Settings().wishTitle || !Settings().toggle || !Settings().toggleBossfightTitles) return
    Client.showTitle(`&dwish`, "", 0, 60, 0)
    World.playSound("note.pling", 10, 0.75)
}).setCriteria("⚠ Maxor is enraged! ⚠")

// core wish
register("chat", () => {
    if (!Settings().wishTitle || !Settings().toggle || !Settings().toggleBossfightTitles) return
    Client.showTitle(`&dwish`, "", 0, 60, 0)
    World.playSound("note.pling", 10, 0.75)
}).setCriteria("[BOSS] Goldor: You have done it, you destroyed the factory…")

// rag axe
register("chat", () => {
    if (!Settings().ragAxeTitle || !Settings().toggle || !Settings().toggleBossfightTitles) return
    Client.showTitle(`&drag`, "", 0, 60, 0)
    World.playSound("note.pling", 10, 0.75)
}).setCriteria("[BOSS] Wither King: I no longer wish to fight, but I know that will not stop you.")

// wither keys
let keyId = []

// key spawn
register("renderEntity", (entity) => {
    if (!(entity.getName?.().includes("Wither Key")) && !(entity.getName?.().includes("Blood Key"))) return
    if (!Settings().witherKeySpawn || !Settings().toggle || !Settings().toggleBloodRush) return
    
    // stores key uuid
    if (keyId === entity.getUUID?.()) return
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

// blood open (only f7m7 i think)
register("chat", () => {
    if (!Settings().bloodOpen || !Settings().toggle || !Settings().toggleBloodRush) return
    Client.showTitle(`&dBlood Started!`, "", 0, 30, 0)
    World.playSound("note.pling", 10, 0.75)
}).setCriteria("[BOSS] The Watcher: Things feel a little more roomy now, eh?")

register("chat", () => {
    if (!Settings().bloodDone || !Settings().toggle || !Settings().toggleClearTitles) return
    Client.showTitle(`&dBlood Done!`, "", 0, 30, 0)
    World.playSound("note.pling", 10, 0.75)
}).setCriteria("[BOSS] The Watcher: You have proven yourself. You may pass.")

register("soundPlay", (_, name, vol) => {
    if (!Settings().batDeath || !Settings().toggle || !Settings().toggleClearTitles) return
    if ((name == "mob.bat.hurt" && vol == 0.10000000149011612) || name == "mob.bat.death") {
        Client.showTitle("&dBat Killed!", "", 0, 30, 0)
    }
})

let announced270 = false
let announced300 = false
let announcedMimic = false
register("worldUnload", () => {
    announced270 = false
    announced300 = false
    announcedMimic= false
})

let SplusSound = new Sound({source: "Splus.ogg"})

// clear titles
register("step", () => {
    if (!Dungeon.inDungeon || !Settings().toggleClearTitles) return
    if (!announced270 && Dungeon.score >= 270 && Settings().Stitle) {
        Client.showTitle(`&d270 score`, "", 0, 30, 0)
        //SplusSound.play()
        World.playSound("note.pling", 10, 0.75)
        announced270 = true
    }
    if (!announced300 && Dungeon.score >= 300 && Settings().SPlustitle) {
        Client.showTitle(`&d300 score`, "", 0, 30, 0)
        SplusSound.play()
        announced300 = true
    }
    if (!announcedMimic && Dungeon.mimicKilled && Settings().mimicTitle) {
        Client.showTitle(`&dmimic killed`, "", 0, 30, 0)
        World.playSound("note.pling", 10, 0.75)
        announcedMimic = true
    }
}).setFps(5)