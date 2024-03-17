import CollectorPageHeader from '@/components/CollectorPage/CollectorPageHeader';
import Results from '@/components/CollectorPage/Results';
import { getAddressSocials } from '@/lib/airstack/getAddressSocials';
import { boldFont, regularFont } from '@/lib/fonts';
import formatErc721Events from '@/lib/formatErc721Events';
import get30DayBlockRange from '@/lib/get30DayBlockRange';
import getEnsName from '@/lib/getEnsName';
import getErc721TransferEvents from '@/lib/getErc721TransferEvents';
import getSoundBatchCollectionMetadata from '@/lib/sound/getSoundBatchCollectionMetadata';
import getSoundSnapshot from '@/lib/sound/getSoundSnapshot';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { ImageResponse } = await import('@vercel/og');

  console.log('SWEETS GET IMAGE');

  const [regularFontData, boldFontData] = await Promise.all([regularFont, boldFont]);
  const queryParams = req.nextUrl.searchParams;
  const address: any = queryParams.get('address');
  console.log('SWEETS address', address);

  const response = await getAddressSocials(address);
  const firstSocialProfile = response.data.Socials.Social[0];
  const collectorId = firstSocialProfile.profileName;
  console.log('SWEETS collectorId', collectorId);
  const profilePic = firstSocialProfile.profileImage;
  console.log('SWEETS address', address);

  const soundResponse = await getSoundSnapshot(address);
  console.log('SWEETS profilePic', profilePic);
  const totalNumberOfEditions = (soundResponse as any).reduce(
    (total: number, item: any) => total + item.numberOfEditions,
    0,
  );
  console.log('SWEETS totalNumberOfEditions', totalNumberOfEditions);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          fontFamily: '"HelveticaBold"',
        }}
      >
        <CollectorPageHeader
          src={profilePic}
          collectorId={collectorId}
          total={totalNumberOfEditions}
        />
        <Results snapshot={soundResponse} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Helvetica',
          data: regularFontData,
          weight: 400,
        },
        {
          name: 'HelveticaBold',
          data: boldFontData,
          weight: 700,
        },
      ],
    },
  );
}
