// Test if a new solution can be added for contract - SolnSquareVerifier
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const truffleAssert = require('truffle-assertions');

const proof_2_4 = require("../../zokrates/code/square/proof_2_4.json");
const proof_3_9 = require("../../zokrates/code/square/proof_3_9.json");
const proof_4_16 = require("../../zokrates/code/square/proof_4_16.json");
const proof_5_25 = require("../../zokrates/code/square/proof_5_25.json");
const proof_6_36 = require("../../zokrates/code/square/proof_6_36.json");

contract('SolnSquareVerifier', accounts => {
    
    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    describe('SolnSquareVerifier test', function () {        

        it('Test verification with correct proof', async function () { 
     
            let instance = await SolnSquareVerifier.deployed();               
           
            let proof = proof_2_4;

            let result = await instance.verifyTx.send(
                0,
                account_two,
                proof.proof.A, 
                proof.proof.A_p, 
                proof.proof.B, 
                proof.proof.B_p, 
                proof.proof.C, 
                proof.proof.C_p, 
                proof.proof.H, 
                proof.proof.K, 
                proof.input,
                {from: account_one}
            );           
            
            assert.equal(result, true, "verifyTx failed!");
        })        
    });
    
})