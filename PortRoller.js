
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
    var exchange = CalculateExchange(source);
    Object.keys(exchange).sort().forEach(key =>{
        var curRow = table.insertRow(-1);
        FillExchangeTableRow(curRow, exchange[key])
    });
    BuildExchangeTableHeaders(table);
}

function BuildExchangeTableHeaders(table) {
    var row2 = table.insertRow(0);
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
    var cell4_2 = row2.insertCell(4);
    cell4_2.innerHTML = "Amount(Tons)";

    var cell5_2 = row2.insertCell(5);
    cell5_2.innerHTML = "Ton";
    cell5_2.className = "sell";
    var cell6_2 = row2.insertCell(6);
    cell6_2.innerHTML = "Pound";
    cell6_2.className = "sell";
    var cell7_2 = row2.insertCell(7);
    cell7_2.innerHTML = "Ounce";
    cell7_2.className = "sell";

    var row1 = table.insertRow(0);
    row1.className = "header";
    var cell1 = row1.insertCell(0);
    cell1.innerHTML = "Buy";
    cell1.colSpan = 3;
    cell1.className = "buy";
    var cell2 = row1.insertCell(1);
    var cell2 = row1.insertCell(2);
    var cell2 = row1.insertCell(3);
    cell2.innerHTML = "Sell";
    cell2.colSpan = 3;
    cell2.className = "sell";
}

function FillExchangeTableRow(row, entry) {
    var BuyTon = row.insertCell(0);
    var BuyPound = row.insertCell(1);
    var BuyOunce = row.insertCell(2);

    var Item = row.insertCell(3);
    var Amount = row.insertCell(4);

    var SellTon = row.insertCell(5);
    var SellPound = row.insertCell(6);
    var SellOunce = row.insertCell(7);

    BuyTon.className = "buy";
    BuyPound.className = "buy";
    BuyOunce.className = "buy";

    SellTon.className = "sell";
    SellPound.className = "sell";
    SellOunce.className = "sell";

    Item.innerHTML = entry.Item;
    Amount.innerHTML = entry.Amount;

    BuyTon.innerHTML = BuildDNDCurrencyDiv(entry.Buy);
    BuyPound.innerHTML = BuildDNDCurrencyDiv(entry.Buy/2000);
    BuyOunce.innerHTML = BuildDNDCurrencyDiv(entry.Buy/32000);

    SellTon.innerHTML = BuildDNDCurrencyDiv(entry.Sell);
    SellPound.innerHTML = BuildDNDCurrencyDiv(entry.Sell/2000);
    SellOunce.innerHTML = BuildDNDCurrencyDiv(entry.Sell/32000);
}

function CalculateExchange(source) {
    var exchange={};
    SourceMap[source].forEach(entry => {
        var cur = {};
        if(!CheckIfAvailable(source,entry.value)) { return }
        cur.Item = entry.key;
        cur.Amount = CalculateAmount(entry.value);
        cur.Buy = CalculateBuy(entry.value);
        cur.Sell = CalculateSell(entry.value, cur.Buy);
        exchange[entry.key] = cur
        console.log(`CalculateExchange(${entry.key}):`
            + `Amount=${cur.Amount},`
            + `Buy=${cur.Buy},`
            + `Sell=${cur.Sell}`
        );
    });
    return exchange;
}

function CheckIfAvailable(source, entry) {
    var rate;
    if(source == "Trade Hub") { 
        rate = entry.Availability.Hub
    } else if(entry.Sources.includes(source)) {
        rate = entry.Availability.Source
    } else {
        rate = entry.Availability.ElseWhere
    }
    return Math.random() < rate;
}

function CalculateAmount(entry) {
    return RollDice(entry.Amount.Roll) * (entry.Amount.Percentage == null ? 1 : entry.Amount.Percentage);
}

function CalculateBuy(entry) {
    var range = entry.BuyRange.Max - entry.BuyRange.Min;
    return entry.BasePrice * ((Math.random() * range) + entry.BuyRange.Min);
}

function CalculateSell(entry, buy) {
    var range = entry.SellRange.Max - entry.SellRange.Min;
    return buy - (buy *(Math.random() * range));
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

function RollDice(string) {
    var split = string.split("d");
    var count = parseInt(split[0]);
    var sides = parseInt(split[1]);
    var total = 0;
    for(i=0;i<count;i++) {
        total += RollDie(sides);
    }
    return total;
}

function RollDie(sides) {
    return Math.floor(Math.random() * sides + 1);
}

function BuildDNDCurrencyDiv(cp) {
    var pp = Math.floor(cp/1000);
    cp = cp % 1000;
    var gp = Math.floor(cp/100);
    cp = cp % 100;
    var sp = Math.floor(cp/10);
    cp = Math.round(cp % 10);

    return `<div class="currency">`
        + `<span class="platinum">${pp}</span>.`
        + `<span class="gold">${gp}</span>.`
        + `<span class="silver">${sp}</span>.`
        + `<span class="copper">${cp}</span>`
        + `</div>`
}