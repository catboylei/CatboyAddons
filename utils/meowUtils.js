export const regsexMeow = /\b(m[e,o,a,r,u]{1,6}(w+r*)*(o|p|r)*|n+y+a+|p+u+r{2,})[~!?.]*\b/i
export const regsexWoof = /.*(a+r+f+|a+w+r+u+ff+|b+a+r+k+|w+oo+f+).*/i // PLEASE save this regex from hell

// blacklist for false positives
const blacklist = ["more", "mer", "mur", "me", "ma", "mop", "map", "more."] 
// takes in a string and Settings().toggleWoof
export function hasMeow(str, woof) {
    const match = str.match(woof ? regsexWoof : regsexMeow)
    if (match) {
        if (blacklist.includes(match[0].toLowerCase())) return false
        return true
    } 
    return false
}

export const meows = ["meow", "mraow", "mreow", "mrrp", "nyaa", "purrr", "mrrroew", "mewo", "mrwow", "meowwr", "mraowr"] // add meows here
export const meowsAddons = ["~", "~~", " :3", "", "", " :3c", " !", "~!"] // add stuff after meows here
export const woofs = ["woof", "arf", "awruff", "bau", "wruff", "ruff", "wif wif"] // add woofs here
export const woofsAddons = ["~", "~~", " :3", " B:3", "", " :3c", " !!"] // add stuff after woof here

// generates a random meow
export function meow() {
    return `${meows[Math.floor(Math.random()*meows.length)]}${meowsAddons[Math.floor(Math.random()*meowsAddons.length)]}` // oh great heavens
}

// generates a random woof
export function woof() {
    return `${woofs[Math.floor(Math.random()*woofs.length)]}${woofsAddons[Math.floor(Math.random()*woofsAddons.length)]}` // oh great heavens (again)
}