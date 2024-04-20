import { IconButton } from '@/components/common/Button';
import { ModalBackdrop } from '@/components/common/ModalBackdrop';
import { Conditional } from '@/components/common/utils';
import useDebounce from '@/hooks/useDebounce';
import { ActionIcon } from '@/types/common';
import styled from '@emotion/styled';
import { Box, Input, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

interface SearchBarProps {
  value?: string;
  placeholder: string;
  actions: ActionIcon[];
  loading?: boolean;
  onClick?: () => void;
}

export const SearchBar = ({
  value,
  placeholder,
  actions,
  loading,
  onClick,
}: SearchBarProps): JSX.Element => {
  return (
    <Searchbar>
      <Conditional condition={loading === false} useSkeleton>
        <SearchbarTextField
          content={value}
          onClick={onClick}
          placeholder={placeholder}
        />
      </Conditional>
      <SearchbarActions>
        {actions.map(({ iconName, onClick }, idx) => (
          <IconButton
            key={idx}
            palette='primary'
            iconName={iconName}
            onClick={onClick}
          />
        ))}
      </SearchbarActions>
    </Searchbar>
  );
};

interface SearchbarTextFieldProps {
  content?: string;
  placeholder?: string;
  onClick?: () => void;
}

const SearchbarTextField = ({
  content,
  placeholder,
  onClick,
}: SearchbarTextFieldProps) => (
  <Box
    sx={{
      margin: 0,
      color: content === undefined ? 'gray' : 'inherit',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }}
    onClick={onClick}
  >
    {content ?? placeholder}
  </Box>
);

interface SearchModalProps {
  defaultKeyword?: string;
  placeholder: string;
  suggestions: { name: string; description: string }[];
  debounceMs?: number;
  backdropMsg?: string;
  closeModal: () => void;
  onKeywordChange: (keyword: string | undefined) => void;
  onSelectSuggestion: (index: number) => void;
}

export const SearchModal = ({
  defaultKeyword,
  placeholder,
  suggestions,
  debounceMs = 0,
  backdropMsg,
  closeModal,
  onKeywordChange,
  onSelectSuggestion,
}: SearchModalProps) => {
  const [keyword, setKeyword] = useState<string | undefined>(defaultKeyword);
  useDebounce(keyword, debounceMs, onKeywordChange);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  return (
    <ModalBackdrop onClick={closeModal} message={backdropMsg}>
      <SearchModalTextField
        keyword={keyword}
        placeholder={placeholder}
        closeModal={closeModal}
        onInput={onInput}
      />
      <Suggestions suggestions={suggestions} onSelect={onSelectSuggestion} />
    </ModalBackdrop>
  );
};

interface SearchModalTextFieldProps {
  keyword?: string;
  placeholder: string;
  closeModal: () => void;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchModalTextField = ({
  keyword,
  placeholder,
  closeModal,
  onInput,
}: SearchModalTextFieldProps) => (
  <Stack
    direction='row'
    width='100%'
    sx={{
      padding: '0.5rem',
      backgroundColor: 'white',
    }}
    onClick={e => e.stopPropagation()}
  >
    <IconButton onClick={closeModal} iconName='arrow_back_ios' />
    <Input
      value={keyword}
      placeholder={placeholder}
      disableUnderline={true}
      onChange={onInput}
      sx={{
        margin: 0,
        outline: 'none',
        borderBottom: '0px',
        width: '100%',
        '& input': {
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },
      }}
    />
  </Stack>
);

interface SuggestionsProps {
  suggestions: { name: string; description: string }[];
  onSelect: (index: number) => void;
}

const Suggestions = ({ suggestions, onSelect }: SuggestionsProps) => {
  return (
    <SuggestionsWrapper>
      {suggestions.map((suggestion, idx) => (
        <Stack
          key={idx}
          width='100%'
          p='0.5rem'
          overflow='hidden'
          textOverflow='ellipsis'
          onClick={() => onSelect(idx)}
          sx={{
            whiteSpace: 'nowrap',
            backgroundColor: 'white',
          }}
        >
          <Typography key={idx}>{suggestion.name}</Typography>
          <Typography sx={{ fontSize: '0.8rem', color: 'gray' }}>
            {suggestion.description}
          </Typography>
        </Stack>
      ))}
    </SuggestionsWrapper>
  );
};

const SuggestionsWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  justifyContent: 'start',
}));

const Searchbar = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  padding: '0.5rem 0.8rem',
  width: '100%',
  borderRadius: '1rem',
  backgroundColor: 'white',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.5rem',
}));

const SearchbarActions = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '0.5rem',
}));
