// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.0;

import {TokenRouter} from "./libs/TokenRouter.sol";

import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

/**
 * @title Hyperlane ERC20 Token Router that extends ERC20 with remote transfer functionality.
 * @author Abacus Works
 * @dev Supply on each chain is not constant but the aggregate supply across all chains is.
 */
contract HypERC20 is ERC20Upgradeable, TokenRouter {
    uint8 private immutable _decimals;

    // Precompile addresses for custom fork of geth.
    // See https://github.com/primevprotocol/go-ethereum/pull/3
    address constant MINT = address(0x89);
    address constant BURN = address(0x90);

    constructor(uint8 __decimals, address _mailbox) TokenRouter(_mailbox) {
        _decimals = __decimals;
    }

    /**
     * @notice Initializes the Hyperlane router, ERC20 metadata, and mints initial supply to deployer.
     * @param _totalSupply The initial supply of the token.
     * @param _name The name of the token.
     * @param _symbol The symbol of the token.
     */
    function initialize(
        uint256 _totalSupply,
        string memory _name,
        string memory _symbol
    ) external initializer {
        // Initialize ERC20 metadata
        __ERC20_init(_name, _symbol);
        _mint(msg.sender, _totalSupply);
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function balanceOf(
        address _account
    )
        public
        view
        virtual
        override(TokenRouter, ERC20Upgradeable)
        returns (uint256)
    {
        return ERC20Upgradeable.balanceOf(_account);
    }

    /**
     * @dev Burns `_amount` of token from `msg.sender` balance.
     * @inheritdoc TokenRouter
     */
    function _transferFromSender(
        uint256 _amount
    ) internal override returns (bytes memory) {
        // Burn both ERC20 and native tokens
        _burn(msg.sender, _amount);
        bool success;
        // TODO: will need to deliniate between msg.sender and burn account with intermediary contract idea
        (success, ) = BURN.call{value: 0, gas: gasleft()}(
            abi.encode(msg.sender, msg.sender, _amount)
        );
        require(success, "Native burn failed");
        return bytes(""); // no metadata
    }

    /**
     * @dev Mints `_amount` of token to `_recipient` balance.
     * @inheritdoc TokenRouter
     */
    function _transferTo(
        address _recipient,
        uint256 _amount,
        bytes calldata // no metadata
    ) internal virtual override {
        // Mint both ERC20 and native tokens
        _mint(_recipient, _amount);
        bool success;
        (success, ) = MINT.call{value: 0, gas: gasleft()}(
            abi.encode(msg.sender, _recipient, _amount)
        );
        require(success, "Native mint failed");
    }
}
