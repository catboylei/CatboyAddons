
export const sbdData = require("sbd/util/data.js").default
export const sbdPartyMember = require("sbd/util/partymember.js").default

export function getPlayer(ign) {
    
    if (!sbdData.players[ign]) {
        sbdData.players[ign] = new sbdPartyMember(ign)
    }

    const player = sbdData.players[ign]

    return player.init().then(() => player)
}