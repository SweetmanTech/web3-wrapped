import { getPublicClient } from './clients';

const get30DayBlockRange = async (chainId: number) => {
  const client = getPublicClient(chainId);
  const block = await client.getBlock({
    blockTag: 'latest',
  });
  const toBlock = block.number;
  const blocksPerMonth = 1296000n;
  const fromBlock = toBlock - blocksPerMonth;
  return { fromBlock, toBlock };
};

export default get30DayBlockRange;
