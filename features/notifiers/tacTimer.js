import Settings from "../../config"
import { displayTimerTitle } from "../../utils/titleUtils"

register("soundPlay", (_, __, ___, pitch) => {
    if ( !Settings().toggle || !Settings().tacTimer ) return

    if (pitch === 0.7460317611694336) {
        displayTimerTitle(60, 2, 20)
    }

}).setCriteria("fire.ignite")