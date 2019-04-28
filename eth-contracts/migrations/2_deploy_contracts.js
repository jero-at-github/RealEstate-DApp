// migrating the appropriate contracts
var Verifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
var ERC721MintableComplete = artifacts.require("ERC721MintableComplete");

module.exports = function(deployer, network) {
    
    // ERC721MintableComplete
    deployer.deploy(ERC721MintableComplete).then(function() {
     
        // Verifier       
        deployer.deploy(Verifier).then(async function(contractVerifier) {        
            //let contractVerifier = await Verifier.deployed();    
        
            // SolnSquareVerifier
            deployer.deploy(SolnSquareVerifier, contractVerifier.address);      
        });

    });    

};
