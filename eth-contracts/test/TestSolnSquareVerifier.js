// Test if a new solution can be added for contract - SolnSquareVerifier
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');

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
        
        before(async function () { 

            let verifier = await Verifier.new();
            this.contract = await SolnSquareVerifier.new(verifier.address, {from: account_one});                           
        });

        // Mint with correct proof
        it('Mint with correct proof', async function () {                             
                               
            let proof = proof_2_4;
            let tokenId = 1;
            let to = account_two;
            let from = account_one;

            //await mint(this.contract, proof, account_two, tokenId, account_one);
            await this.contract.mintToken(                
                to,
                tokenId,
                proof.proof.A, 
                proof.proof.A_p, 
                proof.proof.B, 
                proof.proof.B_p, 
                proof.proof.C, 
                proof.proof.C_p, 
                proof.proof.H, 
                proof.proof.K, 
                proof.input,
                {from: from}
            )
            
            let totalSupply = await this.contract.totalSupply.call();
            assert.equal(totalSupply, 1, "TotalSupply doesn't match!");
        });  
        
        // Mint with the same proof
        it('Mint with same token', async function () {                             
                                           
            let proof = proof_3_9;
            let tokenId = 1;
            let to = account_two;
            let from = account_one;
            
            //let test = await this.contract.submittedSolutions.call();
            //console.log(test);

            await truffleAssert.reverts(
                this.contract.mintToken(                
                    to,
                    tokenId,
                    proof.proof.A, 
                    proof.proof.A_p, 
                    proof.proof.B, 
                    proof.proof.B_p, 
                    proof.proof.C, 
                    proof.proof.C_p, 
                    proof.proof.H, 
                    proof.proof.K, 
                    proof.input,
                    {from: from}
                ), 
                "revert " + "The tokenId already exists! -- Reason given: The tokenId already exists!."
            );                        
        });       

        // Mint with the same proof
        it('Mint with same proof', async function () {                             
                                           
            let proof = proof_2_4;
            let tokenId = 2;
            let to = account_two;
            let from = account_one;
            
            //let test = await this.contract.submittedSolutions.call();
            //console.log(test);

            await truffleAssert.reverts(
                this.contract.mintToken(                
                    to,
                    tokenId,
                    proof.proof.A, 
                    proof.proof.A_p, 
                    proof.proof.B, 
                    proof.proof.B_p, 
                    proof.proof.C, 
                    proof.proof.C_p, 
                    proof.proof.H, 
                    proof.proof.K, 
                    proof.input,
                    {from: from}
                ), 
                "revert " + "This solution was already used! -- Reason given: This solution was already used!."
            );                        
        });       

        // Mint with correct proof
        it('Mint with a second correct proof', async function () {                             
                               
            let proof = proof_3_9;
            let tokenId = 2;
            let to = account_two;
            let from = account_one;

            //await mint(this.contract, proof, account_two, tokenId, account_one);
            await this.contract.mintToken(                
                to,
                tokenId,
                proof.proof.A, 
                proof.proof.A_p, 
                proof.proof.B, 
                proof.proof.B_p, 
                proof.proof.C, 
                proof.proof.C_p, 
                proof.proof.H, 
                proof.proof.K, 
                proof.input,
                {from: from}
            )
            
            let totalSupply = await this.contract.totalSupply.call();
            assert.equal(totalSupply, 2, "TotalSupply doesn't match!");
        });       


        // Mint with incorrect proof
        it('Mint with incorrect proof', async function () {                             
                               
            let proof = proof_4_16;
            proof.input = ["0x5", "0x1"];
            let tokenId = 2;
            let to = account_two;
            let from = account_one;

            //await mint(this.contract, proof, account_two, tokenId, account_one);

            await truffleAssert.reverts(
                this.contract.mintToken(                
                    to,
                    tokenId,
                    proof.proof.A, 
                    proof.proof.A_p, 
                    proof.proof.B, 
                    proof.proof.B_p, 
                    proof.proof.C, 
                    proof.proof.C_p, 
                    proof.proof.H, 
                    proof.proof.K, 
                    proof.input,
                    {from: from}
                ), 
                "revert " + "The provided proof is not valid! -- Reason given: The provided proof is not valid!."
            );                        
        });       

    });
    
})