import { AIRSTACK_API_URL } from '../consts';

export const getAddressSocials = async (address: string) => {
  const query = `query MyQuery($address: Address!){
          Socials(
            input: {filter: {userAssociatedAddresses: {_in: [$address]}}, blockchain: ethereum}
          ) {
            Social {
              dappName
              userAddress
              userAssociatedAddresses
              userAddressDetails {
                primaryDomain {
                  name
                  avatar
                }
              }
              fnames
              profileHandle
              profileName
              profileImage
              twitterUserName
            }
          }
        }`;
  const variables = {
    address,
  };
  const res = await fetch(AIRSTACK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${process.env.NEXT_PUBLIC_AIRSTACK_API_KEY}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  return data;
};
