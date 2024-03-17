import { useEffect, useState } from 'react';
import useCollectorId from './useCollectorId';
import getErc721TransferEvents from '@/lib/getErc721TransferEvents';
import formatErc721Events from '@/lib/formatErc721Events';
import get30DayBlockRange from '@/lib/get30DayBlockRange';
import getSoundBatchCollectionMetadata from '@/lib/sound/getSoundBatchCollectionMetadata';
import formatSoundCreatedEvents from '@/lib/sound/formatSoundCreatedEvents';
import getSoundCreatedEvents from '@/lib/sound/getSoundCreatedEvents';
import { zeroAddress } from 'viem';

const useSnapshot = (collectorId: string) => {
  const [snapshot, setSnapshot] = useState([] as any);
  const collector = useCollectorId(collectorId);
  const { collectorAddress } = collector;

  useEffect(() => {
    const fetchSnapshot = async () => {
      const { fromBlock, toBlock } = await get30DayBlockRange();
      const soundProtocolStartBlock = 109963104n;
      const soundLogs = await getSoundCreatedEvents(
        [null, null, collectorAddress],
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

      const filteredLogs = await getErc721TransferEvents({
        args: [null, collectorAddress],
        fromBlock,
        toBlock,
      });
      const eventResponse = formatErc721Events(filteredLogs);

      let soundResponse = await getSoundBatchCollectionMetadata(eventResponse);
      soundResponse = soundResponse.sort(
        (a: any, b: any) => b.numberOfEditions - a.numberOfEditions,
      );

      setSnapshot(soundResponse);
    };

    if (!collectorAddress) return;
    fetchSnapshot();
  }, [collectorAddress]);

  return { snapshot, ...collector };
};

export default useSnapshot;
