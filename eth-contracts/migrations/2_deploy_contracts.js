// migrating the appropriate contracts
var Verifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

const proof_2_4 = require("../../zokrates/code/square/proof_2_4.json");
const proof_3_9 = require("../../zokrates/code/square/proof_3_9.json");
const proof_4_16 = require("../../zokrates/code/square/proof_4_16.json");
const proof_5_25 = require("../../zokrates/code/square/proof_5_25.json");
const proof_6_36 = require("../../zokrates/code/square/proof_6_36.json");
const proof_7_49 = require("../../zokrates/code/square/proof_7_49.json");
const proof_8_64 = require("../../zokrates/code/square/proof_8_64.json");
const proof_9_81 = require("../../zokrates/code/square/proof_9_81.json");
const proof_10_100 = require("../../zokrates/code/square/proof_10_100.json");
const proof_11_121 = require("../../zokrates/code/square/proof_11_121.json");

let arrayProofs = [];
arrayProofs.push(proof_2_4);
arrayProofs.push(proof_3_9);
arrayProofs.push(proof_4_16);
arrayProofs.push(proof_5_25);
arrayProofs.push(proof_6_36);
arrayProofs.push(proof_7_49);
arrayProofs.push(proof_8_64);
arrayProofs.push(proof_9_81);
arrayProofs.push(proof_10_100);
arrayProofs.push(proof_11_121);

module.exports = function (deployer, network, accounts) {

    deployer.deploy(Verifier)
        .then(() => {
            return deployer.deploy(SolnSquareVerifier, Verifier.address).then(async () => {

                // Mint 10 tokens
                let SolnSquareVerifierContract = await SolnSquareVerifier.deployed();

                let account_one = "";

                if (network == "development") {
                    account_one = accounts[0];
                }
                else if (network == "rinkeby-fork" || network == "rinkeby") {
                    account_one = deployer.networks.rinkeby.from;
                }                

                for (let counter = 0; counter <= 9; counter++) {
                                                            
                    let tokenId = counter + 1;
                    let to = account_one;
                    let from = account_one;

                    await SolnSquareVerifierContract.mintToken(                
                        to,
                        tokenId,
                        arrayProofs[counter].proof.A, 
                        arrayProofs[counter].proof.A_p, 
                        arrayProofs[counter].proof.B, 
                        arrayProofs[counter].proof.B_p, 
                        arrayProofs[counter].proof.C, 
                        arrayProofs[counter].proof.C_p, 
                        arrayProofs[counter].proof.H, 
                        arrayProofs[counter].proof.K, 
                        arrayProofs[counter].input,
                        {from: from}
                    );
                }

                let totalSupply = await SolnSquareVerifierContract.totalSupply.call();
                console.log("totalSupply=" + totalSupply);
            });
        })
}