// migrating the appropriate contracts
var Verifier = artifacts.require("Verifier");
//var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var ERC721MintableComplete = artifacts.require("ERC721MintableComplete");

module.exports = function(deployer) {
  deployer.deploy(Verifier);
  //deployer.deploy(SolnSquareVerifier);
  deployer.deploy(ERC721MintableComplete);
};
