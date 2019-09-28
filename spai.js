const fetch = require("node-fetch");

module.exports = {
    sendInfo: function(data) {
        fetch('https://spai.jcharante.com', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => console.log(response)).catch((err) => {
            if (err.code !== 'ENOTFOUND') {
                // Spai service is not online yet, so do not log errors about it not being found yet.
                console.error(err)
            }
        })
    }
}
