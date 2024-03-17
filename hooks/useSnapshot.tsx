import { useEffect, useState } from 'react';
import useCollectorId from './useCollectorId';
import getErc721TransferEvents from '@/lib/getErc721TransferEvents';
import formatErc721Events from '@/lib/formatErc721Events';
import get30DayBlockRange from '@/lib/get30DayBlockRange';
import getSoundBatchCollectionMetadata from '@/lib/sound/getSoundBatchCollectionMetadata';
import formatSoundCreatedEvents from '@/lib/sound/formatSoundCreatedEvents';
import getSoundCreatedEvents from '@/lib/sound/getSoundCreatedEvents';
import { zeroAddress } from 'viem';
import getSoundSnapshot from '@/lib/sound/getSoundSnapshot';

const useSnapshot = (collectorId: string) => {
  const [snapshot, setSnapshot] = useState([] as any);
  const collector = useCollectorId(collectorId);
  const { collectorAddress } = collector;

  useEffect(() => {
    const fetchSnapshot = async () => {
      const response = getSoundSnapshot(collectorAddress);

      setSnapshot(response);
    };

    if (!collectorAddress) return;
    fetchSnapshot();
  }, [collectorAddress]);

  return { snapshot, ...collector };
};

export default useSnapshot;
