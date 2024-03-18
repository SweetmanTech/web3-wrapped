import { useEffect, useState } from 'react';
import useCollectorId from './useCollectorId';
import getSoundSnapshot from '@/lib/sound/getSoundSnapshot';
import { base, optimism } from 'viem/chains';

const useSnapshot = (collectorId: string) => {
  const [snapshot, setSnapshot] = useState([] as any);
  const collector = useCollectorId(collectorId);
  const { collectorAddress } = collector;

  useEffect(() => {
    const fetchSnapshot = async () => {
      const response = await getSoundSnapshot(collectorAddress, optimism.id);
      const baseResponse = await getSoundSnapshot(collectorAddress, base.id);
      console.log('SWEETS baseResponse', baseResponse);
      setSnapshot(response);
    };

    if (!collectorAddress) return;
    fetchSnapshot();
  }, [collectorAddress]);

  return { snapshot, ...collector };
};

export default useSnapshot;
