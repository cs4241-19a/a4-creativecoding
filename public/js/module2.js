var ps4data = []



const fetchPS4Data = function () {
    return new Promise(
        function (resolve, reject) {
            fetch("/ps4data", {
                credentials: "include"
            })
                .then(response => response.json())
                .then(data => {
                    ps4data = data
                    resolve("done")
                })
                .catch(err => {
                    reject("error")
                    console.log(err);
                });
        }
    )
};

const getPS4Data = function () {
    return ps4data
}

export { fetchPS4Data, getPS4Data }