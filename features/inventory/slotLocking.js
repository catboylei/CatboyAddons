import Settings from "../../config"
import { sendWindowClick, data } from "../../utils/meowUtils"

register ("PacketSent", (packet, event) => {
    if ( !Settings().slotLocking || !Settings().toggle ) return
    if ( !(parseInt(packet.func_149542_h()) === 4 || parseInt(packet.func_149544_d()) === -999) ) return // returns if not a drop

    const slot = parseInt(packet.func_149544_d())

    // handling settings one by one for readability and stuff

    if ( Settings().noDrop ) { // if setting is enabled, just block all drops and return
        cancel(event)
        sendWindowClick(packet.func_149548_c(), 0, 3, 0) // fabricates new packet in place of the drop to resync
        return
    }

    if ( Settings().lockBoundSlots ) { 
        if ((slot === -999) || !(slot in data.slotBindings || slot in data.slotBindingsHistory)) return // return if invalid slot
        cancel(event)
        sendWindowClick(packet.func_149548_c(), 0, 3, 0) // fabricates new packet in place of the drop to resync
        return
    }

}).setFilteredClass(net.minecraft.network.play.client.C0EPacketClickWindow)

register ("PacketSent", (packet, event) => {
    if ( !Settings().slotLocking || !Settings().toggle ) return
    if ( !(String(packet.func_180762_c()) === "DROP_ITEM" || String(packet.func_180762_c()) === "DROP_ALL_ITEMS") ) return

    if ( Settings().noDrop ) return cancel(event) // cancel all drops if setting is on

    if ( Settings().lockBoundSlots && (Player.getPlayer().field_71071_by.field_70461_c + 36) in data.slotBindingsHistory ) return cancel(event) // cancel drop only if slot is bound

}).setFilteredClass(net.minecraft.network.play.client.C07PacketPlayerDigging)