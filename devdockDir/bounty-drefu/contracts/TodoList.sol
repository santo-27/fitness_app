// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TodoList {
    struct Task {
        uint256 id;
        string content;
        bool completed;
        uint256 createdAt;
    }

    mapping(address => Task[]) private userTasks;
    mapping(address => uint256) private taskCount;

    event TaskCreated(address indexed user, uint256 id, string content);
    event TaskCompleted(address indexed user, uint256 id);
    event TaskDeleted(address indexed user, uint256 id);

    function createTask(string memory _content) external {
        uint256 taskId = taskCount[msg.sender];
        userTasks[msg.sender].push(Task(taskId, _content, false, block.timestamp));
        taskCount[msg.sender]++;
        emit TaskCreated(msg.sender, taskId, _content);
    }

    function toggleTask(uint256 _id) external {
        require(_id < userTasks[msg.sender].length, 'Task does not exist');
        userTasks[msg.sender][_id].completed = !userTasks[msg.sender][_id].completed;
        emit TaskCompleted(msg.sender, _id);
    }

    function deleteTask(uint256 _id) external {
        require(_id < userTasks[msg.sender].length, 'Task does not exist');
        userTasks[msg.sender][_id] = userTasks[msg.sender][userTasks[msg.sender].length - 1];
        userTasks[msg.sender].pop();
        emit TaskDeleted(msg.sender, _id);
    }

    function getTasks() external view returns (Task[] memory) {
        return userTasks[msg.sender];
    }
}