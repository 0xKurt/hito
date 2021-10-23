pragma solidity 0.8.2;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract VAME is ERC721 {
    constructor(string memory name, string memory symbol, uint256 toMint) ERC721(name, symbol) {
        for(uint256 i = 1; i <= toMint; i++) {
            _safeMint(msg.sender, i);
        }
    }
}