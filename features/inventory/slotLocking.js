import Settings from "../../config"
import { sendWindowClick, data } from "../../utils/meowUtils"

// handles gui drop
register ("PacketSent", (packet, event) => {
    if ( !Settings().slotLocking || !Settings().toggle ) return
    if ( !(parseInt(packet.func_149542_h()) === 4 || parseInt(packet.func_149544_d()) === -999) ) return

    const slot = parseInt(packet.func_149544_d())

    // handling settings one by one for readability and stuff

    if ( Settings().noDrop ) {
        cancel(event)
        sendWindowClick(packet.func_149548_c(), 0, 3, 0) // new packet to resync
        return
    }

    if ( Settings().lockBoundSlots ) { 
        if ((slot === -999) || !(slot in data.slotBindings || slot in data.slotBindingsHistory)) return
        cancel(event)
        sendWindowClick(packet.func_149548_c(), 0, 3, 0) // new packet to resync
        return
    }

}).setFilteredClass(net.minecraft.network.play.client.C0EPacketClickWindow)

// handles non gui drop
register ("PacketSent", (packet, event) => {
    if ( !Settings().slotLocking || !Settings().toggle ) return
    if ( !(String(packet.func_180762_c()) === "DROP_ITEM" || String(packet.func_180762_c()) === "DROP_ALL_ITEMS") ) return

    if ( Settings().noDrop ) return cancel(event)

    if ( Settings().lockBoundSlots && (Player.getPlayer().field_71071_by.field_70461_c + 36) in data.slotBindingsHistory ) return cancel(event)

}).setFilteredClass(net.minecraft.network.play.client.C07PacketPlayerDigging)