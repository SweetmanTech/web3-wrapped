import CollectorPageHeader from '@/components/CollectorPage/CollectorPageHeader';
import Results from '@/components/CollectorPage/Results';
import { getAddressSocials } from '@/lib/airstack/getAddressSocials';
import { boldFont, regularFont } from '@/lib/fonts';
import getSoundSnapshot from '@/lib/sound/getSoundSnapshot';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { ImageResponse } = await import('@vercel/og');
  const [regularFontData, boldFontData] = await Promise.all([regularFont, boldFont]);
  const queryParams = req.nextUrl.searchParams;
  const address: any = queryParams.get('address');
  const response = await getAddressSocials(address);
  const firstSocialProfile = response.data.Socials.Social[0];
  const collectorId = firstSocialProfile.profileName;
  const profilePic = firstSocialProfile.profileImage;
  const soundResponse = await getSoundSnapshot(address);
  const totalNumberOfEditions = (soundResponse as any).reduce(
    (total: number, item: any) => total + item.numberOfEditions,
    0,
  );

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
