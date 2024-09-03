// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MDLedger {
    struct Record {
        string description;
        uint256 merits;
        int256 demerits;
        uint256 timestamp;
    }

    struct Summary {
        uint256 totalMerits;
        int256 totalDemerits;
    }

    mapping(address => Record) public dailyRecords;
    mapping(address => Summary) public summaries;

    event RecordUpdated(address indexed user, uint256 merits, int256 demerits, string description);
    event DailyRecordReset(address indexed user, uint256 totalMerits, int256 totalDemerits);

    function recordMerit(uint256 _merits, string memory _description) public {
        // 立即将功德加到总计中
        summaries[msg.sender].totalMerits += _merits;

        dailyRecords[msg.sender].merits += _merits;
        dailyRecords[msg.sender].description = _description;
        dailyRecords[msg.sender].timestamp = block.timestamp;

        emit RecordUpdated(msg.sender, dailyRecords[msg.sender].merits, dailyRecords[msg.sender].demerits, _description);
    }

    function recordDemerit(int256 _demerits, string memory _description) public {
        // 立即将过失加到总计中
        summaries[msg.sender].totalDemerits += _demerits;

        dailyRecords[msg.sender].demerits += _demerits;
        dailyRecords[msg.sender].description = _description;
        dailyRecords[msg.sender].timestamp = block.timestamp;

        emit RecordUpdated(msg.sender, dailyRecords[msg.sender].merits, dailyRecords[msg.sender].demerits, _description);
    }

    function resetDailyRecord() public {
        emit DailyRecordReset(msg.sender, summaries[msg.sender].totalMerits, summaries[msg.sender].totalDemerits);

        dailyRecords[msg.sender].merits = 0;
        dailyRecords[msg.sender].demerits = 0;
    }

    function getDailyRecord(address _user) public view returns (Record memory) {
        return dailyRecords[_user];
    }

    function getSummary(address _user) public view returns (Summary memory) {
        return summaries[_user];
    }

    // 获取总功德的方法
    function getTotalMerits(address _user) public view returns (uint256) {
        return summaries[_user].totalMerits;
    }

    // 获取总过失的方法
    function getTotalDemerits(address _user) public view returns (int256) {
        return summaries[_user].totalDemerits;
    }
}
