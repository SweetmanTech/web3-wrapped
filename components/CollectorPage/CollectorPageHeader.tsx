const CollectorPageHeader = ({ collectorId, src, total }: any) => (
  <div
    className="space-y-3 flex flex-col"
    tw="flex flex-col items-center text-center w-[1000px] mb-3"
  >
    <p
      className="flex  items-center  gap-3 text-4xl font-bold tracking-tighter sm:text-5xl"
      tw="flex  items-center  gap-3 text-7xl font-black m-0"
    >
      {src && (
        <img height={100} width={100} src={src} className="rounded-full" tw="rounded-full mr-5" />
      )}
      {collectorId}
    </p>
    <p className="max-w-[600px] text-md md:text-xl font-bold" tw="text-2xl font-bold m-0">
      {total} editions sold - past 30 days.
    </p>
  </div>
);

export default CollectorPageHeader;
