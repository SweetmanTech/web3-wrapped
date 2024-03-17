import { useCollectorProvider } from '@/providers/CollectorProvider';
import MadeBySweets from '../MadeBySweets';
import CollectorPageHeader from './CollectorPageHeader';
import Results from './Results';

const CollectorPageContent = () => {
  const { collectorAddress, snapshot, ensName, profilePic }: any = useCollectorProvider();

  const totalNumberOfEditions =
    snapshot?.length > 0 &&
    snapshot.reduce((total: number, item: any) => total + item.numberOfEditions, 0);

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
