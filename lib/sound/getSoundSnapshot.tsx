import { zeroAddress } from 'viem';
import get30DayBlockRange from '../get30DayBlockRange';
import getSoundCreatedEvents from './getSoundCreatedEvents';
import formatSoundCreatedEvents from './formatSoundCreatedEvents';
import getErc721TransferEvents from '../getErc721TransferEvents';
import formatErc721Events from '../formatErc721Events';
import getSoundBatchCollectionMetadata from './getSoundBatchCollectionMetadata';

const getSoundSnapshot = async (creatorAddress: string) => {
  const { fromBlock, toBlock } = await get30DayBlockRange();
  const soundProtocolStartBlock = 109963104n;
  const soundLogs = await getSoundCreatedEvents(
    [null, null, creatorAddress],
    soundProtocolStartBlock,
    toBlock,
  );

  const soundDrops = formatSoundCreatedEvents(soundLogs);

  const soundFilteredLogs = await Promise.all(
    soundDrops.map(async (soundDrop: string) => {
      const logs = await getErc721TransferEvents({
        address: soundDrop,
        args: [zeroAddress, null],
        fromBlock,
        toBlock,
      });
      return logs;
    }),
  );

  const soundFlattened = soundFilteredLogs.flat();

  const soundFormatted = formatErc721Events(soundFlattened);

  let soundResponse = await getSoundBatchCollectionMetadata(soundFormatted);

  soundResponse = soundResponse.sort((a: any, b: any) => b.numberOfEditions - a.numberOfEditions);
  return soundResponse;
};

export default getSoundSnapshot;
