import useToast from '@/hooks/useToast';
import { requestQueryAddress, requestReverseGeo } from '@/server/geolocation';
import { requestMatch } from '@/server/match';
import { ActionIcon, Address, ModalType } from '@/types/common';
import { isErrorResponse } from '@/utils/error';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SelectSliderOption } from './SelectSlider';
import { ModalContext } from '@/providers/ModalProvider';

interface MatchContextType {
  address: Address | undefined;
  suggestions: Address[];
  matchSize: string;
  showSearchModal: boolean;
  isSearchingGPS: boolean;

  searchBarActions: ActionIcon[];
  matchSizeOptions: SelectSliderOption[];

  setAddress: Dispatch<SetStateAction<Address | undefined>>;
  setSuggestions: Dispatch<SetStateAction<Address[]>>;
  setMatchSize: Dispatch<SetStateAction<string>>;
  setShowSearchModal: Dispatch<SetStateAction<boolean>>;
  processMatch: () => void;
  toggleSearchModal: () => void;
  onAddressSuggestionClicked: (idx: number) => void;
  onMatchSizeChange: (idx: number) => void;
  onAddressKeywrordChanged: (keyword: string | undefined) => void;
}

const MATCH_SIZE_OPTIONS: SelectSliderOption[] = [
  {
    text: 'Small',
    subtext: '2-3명의 소규모 모임',
  },
  {
    text: 'Medium',
    subtext: '4-6명의 즐거운 식사',
  },
  {
    text: 'Large',
    subtext: '7명이상의 파티',
  },
];

export const MatchContext = createContext<MatchContextType>({
  address: undefined,
  suggestions: [],
  matchSize: MATCH_SIZE_OPTIONS[0].text,
  showSearchModal: false,
  isSearchingGPS: true,
  searchBarActions: [],
  matchSizeOptions: MATCH_SIZE_OPTIONS,

  setAddress: () => {},
  setSuggestions: () => {},
  setMatchSize: () => {},
  setShowSearchModal: () => {},
  processMatch: () => {},
  toggleSearchModal: () => {},
  onAddressSuggestionClicked: () => {},
  onMatchSizeChange: () => {},
  onAddressKeywrordChanged: () => {},
});

export const MatchProvider = ({ children }: { children: ReactNode }) => {
  const { openModal } = useContext(ModalContext);
  const { showToast, showErrorToast } = useToast();
  const [address, setAddress] = useState<Address | undefined>(undefined);
  const [suggestions, setSuggestions] = useState<Address[]>([]);
  const [isSearchingGPS, setIsSearchingGPS] = useState<boolean>(true);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [matchSize, setMatchSize] = useState<string>(
    MATCH_SIZE_OPTIONS[0].text,
  );

  useEffect(() => {
    (async () => {
      setIsSearchingGPS(true);
      const address = await requestCurrentLocation();
      setAddress(address);
      setIsSearchingGPS(false);
      onAddressKeywrordChanged(address?.address);
    })();
  }, []);

  const processMatch = async () => {
    if (address === undefined) {
      showToast('위치를 설정해주세요');
      return;
    }
    const result = await requestMatch(address.address, matchSize);
    if (isErrorResponse(result)) {
      // 이미 오늘 매칭을 한 경우
      // 같은 시간에 매칭된 일정이 있는 경우
      showErrorToast(result.code);
      return;
    }
    // 매칭 풀에 들어간 경우
    // openModal(ModalType.MATCH_PENDING);
    // 즉시 매칭이 이루어진 경우
    openModal(ModalType.MATCH_SUCCESS);
  };

  const toggleSearchModal = () => setShowSearchModal(!showSearchModal);

  const onAddressKeywrordChanged = (keyword: string | undefined) => {
    if (keyword === undefined || keyword.length === 0) {
      setSuggestions([]);
      return;
    }
    (async () =>
      getLocationByKeyword(keyword).then(addresses =>
        setSuggestions(addresses),
      ))();
  };

  const onAddressSuggestionClicked = (index: number) => {
    setAddress(suggestions[index]);
    setSuggestions([]);
    setShowSearchModal(false);
  };

  const onMatchSizeChange = (index: number) => {
    setMatchSize(MATCH_SIZE_OPTIONS[index].text);
  };

  const searchBarActions: ActionIcon[] = [
    {
      iconName: 'search',
      onClick: () => setShowSearchModal(true),
    },
    {
      iconName: 'gps_fixed',
      onClick: async () => {
        const address = await requestCurrentLocation();
        setAddress(address);
        setIsSearchingGPS(false);
        onAddressKeywrordChanged(address?.address);
      },
    },
  ];

  return (
    <MatchContext.Provider
      value={{
        address,
        suggestions,
        matchSize,
        showSearchModal,
        isSearchingGPS,
        searchBarActions,
        matchSizeOptions: MATCH_SIZE_OPTIONS,
        setAddress,
        setSuggestions,
        setMatchSize,
        setShowSearchModal,
        processMatch,
        toggleSearchModal,
        onAddressSuggestionClicked,
        onMatchSizeChange,
        onAddressKeywrordChanged,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

const getCurrentLocation = (
  options = {},
): Promise<GeolocationPosition | undefined> => {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      () => {
        resolve(undefined);
      },
      options,
    );
  });
};

const requestCurrentLocation = async (): Promise<Address | undefined> => {
  const GEOLOCATION_TIMEOUT = 10000;
  const position = await getCurrentLocation({
    enableHighAccuracy: true,
    timeout: GEOLOCATION_TIMEOUT,
    maximumAge: 0,
  });
  if (position === undefined) {
    return undefined;
  }

  const { latitude, longitude } = position.coords;
  const address = await requestReverseGeo(longitude, latitude);
  if (address === undefined) {
    return undefined;
  }

  return address;
};

const getLocationByKeyword = async (keyword: string): Promise<Address[]> => {
  const result = await requestQueryAddress(keyword);
  return result ?? [];
};
