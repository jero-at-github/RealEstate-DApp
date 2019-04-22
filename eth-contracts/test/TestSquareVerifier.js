var Verifier = artifacts.require('Verifier');
const truffleAssert = require('truffle-assertions');
const proof = require("../../zokrates/code/square/proof.json");

contract('Verifier', accounts => {
         
    describe('Verifier test', function () {        

        it.only('Test verification with correct proof', async function () { 
     
            let instance = await Verifier.deployed();               
           
            let result = await instance.verifyTx.call(
                proof.proof.A, 
                proof.proof.A_p, 
                proof.proof.B, 
                proof.proof.B_p, 
                proof.proof.C, 
                proof.proof.C_p, 
                proof.proof.H, 
                proof.proof.K, 
                proof.input
            );           
            
            assert.equal(result, true, "verifyTx failed!");
        })

        it('Test verification with incorrect proof', async function () { 
          
        })        
    });
    
})