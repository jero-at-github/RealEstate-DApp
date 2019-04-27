pragma solidity ^0.5.0;

import "./ERC721Mintable.sol";
import "./Verifier.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete {
    
    // TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
    Verifier SquareVerifier;

    constructor(address verifierContractAddress) public  {                

        SquareVerifier = Verifier(verifierContractAddress);  // instance the verifier contract                     
    }

    // TODO define a solutions struct that can hold an index & an address
    struct solutions  {
        uint256 index;
        address sender;
    }
    
    // TODO define an array of the above struct
    solutions[] arraySolutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => bool) submittedSolutions;    

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(bytes32 key, uint256 index, address add);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(bytes32 key, uint256 tokenId, address sender) public {
                
        arraySolutions.push(
            solutions({
                index: tokenId,
                sender: sender
            })
        );

        submittedSolutions[key] = true;

        emit SolutionAdded(key, tokenId, sender);
    }
    
    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly            
    function mint(
            address to, 
            uint256 tokenId,
            uint[2] memory a,
            uint[2] memory a_p,
            uint[2][2] memory b,
            uint[2] memory b_p,
            uint[2] memory c,
            uint[2] memory c_p,
            uint[2] memory h,
            uint[2] memory k,
            uint[2] memory input
        ) 
        public returns(bool) {

        // generate the key
        bytes32 key = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));

        require(submittedSolutions[key] == false, "This solution was already used!");

        // check if the proof is valid
        bool isValidProof = SquareVerifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input);           

        require(isValidProof == true, "The provided proof is not valid!");

        bool result;
                
        // store the solution
        addSolution(key, tokenId, msg.sender);

        // mint the token
        result = mint(to, tokenId);                      

        return result;
    }
}


  


























