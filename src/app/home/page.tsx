'use client';

import { MainButton } from '@/components/common/Button';
import Page from '@/components/common/Page';
import Text from '@/components/common/Text';
import { Spacing } from '@/components/common/utils';
import { Address, PageType, TextType } from '@/types/common';
import { useContext } from 'react';
import { MatchContext } from './components/MatchProvider';
import { SearchBar, SearchModal } from './components/Searchbar';
import SelectSlider from './components/SelectSlider';

const SEARCHBAR_PLACEHOLDER = '어디서 먹을까요?';
const MATCH_BUTTON_LABEL = '랜덤 매칭';
const GRADIENT_COLOR = `linear-gradient(95deg, #5E1EE7 13.09%, #7718C1 100%)`;

export default function HomePage() {
  const {
    address,
    isSearchingGPS,
    suggestions,
    showSearchModal,
    matchSizeOptions,
    searchBarActions,
    toggleSearchModal,
    onAddressSuggestionClicked,
    onAddressKeywrordChanged,
    onMatchSizeChange,
    processMatch,
  } = useContext(MatchContext);

  return (
    <Page type={PageType.PLAIN} showAppbar={false}>
      <Text type={TextType.HEADER}>위치 설정</Text>
      <Spacing direction='column' size={3} />
      <SearchBar
        value={address?.name ?? address?.address}
        placeholder={SEARCHBAR_PLACEHOLDER}
        actions={searchBarActions}
        onClick={toggleSearchModal}
        loading={isSearchingGPS}
      />
      {showSearchModal && (
        <SearchModal
          defaultKeyword={address?.address}
          placeholder={SEARCHBAR_PLACEHOLDER}
          closeModal={toggleSearchModal}
          suggestions={toSuggestions(suggestions)}
          backdropMsg='현재 서울특별시만 서비스됩니다.'
          onSelectSuggestion={onAddressSuggestionClicked}
          onKeywordChange={onAddressKeywrordChanged}
          debounceMs={500}
        />
      )}
      <Spacing direction='column' size={10} />
      <Text type={TextType.HEADER}>인원 설정</Text>
      <Spacing direction='column' size={3} />
      <SelectSlider
        options={matchSizeOptions}
        onSelectChanged={onMatchSizeChange}
      />
      <MainButton
        onClick={processMatch}
        label={MATCH_BUTTON_LABEL}
        bgColor={GRADIENT_COLOR}
        sx={{
          position: 'absolute',
          bottom: '5vh',
        }}
      />
    </Page>
  );
}

const toSuggestions = (
  addresses: Address[],
): {
  name: string;
  description: string;
}[] =>
  addresses.map(addr => ({
    name: addr.name ?? '',
    description: addr.address,
  }));
