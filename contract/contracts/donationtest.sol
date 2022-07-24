pragma solidity ^0.4.25;

contract Hack3Donation {
    event LogDonation(
        address receiver, address donator, string nickname, uint value, string message
    );

    function donation(address _receiver, string _nickname, string _message) public payable {
        _receiver.transfer(msg.value);
        emit LogDonation(
            _receiver,
            msg.sender,
            _nickname,
            msg.value,
            _message
        );
    }
}