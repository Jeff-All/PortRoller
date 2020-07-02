
var Sources=["Trade Hub"];
var SourceMap ={"Trade Hub":[]}

for (const [key, value] of Object.entries(PortData)) {
    ProcessEntry(key, value)
}

console.log(`Sources:${Sources}`);
var toPrint = "";
for (const [key, value] of Object.entries(SourceMap)) {
    toPrint += `[${key}=`;
    value.forEach(entry => {
        toPrint += `${entry.key},`
    });
    toPrint += "]"
}
console.log(`SourceMap:${toPrint}`);

$(document).ready(function(){
    ButtonTable = $('#ButtonTable');
    ExchangeTable = $('#ExchangeTable');
    BuildButtonTable(Sources);
});

function BuildButtonTable(sources) {
    var col = 0;
    var table = document.getElementById("ButtonTable");
    var row = table.insertRow(-1);
    sources.forEach(source => {
        console.log(`BuildButtonTable(${source})`);
        if(col >= TableConfig.ButtonTable.Width) {
            col = 0;
            row = table.insertRow(-1);
        }
        var cell = row.insertCell(-1);
        cell.innerHTML = `<button onClick="HandleButtonClick('${source}')">${capitalizeFirstLetter(source)}</button>`;
        col++;
    });
}

function BuildExchangeTable(source) {
    $("#ExchangeTable tr").remove();
    var table = document.getElementById("ExchangeTable");
    BuildExchangeTableHeaders(table);
}

function BuildExchangeTableHeaders(table) {
    var row1 = table.insertRow(0);
    row1.className = "header";
    var cell1 = row1.insertCell(0);
    cell1.innerHTML = "Buy";
    cell1.colSpan = 3;
    cell1.className = "buy";
    var cell2 = row1.insertCell(1);
    var cell2 = row1.insertCell(2);
    cell2.innerHTML = "Sell";
    cell2.colSpan = 3;
    cell2.className = "sell";

    var row2 = table.insertRow(1);
    row2.className = "header headerBorder";
    var cell1_2 = row2.insertCell(0);
    cell1_2.innerHTML = "Ton";
    cell1_2.className = "buy";
    var cell2_2 = row2.insertCell(1);
    cell2_2.innerHTML = "Pound";
    cell2_2.className = "buy";
    var cell3_2 = row2.insertCell(2);
    cell3_2.innerHTML = "Ounce";
    cell3_2.className = "buy";

    var cell4_2 = row2.insertCell(3);
    cell4_2.innerHTML = "Item";

    var cell5_2 = row2.insertCell(4);
    cell5_2.innerHTML = "Ton";
    cell5_2.className = "sell";
    var cell6_2 = row2.insertCell(5);
    cell6_2.innerHTML = "Pound";
    cell6_2.className = "sell";
    var cell7_2 = row2.insertCell(6);
    cell7_2.innerHTML = "Ounce";
    cell7_2.className = "sell";
}

// Handlers
function HandleButtonClick(key) {
    console.log(`HandleButtonClick:key=${key}`);
    BuildExchangeTable(key);
}

// Entry Processing
function ProcessEntry(key, entry) {
    console.log(`ProcessEntry(${key}):${entry.Sources}`);
    var pair = {"key":key, value:entry};
    SourceMap["Trade Hub"].push(pair)
    entry.Sources.forEach(source => {
        if(!Sources.includes(source)){
            Sources.push(source);
        }
        if(!(source in SourceMap)) {
            SourceMap[source] = []
        }
        SourceMap[source].push(pair);
    });
}

// Helper Functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}