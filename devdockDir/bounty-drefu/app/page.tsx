'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import TodoList from '../artifacts/contracts/TodoList.sol/TodoList.json';

const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, TodoList.abi, signer);
  };

  const loadTasks = async () => {
    try {
      const contract = getContract();
      const tasks = await contract.getTasks();
      setTasks(tasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const contract = getContract();
      const tx = await contract.createTask(newTask);
      await tx.wait();
      setNewTask('');
      loadTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const contract = getContract();
      const tx = await contract.toggleTask(id);
      await tx.wait();
      loadTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const contract = getContract();
      const tx = await contract.deleteTask(id);
      await tx.wait();
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      loadTasks();
    }
  }, [isConnected]);

  return (
    <main className='min-h-screen p-8'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8'>Blockchain Todo List</h1>
        
        {!isConnected ? (
          <button
            onClick={() => connect()}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <form onSubmit={createTask} className='mb-8'>
              <input
                type='text'
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder='Enter new task'
                className='border p-2 mr-2 rounded'
              />
              <button
                type='submit'
                className='bg-green-500 text-white px-4 py-2 rounded'
              >
                Add Task
              </button>
            </form>

            <div className='space-y-4'>
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between border p-4 rounded'
                >
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className='mr-4'
                    />
                    <span className={task.completed ? 'line-through' : ''}>
                      {task.content}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className='bg-red-500 text-white px-2 py-1 rounded'
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}