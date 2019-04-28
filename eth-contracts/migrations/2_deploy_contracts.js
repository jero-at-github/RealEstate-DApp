// migrating the appropriate contracts
var Verifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
var ERC721MintableComplete = artifacts.require("ERC721MintableComplete");

module.exports = function (deployer) {
 
  deployer.deploy(Verifier)
    .then(() => {
      return deployer.deploy(SolnSquareVerifier, Verifier.address)
    })
}