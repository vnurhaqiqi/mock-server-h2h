const express = require('express');
const readJson = require('./helper/json');
const webhook = require('./helper/webhook');
const app = express();


app.get("/h2h/transaction/:supplierCode/:productCategory", (req, res, next) => {
    const supplierCode = req.params.supplierCode;
    const productCategory = req.params.productCategory;
    const dest = req.query.dest;
    const path = `collection/${supplierCode}.json`;

    readJson(path, (err, jsonData) => {
        if (err) {
            console.error('Failed to read or parse JSON file:', err);
            return res.status(500).send("internal server error");
        }

        const url = jsonData["webhook"]["url"]
        const webhookObj = jsonData["webhook"]["transaction"][productCategory][dest]
        const params = {
            t: webhookObj["t"],
            refId: webhookObj["refId"],
            status: webhookObj["status"],
            price: webhookObj["price"],
            message: webhookObj["message"]
        }

        // send webhook to client async, delay 1s
        webhook(url, params)

        const response = jsonData["transaction"][productCategory][dest]["message"]
        return res.send(response);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});