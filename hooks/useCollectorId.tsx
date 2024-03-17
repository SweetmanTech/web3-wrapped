import { getAddressSocials } from '@/lib/airstack/getAddressSocials';
import tryEnsAddressLookup from '@/lib/tryEnsAddressLookup';
import { useEffect, useState } from 'react';
import { isAddress } from 'viem';

const useCollectorId = (collectorId: string) => {
  const [ensName, setEnsName] = useState('' as any);
  const [profilePic, setProfilePic] = useState('' as any);
  const [collectorAddress, setCollectorAddress] = useState('' as any);

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await tryEnsAddressLookup(collectorId);
      if (response.error) return;
      setCollectorAddress(response.data);
    };

    const fetchENSName = async () => {
      const response = await getAddressSocials(collectorId);
      const firstSocialProfile = response.data.Socials.Social[0];
      setEnsName(firstSocialProfile.profileName);
      setProfilePic(firstSocialProfile.profileImage);
    };

    if (isAddress(collectorId)) {
      setCollectorAddress(collectorId);
      fetchENSName();
      return;
    }

    if (collectorId.includes('.eth')) {
      setEnsName(collectorId);
      fetchAddress();
    }
  }, [collectorId]);

  return { collectorAddress, ensName, profilePic };
};

export default useCollectorId;
