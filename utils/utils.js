import PogObject from "../../PogData"

// creates a data folder
export const data = new PogObject("CatboyAddons/data", {
    slotBindings: {},
    slotBindingsHistory: {},
    inventoryButtons: {},
    customAliases: {}
})

export const prefix = ["§5[C§dat§fbo§byA§fdd§don§5s]§r"]

export function isInDungeon() {
    try {
        return TabList?.getNames()?.some(a => a.removeFormatting() == 'Dungeon: Catacombs')
    } catch (e) { ChatLib.chat(`&cError: ${e.reason}`) }
}