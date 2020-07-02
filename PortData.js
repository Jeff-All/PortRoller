var PortData = {
    Wheat:{
        Increment:"Tons",
        Sources:["Agricultural"],
        Availability:{Source:0.95,Hub:0.5,ElseWhere:0.1},
        Amount:{Roll:"5d6"},
        BasePrice:"4g",
        BuyRange:{Min:0.5,Max:1.15},
        SellRange:{Min:0.05,Max:0.1}
    },
    silver:{
        Increment:"Tons",
        Sources:["Mining","Minor Industry","Mountain","RainForest","Desert"],
        Availability:{Source:0.6,Hub:0.8,ElseWhere:0.05},
        Amount:{Roll:"1d2",Percentage:0.25},
        BasePrice:"100g",
        BuyRange:{Min:0.5,Max:1.75},
        SellRange:{Min:0.1,Max:0.5}
    }
}