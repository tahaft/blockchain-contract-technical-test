const axios = require('axios');
const express = require('express');
const { Worker } = require("worker_threads");

const contractHelper = require('./contract-helper')

const app = express();
app.use(express.json());

const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

app.get('/contract/:contractAddress', function (req, res) {
    //url should contain the contract address so that we send it back to the user
    const address = req.params.contractAddress;
    contractHelper.getContract(address).then((contract) => {
        res.json(contract);
    })
});

app.put('/contract/:contractAddress', function (req, res) {
    //url should contain the contract address and body should contain new message
    //create a new thread to handle the process of updating the contract data, otherwise it will take sometime and lock the user
    //call the external API to get the fact about cats! 
    res.json(
        axios
            .get('https://catfact.ninja/fact')
            .then(catfactResponse => {
                console.log(catfactResponse.data);
                const message = req.body.message;
                const address = req.params.contractAddress;
                contractHelper.updateContract(address, message, catfactResponse.data.fact).then((contract) => {
                    console.log(contract);
                });
            })
            .catch(error => {
                console.error(error);
            })
    );
});

app.post('/contract', function (req, res) {
    //body here contains the init message and init creator ex: {'message': 'hey', 'creator': 'digital wave'}
    //call the external API to get the fact about cats! 
    axios
        .get('https://catfact.ninja/fact')
        .then(catfactResponse => {
            console.log(catfactResponse.data);
            contractHelper.createContract(req.body.message, req.body.creator, catfactResponse.data.fact).then((contract) => {
                res.json(contract);
            });
        })
        .catch(error => {
            console.error(error);
        });
});