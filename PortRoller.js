
var ButtonTable = $('#ButtonTable');
var ExchangeTable = $('#ExchangeTable');
var Sources=[];

for (const [key, value] of Object.entries(PortData)) {
    ProcessEntry(key, value)
}

console.log(`Sources:${Sources}`);

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