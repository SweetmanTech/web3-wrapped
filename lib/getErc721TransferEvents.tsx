import { parseAbiItem } from 'viem';
import { optimismPublicClient } from './publicClient';

const getErc721TransferEvents = async ({ args, fromBlock, toBlock, address }: any) => {
  const logConfig = {
    event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'),
    fromBlock,
    toBlock,
  } as any;

  if (address) {
    logConfig.address = address;
  }
  if (args) {
    logConfig.args = args;
  }

  const logs = await optimismPublicClient.getLogs(logConfig);

  const filteredErc721Logs = logs.filter((log: any) => log.args && log.args.length === 2);
  return filteredErc721Logs;
};

export default getErc721TransferEvents;
