// migrating the appropriate contracts
var Verifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
var ERC721MintableComplete = artifacts.require("ERC721MintableComplete");

module.exports = async function(deployer) {

    // ERC721MintableComplete
    deployer.deploy(ERC721MintableComplete);
    
    // Verifier
    deployer.deploy(Verifier);
    let contractVerifier = await Verifier.deployed();    

    // SolnSquareVerifier
    deployer.deploy(SolnSquareVerifier, contractVerifier.address);  
};
