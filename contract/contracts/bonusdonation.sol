pragma solidity ^0.4.25;

contract Hack3Bonus {
    event LogBonus(
        address receiver, address royalty, uint value, string message
    );
    uint bonusdonate;

    function bonusDonation(address _receiver, string _message) public payable {
        uint bonusdonate=msg.value / 100;
        _receiver.transfer(bonusdonate);
        emit LogBonus(
            _receiver,
            msg.sender,
            bonusdonate,
            _message
        );
    }
}