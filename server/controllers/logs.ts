import web3 from '../utils/web3';
import { removeLeftPadding, asyncWrapper } from '../utils/helpers';
import UserError from '../utils/userError';
import cache from '../utils/redis';
import { sessionExpireTime } from '../configs/constant';
import * as types from '../utils/typings';

const getContractEventLogOfAddress: types.routeCallBack = async (req, res) => {
  const { contractAddress, walletAddress } = req.params;

  const cached = await cache.get(`${contractAddress}${walletAddress}`);

  if (cached) {
    return res.json({ logs: cached });
  }

  const [transferSign, approvalSign] = [
    web3.utils.sha3('Transfer(address,address,uint256)'),
    web3.utils.sha3('Approval(address,address,uint256)'),
  ];

  try {
    const [transferFrom, transferTo, approvalFrom, approvalTo] = await Promise.all([
      web3.eth.getPastLogs({
        fromBlock: 0,
        toBlock: 'latest',
        address: [contractAddress],
        topics: [
          transferSign,
          `${web3.utils.padLeft('0x', 24)}${walletAddress.split('0x')[1]}`,
          null,
        ],
      }),
      web3.eth.getPastLogs({
        fromBlock: 0,
        toBlock: 'latest',
        address: [contractAddress],
        topics: [
          transferSign,
          null,
          `${web3.utils.padLeft('0x', 24)}${walletAddress.split('0x')[1]}`,
        ],
      }),
      web3.eth.getPastLogs({
        fromBlock: 0,
        toBlock: 'latest',
        address: [contractAddress],
        topics: [
          approvalSign,
          `${web3.utils.padLeft('0x', 24)}${walletAddress.split('0x')[1]}`,
          null,
        ],
      }),
      web3.eth.getPastLogs({
        fromBlock: 0,
        toBlock: 'latest',
        address: [contractAddress],
        topics: [
          approvalSign,
          null,
          `${web3.utils.padLeft('0x', 24)}${walletAddress.split('0x')[1]}`,
        ],
      }),
    ]);

    const logs = [...transferTo, ...transferFrom, ...approvalFrom, ...approvalTo];
    logs.sort((a, b) => a.logIndex - b.logIndex);

    const result = logs.map((log) => ({
      type: log.topics[0] === transferSign ? 'Transfer' : 'Approval',
      txHash: log.transactionHash,
      block: log.blockNumber,
      fromAddress: removeLeftPadding(log.topics[1]),
      toAddress: removeLeftPadding(log.topics[2]),
      valueOfToken: parseInt(log.data, 16),
    }));

    await cache.setex(`${contractAddress}${walletAddress}`, sessionExpireTime || 300, result);

    return res.json({ logs: result });
  } catch (error) {
    if (error.message.includes('Provided address') && error.message.includes('is invalid')) {
      throw new UserError('Invalid Address(es)', 400, undefined, error, {
        validationMessage: error.message.replace(/"/g, ''),
      });
    }

    throw error;
  }
};

export default {
  getContractEventLogOfAddress: asyncWrapper(getContractEventLogOfAddress),
};
