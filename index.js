import Settings from "./config"

import "./utils/meowUtils.js"
import "./utils/utils.js"
import "./utils/packetUtils.js"
import "./utils/sbdUtils.js"

import "./features/meowing/furrySounds.js"
import "./features/meowing/randomMeows.js"
import "./features/meowing/autoMeow.js"
import "./features/meowing/meowSpeak.js"
import "./features/meowing/meowFilter.js"
import "./features/meowing/meowGui.js"

import "./features/inventory/slotBinding.js"
import "./features/inventory/wardrobeKeybinds"
import "./features/inventory/slotLocking.js"
import "./features/inventory/inventoryButtons.js"

import "./features/notifiers/infoTitles.js"
import "./features/notifiers/lagNotifier.js"
import "./features/notifiers/dungeonLagTracker.js"

import "./features/dungeons/zeroPingDbreaker.js"
import "./features/dungeons/posMessages.js"
import "./features/dungeons/deathTick.js"

import "./features/slop/singleplayerSimu.js"
import "./features/slop/customAliases.js"
import "./features/slop/autoPartyChat.js"

import "./features/playerStats/statsView.js"

if (!Settings().disableWelcomeMessage) {
    ChatLib.chat(`
&5-------------------------------------------
        &dWelcome to §5[C§dat§fbo§byA§fdd§don§5s] &d/ᐠ˵- ⩊ -˵マ

        &dTo get started, open the configuration
          &dgui with &r/catboyaddons &dor &r/cba
                        ₍^. .^₎⟆

            &dTo hide \& disable bloat features
              &dthat are already in other mods, 
                 &drun /bloat &f<true/false>

            &dDisable this message by checking 
                'Disable Welcome Message'

                      &dBy lei with <3
                &dKeep Meowing ≽ ^⎚ ˕ ⎚^ ≼
&5-------------------------------------------`)
}