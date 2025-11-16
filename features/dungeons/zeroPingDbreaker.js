import Settings from "../../config";
import { isInDungeon } from "../../utils/utils";

function getBlockPosFloor(x, y, z) {
    return new BlockPos(Math.floor(x), Math.floor(y), Math.floor(z))
}

function setBlockAt(x, y, z, id) {
    const world = World.getWorld()
    const blockPos = getBlockPosFloor(x, y, z).toMCBlock()
    world.func_175656_a(blockPos, Java.type("net.minecraft.block.Block").func_176220_d(id))
    world.func_175689_h(blockPos)
}

const blacklist = [166, 7, 137, 46, 54, 146, 120, 119, 29, 34, 33, 69, 77, 154]

register("packetSent", (packet) => {
    if (!Settings().zeroPingDb || !Settings().toggle) return
    const block = Player.lookingAt()
    const blockID = block?.getType()?.getID()
    const held = Player.getHeldItem()

    if (String(packet.func_180762_c()) !== "START_DESTROY_BLOCK" || !(isInDungeon()) || blacklist.includes(blockID)) return
    if (!(held?.getName()?.removeFormatting()?.includes('Dungeonbreaker')) || held?.getDurability() < 79) return
    
    setBlockAt(block.getX(), block.getY(), block.getZ(), 0)
    if (Settings().DbSounds) World.playSound("note.pling", 10, 1)
}).setFilteredClass(net.minecraft.network.play.client.C07PacketPlayerDigging) // this comment was brought to you by the cat   vvvvvvvvvvvvvkjjjjjjjjjjjjjjjjj,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
