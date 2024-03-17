import { useCollectorProvider } from '@/providers/CollectorProvider';
import MadeBySweets from '../MadeBySweets';
import CollectorPageHeader from './CollectorPageHeader';
import Results from './Results';

const CollectorPageContent = () => {
  const { collectorAddress, snapshot, ensName, profilePic } = useCollectorProvider();
  console.log('SWEETS SNAPSHOT', snapshot);

  const totalNumberOfEditions = (snapshot as any).reduce(
    (total: number, item: any) => total + item.numberOfEditions,
    0,
  );
  console.log('sweets Total Number of Editions:', totalNumberOfEditions);

  return (
    <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center sm:gap-8 md:px-6">
      <CollectorPageHeader
        collectorId={ensName || collectorAddress}
        src={profilePic}
        total={totalNumberOfEditions}
      />
      <Results snapshot={snapshot} />
      <MadeBySweets />
    </div>
  );
};

export default CollectorPageContent;
