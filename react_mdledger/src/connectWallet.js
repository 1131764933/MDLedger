import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

const providerOptions = {};

const web3Modal = new Web3Modal({
  cacheProvider: false,
  providerOptions, 
});

export async function connectWallet() {
  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  const signer = provider.getSigner();
  return signer;
}