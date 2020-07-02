
var Sources=["Trade Hub"];

for (const [key, value] of Object.entries(PortData)) {
    ProcessEntry(key, value)
}

console.log(`Sources:${Sources}`);

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
}

// Handlers
function HandleButtonClick(key) {
    console.log(`HandleButtonClick:key=${key}`);
    BuildExchangeTable(key);
}

// Entry Processing
function ProcessEntry(key, entry) {
    console.log(`ProcessEntry(${key}):${entry.Sources}`);
    AddSources(entry.Sources);
}

function AddSources(sources) {
    sources.forEach(source => {
        if(!Sources.includes(source)){
            Sources.push(source);
        }
    });
}

// Helper Functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}