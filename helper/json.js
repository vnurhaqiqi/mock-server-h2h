const fs = require('fs');


function readJsonFile(filepath, callback) {
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.log("error read the file", err);
            callback(err);
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            callback(null, jsonData);
        } catch (parseErr) {
            console.error("error parsing JSON:", parseErr);
        }
    });
}

module.exports = readJsonFile;