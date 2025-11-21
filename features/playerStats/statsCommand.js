import Settings from "../../config"
import { getPlayer } from "../../utils/sbdUtils"
import { prefix } from "../../utils/utils"
import { calcSkillLevel } from "../../../BloomCore/utils/Utils"
 
register("command", (ign, floor) => {

    if (!Settings().toggle || !Settings().statsCommand) {
        ChatLib.command(`stats ${floor}`)
        return
    }

    if (!ign) return ChatLib.chat(`&cUsage: /stats <player> <floor>`)

    getPlayer(ign).then(player => {
        ChatLib.chat(genMsgWithHover(player, floor))
    })
}).setName('stats')

function genMsgWithHover(player, floor) {
    if (!player.uuid) return `${prefix} &cInvalid Player Name`
    
    try {
    let msg = new Message()
    
    const name = new TextComponent(`${prefix} &r${player.name} -`)
    
    const cataLevel = new TextComponent(` &dc${calcSkillLevel("catacombs", player.dungeons.cataxp)} &r-`)
    cataLevel.setHover('show_text', 'MEOW')

    const secrets = new TextComponent(` &b${player.dungeons.secretAverage ? player.dungeons.secretAverage : '0.0' } savg &r-`)
    secrets.setHover('show_text', `&btotal secrets: ${player.dungeons.secrets} \n&btotal runs: ${player.dungeons.runs}`)

    const hoverPbs = (
`&5F1 ${processFloor('F1', player)} : ${processFloor('M1', player)} M1
&dF2 ${processFloor('F2', player)} : ${processFloor('M2', player)} M2
&fF3 ${processFloor('F3', player)} : ${processFloor('M3', player)} M3
&bF4 ${processFloor('F4', player)} &b: ${processFloor('M4', player)} M4
&fF5 ${processFloor('F5', player)} : ${processFloor('M5', player)} M5
&dF6 ${processFloor('F6', player)} : ${processFloor('M6', player)} M6
&5F7 ${processFloor('F7', player)} : ${processFloor('M7', player)} M7`)

    const pbFloor = new TextComponent(` &f${processFloor(floor, player)} ${floor ? floor.toUpperCase() : 'F7'}`)
    pbFloor.setHover('show_text', hoverPbs)

    msg.addTextComponent(name)
    msg.addTextComponent(cataLevel)
    msg.addTextComponent(secrets)
    msg.addTextComponent(pbFloor)

    return msg
    } catch(e) {ChatLib.chat(e)}
}

function processFloor(floor, player) {
    
    let type
    if (floor) {
        if (floor[0].toUpperCase() === 'M') {
            type = 'master_catacombs'
        }
        else {
            type = 'catacombs'
        }    
    }

    if (player.dungeons.pb[type ? type : 'catacombs'][floor ? floor[1] : '7']["S+"] === 'No S+') return '&4N/A&r'
    return player.dungeons.pb[type ? type : 'catacombs'][floor ? floor[1] : '7']["S+"]
}