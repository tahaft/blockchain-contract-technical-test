// Specifies the version of Solidity, using semantic versioning.
pragma solidity ^0.7;

import "@chainlink/contracts/src/v0.7/ChainlinkClient.sol";

contract DigitalWaveOracle is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    address private oracle;
    bytes32 private jobId;
    uint256 public response;
    uint256 private fee;

    constructor() {
        setPublicChainlinkToken();
        oracle = 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
        jobId = "fcf4140d696d44b687012232948bdd5d";
        fee = 0.1 * 10 ** 18; 
    }

    function facts() public {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        req.add("endpoint", "https://catfact.ninja/fact");
        req.add("path", "fact");
        sendChainlinkRequestTo(oracle, req, fee);
    }
        
    //callback function
    function fulfill(bytes32 _requestId, uint256 _response) public recordChainlinkFulfillment(_requestId)
    {
        response = _response;
    }
}