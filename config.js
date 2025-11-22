import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"
import { data, prefix } from "./utils/utils"

const config = new DefaultConfig("CatboyAddons", "data/settings.json")
// General
    .addSwitch({
        category: "General",
        configName: "toggle",
        title: "&l&dToggle CatboyAddons",
        description: "Decides whether all features of this mod are &denabled &f/ &7disabled",
        registerListener(previousvalue, newvalue) {
            ChatLib.chat(`${prefix} CatboyAddons is now ${newvalue ? "&dEnabled" : "&7Disabled"}`)
        }
    })
    .addSwitch({
        category: "General",
        configName: "toggleWoof",
        title: "Toggle woof mode",
        description: "toggle if you're one of them stinky puppy folk",
        registerListener(previousvalue, newvalue) {
            ChatLib.chat(`${prefix} Woof mode is now ${newvalue ? "&dEnabled" : "&7Disabled"}`)
        }
    })    
    .addSwitch({
        category: "General",
        configName: "disableWelcomeMessage",
        title: "Disable Welcome Message",
        description: "toggle welcome message on/off",
    })
    .addButton({
        category: "General",
        configName: "paws",
        title: ":3",
        description: "",
        onClick() {
            const ChatComponentText = Java.type("net.minecraft.util.ChatComponentText")
			Client.currentGui.close()
			setTimeout(() => {ChatLib.chat("§c§lA player has been removed from your game.\n§r§bUse /report to continue helping out the server!")}, 2500);
			setTimeout(() => {Client.getMinecraft().func_147114_u().func_147298_b().func_150718_a(new ChatComponentText(
			 "§cYou are temporarily banned for §f359d 23h 59m 59s§c from this server!\n\n" + 
			  `§7Reason: §rCheating through the use of unfair game advantages.\n` + 
			  "§7Find out more: §b§nhttps://www.hypixel.net/appeal\n\n§7Ban ID: §r#"
			 + "B9ACL0" + 
			 "\n§7Sharing your Ban ID may affect the processing of your appeal!"))}, 4000);
            }
    })
    // Meowing    
    .addSwitch({
        category: "Meowing",
        configName: "autoMeow",
        title: "Auto Meow",
        description: "Automatically meows on certain events",
        subcategory: "Auto Meow",
    })
    .addTextInput({
        category: "Meowing",
        configName: "autoMeowCooldown",
        title: "Auto Meow Cooldown",
        description: "in milliseconds, defaults to 500 \n(this is mainly there to avoid infinite meow chains)",
        subcategory: "Auto Meow",
        value: "500",
        placeHolder: "value in ms"
    })
    .addMultiCheckbox({
        category: "Meowing",
        subcategory: "Auto Meow",
        configName: "meowmeowmeowmeow",
        title: "Auto Meow Options",
        description: "toggleable events for Auto Meow",
        placeHolder: "meow",
        options: [
            {
                title: "On Player Meow",
                configName: "autoMeowBack",
                value: false
            },
            {
                title: "On Any Player Message",
                configName: "gigaAutoMeow",
                value: false,
            },
            {
                title: "On Party Join",
                configName: "autoMeowParty",
                value: false
            },
            {
                title: "On Friend Join",
                configName: "autoMeowFriend",
                value: false
            }
        ]
    })
    .addSwitch({
        category: "Meowing",
        configName: "meowGui",
        title: "Cat Menus",
        description: "cat menus, sprites by @lana <3 \npatcher -> fixed inventory position",
        subcategory: "Meow Menus",
    })
    .addMultiCheckbox({
        category: "Meowing",
        subcategory: "Meow Menus",
        configName: "meowmeowmeomeowmeowwmeow",
        title: "Cat Menu Options",
        description: "menus to display cat in",
        placeHolder: "meow",
        options: [
            {
                title: "Inventory",
                configName: "meowInventory",
                value: false
            },
            {
                title: "Chest Guis",
                configName: "meowChest",
                value: false,
            }
        ]
    })
    .addSwitch({
        category: "Meowing",
        configName: "meowSounds",
        title: "Meow Sounds",
        description: "Play meow whenever someone meows in chat",
        subcategory: "Meow Sounds",
    })
    .addSwitch({
        category: "Meowing",
        configName: "randomMeows",
        title: "Random Meows",
        description: "Meows Randomly",
        subcategory: "Random Meows",
    })
    .addSlider({
        category: "Meowing",
        configName: "randomMeowsTime",
        title: "Random Meow Time",
        description: "Time in seconds between every random meow attempt",
        subcategory: "Random Meows",
        options: [1, 60],
        value: 42
    })
    .addSlider({
        category: "Meowing",
        configName: "randomMeowsChance",
        title: "Random Meow Chance",
        description: "Probability (percentage) that a meow will be sent every attempt",
        subcategory: "Random Meows",
        options: [1, 100],
        value: 69
    })
    .addSwitch({
        category: "Meowing",
        configName: "meowFilter",
        title: "Meow Filter",
        description: "Replaces choosen words with meows",
        subcategory: "Meow Filter",
    })
    .addTextInput({
        category: "Meowing",
        configName: "meowFilterCustom",
        title: "Custom Filter Words",
        description: "custom words for the meow filter",
        subcategory: "Meow Filter",
        value: "",
        placeHolder: "add words here"
    })
    .addSwitch({
        category: "Meowing",
        configName: "meowSpeak",
        title: "Meow Speak",
        description: "Adds a meow after every message",
        subcategory: "Meow Speak",
    })
    // inventory
    .addSwitch({
        category: "Inventory",
        configName: "slotBinding",
        title: "Slot Binding",
        description: "Toggle Slot Binding :3c",
        subcategory: "Slot Binding",
    })
    .addKeybind({
        category: "Inventory",
        configName: "slotBindingKeybind",
        title: "Keybind",
        description: "keybind for slot binding",
        subcategory: "Slot Binding"
        //defaultKey: Keyboard.KEY_L
    })    
    .addSelection({
        category: "Inventory",
        configName: "slotBindingTheme",
        title: "Slot Binding Theme",
        description: "Select which preset you want",
        options: ["pink", "gay"],
        subcategory: "Slot Binding",
    })
    .addMultiCheckbox({
        category: "Inventory",
        subcategory: "Slot Binding",
        configName: "meowmeowmeowmeowmeow",
        title: "Slot Binding Options",
        description: "other slot binding options",
        placeHolder: "meow",
        options: [
            {
                title: "Display/Theme",
                configName: "slotBindingThemeToggle",
                value: false
            },
            {
                title: "Sounds",
                configName: "slotBindingSound",
                value: false,
            },
            {
                title: "Only in dungeons",
                configName: "slotBindingDungeon",
                value: false
            }
        ]
    })
    .addButton({
        category: "Inventory",
        configName: "removeSlotBindings",
        title: "Remove all bindings",
        description: "remove all slot bindings",
        onClick() {
            let amount = 0
            for (let key in data.slotBindings) {
                delete data.slotBindings[key]
                amount++
            }
            for (let key in data.slotBindingsHistory) {
                delete data.slotBindingsHistory[key]
            }
            data.save()
            if (amount === 0) {
                ChatLib.chat(`${prefix}&d No bindings to remove.`)
                return
            }
            ChatLib.chat(`${prefix} &dRemoved &r${amount} &dbindings.`)
        },
        subcategory: "Slot Binding",
    })
    .addSwitch({
        category: "Inventory",
        configName: "slotLocking",
        title: "Slot Locking",
        description: "enables slot locking\nnote: this is packet based to be safer, will look worse visually though\n(needs to be toggled for the below options)",
        subcategory: "Slot Locking",
    })
    .addMultiCheckbox({
        category: "Inventory",
        subcategory: "Slot Locking",
        configName: "meowmeo",
        title: "Slot Locking Options",
        description: "slot locking options",
        placeHolder: "meow",
        options: [
            {
                title: "Disable Dropping Bound Slots",
                configName: "lockBoundSlots",
                value: false
            },
            {
                title: "Disable Dropping All",
                configName: "noDrop",
                value: false
            }
        ]
    })
    .addSwitch({
        category: "Inventory",
        configName: "inventoryButtons",
        title: "Inventory Buttons",
        description: "toggles inventory buttons \nmiddle click on button to config what it sends through chat \nright click to enable/disable button",
        subcategory: "Inventory Buttons",
    })
    .addMultiCheckbox({
        category: "Inventory",
        subcategory: "Inventory Buttons",
        configName: "meowmeowmeovfhsuf",
        title: "Inventory Buttons Options",
        description: "inventory buttons options",
        placeHolder: "meow",
        options: [
            {
                title: "Fully Hide Disabled",
                configName: "hideDisabled",
                value: false
            },
            {
                title: "Button Sounds",
                configName: "invButtonsSound",
                value: false
            }
        ]
    })
    .addColorPicker({
        category: "Inventory",
        subcategory: "Inventory Buttons",
        configName: "enabledColor",
        title: "Enabled Button Color",
        description: "color of enabled buttons \nlow opacity highly recommended",
    })
    .addColorPicker({
        category: "Inventory",
        subcategory: "Inventory Buttons",
        configName: "disabledColor",
        title: "disabled Button Color",
        description: "color of disabled buttons \nlow opacity highly recommended",
    })
    
    .addSwitch({
        category: "Notifiers",
        configName: "notifyLag",
        title: "Notify Lag",
        description: "notify in chat when server lags out",
        subcategory: "Lag Notifier"
    })
    .addSlider({
        category: "Notifiers",
        configName: "minLag",
        title: "Minimum Lag",
        description: "minimum time per lag spike to notify",
        subcategory: "Lag Notifier",
        options: [200, 2000],
        value: 500
    })
    .addSwitch({
        category: "Notifiers",
        configName: "announceDungeonLag",
        title: "Announce Dungeon Lag",
        description: "notifies party of time lost to lag at the end of a run",
        subcategory: "Lag Notifier"
    })
    .addSwitch({
        category: "Dungeons",
        configName: "zeroPingDb",
        title: "Zero Ping Dungeonbreaker",
        description: "makes dungeonbreaker insta break all blocks",
        subcategory: "Zero Ping Dungeonbreaker",
    })
    .addMultiCheckbox({
        category: "Dungeons",
        subcategory: "Zero Ping Dungeonbreaker",
        configName: "meowmeowmmeoeowmeowmeowmeow",
        title: "Zero Ping Dungeonbreaker Options",
        description: "options for zero ping dungeonbreaker",
        placeHolder: "meow",
        options: [
            {
                title: "Dungeonbreaker sound",
                configName: "DbSounds",
                value: false
            }
        ]
    })
    .addSwitch({
        category: "Dungeons",
        configName: "posMessages",
        title: "Positionnal messages",
        description: "Party > [MVP+] catboylei: At Core!",
        subcategory: "Positionnal Messages",
    })
    .addMultiCheckbox({
        category: "Dungeons",
        subcategory: "Positionnal Messages",
        configName: "meowmeowmmeoeowmeowmeomneowwmeow",
        title: "Message Locations",
        description: "locations for postionnal messages",
        placeHolder: "meow",
        options: [
            {
                title: "in p2",
                configName: "inp2",
                value: false
            },
            {
                title: "at ss",
                configName: "atss",
                value: false
            },
            {
                title: "at low ee2",
                configName: "atlowee2",
                value: false
            },
            {
                title: "at high ee2",
                configName: "athighee2",
                value: false
            },
            {
                title: "at i3",
                configName: "ati3",
                value: false
            },
            {
                title: "at low ee3",
                configName: "atlowee3",
                value: false
            },
            {
                title: "at high ee3",
                configName: "athighee3",
                value: false
            },
            {
                title: "at core",
                configName: "atcore",
                value: false
            },
            {
                title: "at i4",
                configName: "ati4",
                value: false
            },
            {
                title: "at mid",
                configName: "atmid",
                value: false
            },
            {
                title: "in p5",
                configName: "inp5",
                value: false
            },
        ]
    })
    .addMultiCheckbox({
        category: "Dungeons",
        subcategory: "Positionnal Messages",
        configName: "meowmeowmmeoeowmeowmeompurrneowwmeow",
        title: "Positionnal Messages Options",
        description: "settings for pos messages",
        placeHolder: "meow",
        options: [
            {
                title: "Display",
                configName: "posDisplay",
                value: true
            },
            {
                title: "Titles",
                configName: "posTitles",
                value: true
            },
            {
                title: "Sounds",
                configName: "posSounds",
                value: true
            },
            {
                title: "Trigger Once",
                configName: "triggerOnce",
                value: true
            },
        ]
    })
    .addTextParagraph({
        category: "Player Stats",
        configName: "hi",
        title: "Auto Kick / Party Finder Stats",
        description: "&4I will NOT be adding auto kick or party finder display to this module. \nthis only serves to adds a convenient quick view of sbd's data.\n&4Use sbd directly for those features.",
        subcategory: "Stats Command"
    })
    .addSwitch({
        category: "Player Stats",
        configName: "statsCommand",
        title: "Stats Command",
        description: "displays a quick overview of dungeon stats \nusage: /stats <player> <floor> \n(defaults to f7 if no floor given)",
        subcategory: "Stats Command",
    })
    .addSwitch({
        category: "Player Stats",
        configName: "statsParty",
        title: "Party Join Stats",
        description: "automatically /stats everyone that joins your party through party finder",
        subcategory: "Stats Command",
    })
    .addSwitch({
        category: "Slop",
        configName: "toggleSimu",
        title: "Singleplayer Simulation",
        description: "simulates hypixel features in singleplayer eg. etherwarp",
        subcategory: "Singleplayer",
    })
    .addMultiCheckbox({
        category: "Slop",
        subcategory: "Singleplayer",
        configName: "meowmeowmmeoemejbowmeowmeowmeow",
        title: "Singleplayer Simulation Options",
        description: "options for singleplayer simu",
        placeHolder: "meow",
        options: [
            {
                title: "Lava Bounce",
                configName: "singleplayerLavaBounce",
                value: false
            },
            {
                title: "Super Bounce",
                configName: "singleplayerSuperbounce",
                value: false 
            },
            {
                title: "AOTV",
                configName: "singleplayerEwarp",
                value: false 
            },
            {
                title: "500 Speed",
                configName: "singleplayerSpeed",
                value: false 
            }
        ]
    })


if (data.bloat) {
    config.addSwitch({
        category: "Notifiers",
        configName: "toggleBloodRush",
        subcategory: "Blood Rush",
        title: "Toggle Blood Rush Titles",
        description: "toggle blood rush titles (meow)"
    })
    .addMultiCheckbox({
        category: "Notifiers",
        subcategory: "Blood Rush",
        configName: "meowmeowmeow",
        title: "Blood Rush Title Options",
        description: "toggleable bloodrush titles",
        placeHolder: "meow",
        options: [
            {
                title: "On Key Spawn",
                configName: "witherKeySpawn",
                value: false
            },
            {
                title: "On Key Pickup",
                configName: "witherKeyPickup",
                value: false,
            },
            {
                title: "On Door Open",
                configName: "witherDoorOpen",
                value: false
            },
            {
                title: "On Blood start",
                configName: "bloodOpen",
                value: false
            }
        ]
    })
    .addSwitch({
        category: "Notifiers",
        configName: "toggleBossfightTitles",
        title: "Toggle Boss Titles",
        description: "toggle boss titles",
        subcategory: "Boss"
    })
    .addMultiCheckbox({
        category: "Notifiers",
        subcategory: "Blood Rush",
        configName: "meowmeowmeow",
        title: "Boss Title Options",
        description: "Boss Title options",
        placeHolder: "meow",
        options: [
            {
                title: "P5 Rag Axe",
                configName: "ragAxeTitle",
                value: false
            },
            {
                title: "Wish",
                configName: "wishTitle",
                value: false
            }
        ]
    })
    .addSwitch({
        category: "Notifiers",
        configName: "toggleClearTitles",
        title: "Toggle Clear Titles",
        description: "toggle clear titles",
        subcategory: "Clear"
    })
    .addMultiCheckbox({
        category: "Notifiers",
        subcategory: "Clear",
        configName: "meowmeowmmeoeow",
        title: "Clear Title Options",
        description: "Clear Title options",
        placeHolder: "meow",
        options: [
            {
                title: "270 score",
                configName: "Stitle",
                value: false
            },
            {
                title: "300 score",
                configName: "SPlustitle",
                value: false
            },
            {
                title: "mimic killed",
                configName: "mimicTitle",
                value: false
            }
        ]
    })
    .addSwitch({
        category: "Notifiers",
        configName: "tacTimer",
        title: "Tac Timer",
        description: "displays a timer when you use tac",
        subcategory: "Other",
    })
    .addSwitch({
        category: "Dungeons",
        configName: "deathTick",
        title: "Death Tick Display",
        description: "Displays Death Tick",
        subcategory: "Death Tick",
    })
    .addSlider({
        category: "Dungeons",
        configName: "deathTickScale",
        title: "Display Scale",
        description: "scale of the death tick display",
        subcategory: "Death Tick",
        options: [0.5, 3],
        value: 1.5
    })    
    .addSwitch({
        category: "Slop",
        configName: "customAliases",
        title: "Custom Command Aliases",
        description: "lets you set custom command aliases \n/aliashelp",
        subcategory: "Aliases",
    })
    .addSwitch({
        category: "Slop",
        configName: "autoPchat",
        title: "Auto Party Chat",
        description: "automatically runs /chat p when you join a party",
        subcategory: "Party Chat",
    })
    .addSwitch({
        category: "Inventory",
        configName: "wardrobeHotkeys",
        title: "Wardrobe Keybinds",
        description: "toggles wardrobe keybinds",
        subcategory: "Wardrobe Keybinds",
    })
    .addMultiCheckbox({
        category: "Inventory",
        subcategory: "Wardrobe Keybinds",
        configName: "meowm",
        title: "Wardrobe Keybinds Options",
        description: "more wardrobe keybind options",
        placeHolder: "meow",
        options: [
            {
                title: "Allow unequipping",
                configName: "unequipWardrobe",
                value: false
            },
            {
                title: "Zero Ping Wardrobe (visually buggy)",
                configName: "pinglessWardrobe",
                value: false
            }
        ]
    })
}

register('Command', (value) => {
    if (value !== 'true' && value !== 'false') return ChatLib.chat(`&cUsage: /bloat <true/false> \n&cCurrent value : ${data.bloat}`)
    data.bloat = (value === 'true') ? true : false
    data.save()
    ChatLib.chat(`${prefix} &dSet bloat to ${data.bloat ? '&aENABLED' : '&4DISABLED'}. \n&dPlease run &f/ct reload &dto apply changes.`)
}).setName('bloat')

const setting = new Settings("CatboyAddons", config, "data/scheme-meow.json")
    .setCommand("CatboyAddons", ["cba", "catboyaddons"])

export default () => setting.settings;