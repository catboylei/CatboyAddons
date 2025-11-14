export const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow")

// sends a gui click packet, default parameters send a left click in any gui
export function sendWindowClick(windowId = 0, slot=0, clickType=0, actionNumber=0) {
    Client.sendPacket(new C0EPacketClickWindow(windowId ?? Player.getContainer().getWindowId(), slot, clickType ?? 0, 0, null, actionNumber))
}