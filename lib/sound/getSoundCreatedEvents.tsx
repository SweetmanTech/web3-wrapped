import { parseAbiItem } from 'viem';
import { optimismPublicClient } from '../publicClient';
import { SOUND_FACTORY } from '../consts';

const getSoundCreatedEvents = async (args: any, fromBlock: any, toBlock: any) => {
  const logs = await optimismPublicClient.getLogs({
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
