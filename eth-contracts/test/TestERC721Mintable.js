//import { AssertionError } from "assert";

var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');
const truffleAssert = require('truffle-assertions');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const numTokensToMint = 10;

    describe('match erc721 spec', function () {

        beforeEach(async function () { 

            this.contract = await ERC721MintableComplete.new({from: account_one});
    
            // TODO: mint multiple tokens
            
            // mint half of the tokens for account 2
            for (let counter = 1; counter < (numTokensToMint / 2) + 1; counter ++) {
                await this.contract.mint(account_two, counter, {from: account_one});
            }                        

            // mint other half of the tokens for account 3
            for (let counter = (numTokensToMint / 2) + 1; counter <= numTokensToMint; counter ++) {
                await this.contract.mint(account_three, counter, {from: account_one});
            } 
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call();
            assert.equal(totalSupply, numTokensToMint, "TotalSupply doesn't match!");
        })

        it('should get token balance', async function () { 
            let balance2 = await this.contract.balanceOf.call(account_two);
            let balance3 = await this.contract.balanceOf.call(account_three);

            assert.equal(balance2, numTokensToMint / 2, "Balance for account 2 doesn't match!");
            assert.equal(balance3, numTokensToMint / 2, "Balance for account 3 doesn't match!");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 

            const baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

            let tokenURI = await this.contract.tokenURI.call(1);
            assert.equal(tokenURI, baseTokenURI + "1", "tokenURI for token 1 doesn't match!");

            tokenURI = await this.contract.tokenURI.call(2);
            assert.equal(tokenURI, baseTokenURI + "2", "tokenURI for token 2 doesn't match!");
        })

        it('should transfer token from one owner to another', async function () { 
            
            await this.contract.transferFrom(account_two, account_three, 1, {from: account_two});

            let balance2 = await this.contract.balanceOf.call(account_two);
            let balance3 = await this.contract.balanceOf.call(account_three);

            assert.equal(balance2, (numTokensToMint / 2) - 1, "Balance for account 2 doesn't match!");
            assert.equal(balance3, (numTokensToMint / 2) + 1, "Balance for account 3 doesn't match!");
        })
    });

    describe('have ownership properties', function () {

        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
            await truffleAssert.reverts(
                this.contract.mint(account_three, 1, {from: account_two}), 
                "revert " + "The sender is not the owner of the contract!"
            );
        })

        it('should return contract owner', async function () { 

            let contractOwner = await this.contract.getOwner.call();
            assert.equal(account_one, contractOwner, "The contract owner doesn't match!");
        })

    });
})