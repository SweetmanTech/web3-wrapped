import { parseAbiItem } from 'viem';
import { SOUND_FACTORY } from '../consts';
import { getPublicClient } from '../clients';

const getSoundCreatedEvents = async (args: any, fromBlock: any, toBlock: any, chainId: number) => {
  const client = getPublicClient(chainId);
  const logs = await client.getLogs({
    address: SOUND_FACTORY,
    event: parseAbiItem(
      'event Created(address indexed,address indexed,address indexed,bytes,address[],bytes[],bytes[])',
    ),
    args,
    fromBlock,
    toBlock,
  });
  return logs;
};

export default getSoundCreatedEvents;
