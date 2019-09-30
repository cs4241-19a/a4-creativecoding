const updateMain = function (chart, mainData) {
    chart.load({
        bindto: "#main",
        data: {
            columns: mainData
        }
    });
};

const update = function (currData, mainData) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.coinmarketcap.com/v1/ticker/");
    xhr.onload = function () {
        let json = JSON.parse(this.responseText);
        let mine = json.slice(0, 10);
        let i;
        for (i = 0; i < mine.length; i += 1) {
            currData = mine[i];
            if (Object.keys(mainData).length !== 10) {
                mainData[mine[i].name] = [parseInt(mine[i].price_usd)];
            } else {
                mainData[mine[i].name].push(parseInt(mine[i].price_usd));
            }
        }
    };
    xhr.send();
};

const futureUpdate = function (chart, mainData) {
    update();
  // updateMain(chart, mainData);
    setTimeout(futureUpdate, 5000);
};

export {updateMain, update, futureUpdate};