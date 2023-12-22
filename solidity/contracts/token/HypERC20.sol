// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.0;

import {TokenRouter} from "./libs/TokenRouter.sol";

import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

// See https://github.com/primevprotocol/contracts/blob/main/contracts/Whitelist.sol
interface IWhitelist {
    function mint(address _mintTo, uint256 _amount) external;
    function burn(address _burnFrom, uint256 _amount) external;
}

/**
 * @title Hyperlane ERC20 Token Router that extends ERC20 with remote transfer functionality.
 * @author Abacus Works
 * @dev Supply on each chain is not constant but the aggregate supply across all chains is.
 */
contract HypERC20 is ERC20Upgradeable, TokenRouter {
    uint8 private immutable _decimals;

    // TODO: Consider disabling contract until admin (who deploys whitelist) calls initialize

    // This address assumes deployer is 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    address private constant WHITELIST_ADDR =
        address(0x5D1415C0973034d162F5FEcF19B50dA057057e29);

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
     * @dev Burns `_amount` of native ether from `msg.sender` balance.
     * Note before this function is called, whitelist contract needs:
     * 1. to be deployed @ predetermined addr.
     * 2. to be updated by owner with this contract's address.
     * @inheritdoc TokenRouter
     */
    function _transferFromSender(
        uint256 _amount
    ) internal override returns (bytes memory) {
        IWhitelist(WHITELIST_ADDR).burn(msg.sender, _amount);
        return bytes(""); // no metadata
    }

    /**
     * @dev Mints `_amount` of native ether to `_recipient` balance.
     * Note before this function is called, whitelist contract needs:
     * 1. to be deployed @ predetermined addr.
     * 2. to be updated by owner with this contract's address.
     * @inheritdoc TokenRouter
     */
    function _transferTo(
        address _recipient,
        uint256 _amount,
        bytes calldata // no metadata
    ) internal virtual override {
        IWhitelist(WHITELIST_ADDR).mint(_recipient, _amount);
    }
}
