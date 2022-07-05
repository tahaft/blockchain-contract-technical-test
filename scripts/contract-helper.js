const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// For Hardhat 
const contract = require("../artifacts/contracts/DigitalWave.sol/DigitalWave.json");

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

async function getContract(contractAddress) {
    const digitalWaveContract = new ethers.Contract(contractAddress, contract.abi, signer);
    const message = await digitalWaveContract.message();
    const creator = await digitalWaveContract.creator();
    const returnedContract = {'address': digitalWaveContract.address, 'message': message, 'creator': creator};
    return returnedContract;
}

async function updateContract(contractAddress, newMessage) {
    const digitalWaveContract = new ethers.Contract(contractAddress, contract.abi, signer);
    const tx = await digitalWaveContract.update(newMessage)
    await tx.wait()

    const message = await digitalWaveContract.message();
    const creator = await digitalWaveContract.creator();
    const returnedContract = {'address': digitalWaveContract.address, 'message': message, 'creator': creator};
    return returnedContract;
}

async function createContract(initMessage, initCreator) {
    const DigitalWave = await ethers.getContractFactory("DigitalWave");
    return await DigitalWave.deploy(initMessage, initCreator);
}

module.exports = { createContract, updateContract, getContract };