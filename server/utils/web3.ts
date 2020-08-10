import Web3 from 'web3';
import { ethNodeProvider } from '../configs/constant';

const web3 = new Web3(new Web3.providers.HttpProvider(ethNodeProvider));

export default web3;
