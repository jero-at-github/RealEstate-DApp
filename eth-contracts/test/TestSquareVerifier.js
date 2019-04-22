var Verifier = artifacts.require('Verifier');
const truffleAssert = require('truffle-assertions');
const proof = require("../../zokrates/code/square/proof.json");

contract('Verifier', accounts => {

    const account_one = accounts[0];    

    describe('Verifier test', function () {

        beforeEach(async function () { 
            //console.log(Verifier);
            //this.contract = await Verifier.new();          
            //this.contract = Verifier;                   
        })

        it.only('Test verification with correct proof', async function () { 
         
            let instance = await Verifier.deployed();

            console.log(proof.proof.a);
            console.log(proof.proof.b);
            console.log(proof.proof.c);
            console.log( proof.inputs);

            let result = await instance.verifyTx(proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
            console.log(result);
            

                /*
            Verifier.deployed().then(async function(instance) { 
                let result = await instance.verifyTx(proof.proof.a, proof.proof.b, proof.proof.c, proof.input);
                console.log(result);
                return result;
            });
            */

            /*
            this.contract.events.Verified({
                fromBlock: 0
            }, function (error, event) {
            
                assert.equal(err, null, err);
                console.log(result);           
            });
            
            await this.contract.verifyTx(proof.proof.a, proof.proof.b, proof.proof.c, proof.input);   
            */        
        })

        it('Test verification with incorrect proof', async function () { 
          
        })        
    });
    
})