// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract MultipleSend {
    function sendETH(address payable[] memory _addresses, uint256[] memory _amounts) public payable {
        require(_addresses.length == _amounts.length, "Addresses and amounts length mismatch");
        
        for (uint256 i = 0; i < _addresses.length; i++) {
            require(address(this).balance >= _amounts[i], "Insufficient balance for transfer");
            _addresses[i].transfer(_amounts[i]);
        }
    }
}
