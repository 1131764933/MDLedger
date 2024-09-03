// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MDLBehaviorNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    struct Behavior {
        bool isPositive;
        string description;
        uint256 timestamp;
    }

    mapping(uint256 => Behavior) public behaviors;

    event BehaviorNFTMinted(uint256 indexed tokenId, address indexed recipient, bool isPositive, string description);

    constructor() ERC721("MDLBehaviorNFT", "MDLBNFT")Ownable(msg.sender) {
        // 合约所有者已在 Ownable 合约中初始化
    }

    function mintBehaviorNFT(
        address recipient,
        bool isPositive,
        string memory description,
        string memory uri
    ) public onlyOwner returns (uint256) {
        _tokenIds += 1;
        uint256 newTokenId = _tokenIds;

        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, uri);

        behaviors[newTokenId] = Behavior(isPositive, description, block.timestamp);

        emit BehaviorNFTMinted(newTokenId, recipient, isPositive, description);

        return newTokenId;
    }

    function getBehavior(uint256 tokenId) public view returns (Behavior memory) {
        Behavior memory behavior = behaviors[tokenId];
        require(behavior.timestamp != 0, "MDLBehaviorNFT: Behavior query for nonexistent token");
        return behavior;
    }
}
