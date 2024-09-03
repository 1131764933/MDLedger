import React, { useState, useEffect, useCallback } from 'react';
import { recordMerit, recordDemerit, getTotalMerits, getTotalDemerits } from './interact';
import './App.css';

function App() {
  const [merits, setMerits] = useState(0);
  const [demerits, setDemerits] = useState(0);
  const [description, setDescription] = useState("");
  const [totalMerits, setTotalMerits] = useState(0);
  const [totalDemerits, setTotalDemerits] = useState(0);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState("");
  const [type, setType] = useState("功德");

  // 获取用户地址
  useEffect(() => {
    async function fetchUser() {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUser(accounts[0]);
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    }
    fetchUser();
  }, []);

  // 统一的提交处理函数
  const handleSubmit = async () => {
    try {
      if (!user) {
        alert('Please sign in to MetaMask to continue.');
        return;
      }
      
      if (type === "功德") {
        await recordMerit(merits, description);
        console.log('Merit recorded successfully');
      } else {
        await recordDemerit(demerits, description);
        console.log('Demerit recorded successfully');
      }

      await calculateTotals();
    } catch (error) {
      console.error('Error recording merit/demerit:', error.message);
    }
  };

  const calculateTotals = useCallback(async () => {
    try {
      const totalMerits = await getTotalMerits(user);
      const totalDemerits = await getTotalDemerits(user);
  
      // 确保 totalDemerits 为负数
      const negativeTotalDemerits = -Math.abs(parseInt(totalDemerits));
  
      setTotalMerits(totalMerits.toString());
      setTotalDemerits(negativeTotalDemerits.toString()); // 保持负数显示
      
      // 计算总计：总功 + 总过（负数）
      const totalValue = parseInt(totalMerits) + negativeTotalDemerits;
      setTotal(totalValue);
    } catch (error) {
      console.error('Error calculating totals:', error.message);
    }
  }, [user]);
  
  

  useEffect(() => {
    if (user) {
      calculateTotals();
    }
  }, [user, calculateTotals]);

  return (
    <div className="container">
      <h1>web3——MDLedger（功过格细表）</h1>
      
      <table>
        <thead>
          <tr>
            <th>user</th>
            <th>日期</th>
            <th>功过类型 (功/过)</th>
            <th>描述</th>
            <th>得分</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" placeholder="用户名" value={user} readOnly /></td>
            <td><input type="date" /></td>
            <td>
              <select onChange={e => {
                setType(e.target.value);
                if (e.target.value === "功德") {
                  setDemerits(0);
                } else {
                  setMerits(0);
                }
              }}>
                <option value="功德">功德</option>
                <option value="过失">过失</option>
              </select>
            </td>
            <td><textarea placeholder="描述" onChange={e => setDescription(e.target.value)} /></td>
            <td><input type="number" placeholder="得分" onChange={e => {
              let value = parseInt(e.target.value);
              if (type === "过失" && value > 0) {
                value = -value; // 如果是过失且输入的是正数，则自动转换为负数
              }
              if (type === "功德") {
                setMerits(value);
              } else {
                setDemerits(value);
              }
            }} /></td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSubmit}>提交</button>

      <h1>web3——MDLedger（功过格总表）</h1>
      
      <table>
        <thead>
          <tr>
            <th>user</th>
            <th>总功</th>
            <th>总过</th>
            <th>总计</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" placeholder="用户名" value={user} readOnly /></td>
            <td>{totalMerits}</td>
            <td>{totalDemerits}</td>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={calculateTotals}>查询</button>
    </div>
  );
}

export default App;
