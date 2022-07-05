var contractHelper = require('./contract-helper')
var express = require('express');
var app = express();
app.use(express.json());

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })

 app.get('/contract/:contractAddress', function (req, res) {
    //url should contain the contract address so that we send it back to the user
    const address = req.params.contractAddress
    contractHelper.getContract(address).then((contract) => {
        res.json(contract);
    })
})

app.put('/contract/:contractAddress', function (req, res) {
    //url should contain the contract address and body should contain new message
    const message = req.body.message;
    const address = req.params.contractAddress
    contractHelper.updateContract(address, message).then((contract) => {
        res.json(contract);
    })
})

app.post('/contract', function(req, res) {
    //body here contains the init message and init creator ex: {'message': 'hey', 'creator': 'digital wave'}
    contractHelper.createContract(req.body.message, req.body.creator).then((contract) => {
        res.json(contract)
    });
})