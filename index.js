const { azuraCast } = require("./azura")

const azura = azuraCast("https://radio.chillwavradio.com")

azura.getSongName("Chillwav Radio").then(console.log).catch(console.error);
console.log("  ---------  ");
azura.getStatus("Chillwav Radio").then(console.log).catch(console.error);


