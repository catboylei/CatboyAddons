export function isInSingleplayer() {
    return Client.getMinecraft().func_71356_B()
}

export function isHoldingAotv() {
    return Player.getHeldItem()?.getName().includes("Diamond Shovel")
}

// zph skid
import Vector3 from "../../BloomCore/utils/Vector3";

const Vec3 = Java.type("net.minecraft.util.Vec3");

const IGNORED = [0, 51, 8, 9, 10, 11, 171, 331, 39, 40, 115, 132, 77, 143, 66, 27, 28, 157];
const IGNORED2 = [44, 182, 126]; // ignored blocks for selbox raycast
const SPECIAL = [65, 106, 111]; // blocks for exclusive selbox raycast

const steps = 100;

export function predictTeleport(distance = 12) {
    let x = Player.getX()
    let y = Player.getY()
    let z = Player.getZ()
    let pitch = Player.getPitch()
    let yaw = Player.getYaw()

	const forward = Vector3.fromPitchYaw(pitch, yaw).multiply(1 / steps);
	const cur = new Vector3(x, y + Player.getPlayer().func_70047_e(), z);
	let i = 0;
	for (; i < distance * steps; ++i) {
		if (i % steps === 0 && !isSpecial(cur.getX(), cur.getY(), cur.getZ()) && !isSpecial(cur.getX(), cur.getY() + 1, cur.getZ())) {
			if (!isIgnored(cur.getX(), cur.getY(), cur.getZ()) || !isIgnored(cur.getX(), cur.getY() + 1, cur.getZ())) {
				cur.add(forward.multiply(-steps));
				if (i === 0 || !isIgnored(cur.getX(), cur.getY(), cur.getZ()) || !isIgnored(cur.getX(), cur.getY() + 1, cur.getZ())) return false;
				return [Math.floor(cur.getX()) + 0.5, Math.floor(cur.getY()), Math.floor(cur.getZ()) + 0.5];
			}
		}
		if ((!isIgnored2(cur.getX(), cur.getY(), cur.getZ()) && inBB(cur.getX(), cur.getY(), cur.getZ())) || (!isIgnored2(cur.getX(), cur.getY() + 1, cur.getZ()) && inBB(cur.getX(), cur.getY() + 1, cur.getZ()))) {
			cur.add(forward.multiply(-steps));
			if (i === 0 || (!isIgnored(cur.getX(), cur.getY(), cur.getZ()) && inBB(cur.getX(), cur.getY(), cur.getZ())) || (!isIgnored(cur.getX(), cur.getY() + 1, cur.getZ()) && inBB(cur.getX(), cur.getY() + 1, cur.getZ()))) return false;
			break;
		}
		cur.add(forward);
	}
	const pos = new Vector3(x, y + Player.getPlayer().func_70047_e(), z).add(Vector3.fromPitchYaw(pitch, yaw).multiply(Math.floor(i / steps)));
	if ((!isIgnored(cur.getX(), cur.getY(), cur.getZ()) && inBB(cur.getX(), cur.getY(), cur.getZ())) || (!isIgnored(cur.getX(), cur.getY() + 1, cur.getZ()) && inBB(cur.getX(), cur.getY() + 1, cur.getZ()))) return false;
	return [Math.floor(pos.getX()) + 0.5, Math.floor(pos.getY()), Math.floor(pos.getZ()) + 0.5];
}

function isIgnored(x, y, z) {
	return IGNORED.includes(World.getBlockAt(Math.floor(x), Math.floor(y), Math.floor(z)).type.getID());
}

function isIgnored2(x, y, z) {
	return isIgnored(x, y, z) || IGNORED2.includes(World.getBlockAt(Math.floor(x), Math.floor(y), Math.floor(z)).type.getID());
}

function isSpecial(x, y, z) {
	return SPECIAL.includes(World.getBlockAt(Math.floor(x), Math.floor(y), Math.floor(z)).type.getID());
}

function inBB(x, y, z) {
	// if (!isSpecial(x, y, z)) return true;
	const block = World.getBlockAt(Math.floor(x), Math.floor(y), Math.floor(z));
	const mcBlock = block.type.mcBlock;
	const bb = mcBlock.func_180646_a(World.getWorld(), block.pos.toMCBlock());
	const vec = new Vec3(x, y, z);
	return bb.func_72318_a(vec);
}