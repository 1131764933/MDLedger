import { Contract } from 'ethers';
import { connectWallet } from './connectWallet';
import MDLedgerABI from './MDLedgerABI.json'; // 将合约ABI保存到此文件

const contractAddress = "0x3275ba86b5B93EE59E9674909cB37b23833EA24E";

export async function recordMerit(merits, description) {
  const signer = await connectWallet();
  const contract = new Contract(contractAddress, MDLedgerABI, signer);
  await contract.recordMerit(merits, description);
}

export async function recordDemerit(demerits, description) {
  const signer = await connectWallet();
  const contract = new Contract(contractAddress, MDLedgerABI, signer);
  await contract.recordDemerit(demerits, description);
}

export async function resetDailyRecord() {
  const signer = await connectWallet();
  const contract = new Contract(contractAddress, MDLedgerABI, signer);
  await contract.resetDailyRecord();
}

export async function getDailyRecord(userAddress) {
  const signer = await connectWallet();
  const contract = new Contract(contractAddress, MDLedgerABI, signer);
  return await contract.getDailyRecord(userAddress);
}

export async function getSummary(userAddress) {
  const signer = await connectWallet();
  const contract = new Contract(contractAddress, MDLedgerABI, signer);
  return await contract.getSummary(userAddress);
}

export async function getTotalMerits(userAddress) {
  const signer = await connectWallet();
  const contract = new Contract(contractAddress, MDLedgerABI, signer);
  return await contract.getTotalMerits(userAddress);
}

export async function getTotalDemerits(userAddress) {
  const signer = await connectWallet();
  const contract = new Contract(contractAddress, MDLedgerABI, signer);
  return await contract.getTotalDemerits(userAddress);
}