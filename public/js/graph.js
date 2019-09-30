const mainGraph = function (chart, mainData) {
    console.log(mainData);
    chart = c3.generate({
        bindto: "#main",
        data: {
            columns: mainData
        }
    });
};

export {mainGraph};