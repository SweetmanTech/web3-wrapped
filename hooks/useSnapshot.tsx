import { useEffect, useState } from 'react';
import useCollectorId from './useCollectorId';
import getSoundSnapshot from '@/lib/sound/getSoundSnapshot';

const useSnapshot = (collectorId: string) => {
  const [snapshot, setSnapshot] = useState([] as any);
  const collector = useCollectorId(collectorId);
  const { collectorAddress } = collector;

  useEffect(() => {
    const fetchSnapshot = async () => {
      const response = await getSoundSnapshot(collectorAddress);

      setSnapshot(response);
    };

    if (!collectorAddress) return;
    fetchSnapshot();
  }, [collectorAddress]);

  return { snapshot, ...collector };
};

export default useSnapshot;
