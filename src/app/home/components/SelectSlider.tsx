import { IconButton } from '@/components/common/Button';
import Text from '@/components/common/Text';
import { Stack } from '@mui/material';
import { useState, useEffect } from 'react';

export interface SelectSliderOption {
  text: string;
  subtext: string;
  image?: string;
}

interface SelectSliderProps {
  options: SelectSliderOption[];
  onSelectChanged: (index: number) => void;
}

const SelectSlider = ({ options, onSelectChanged }: SelectSliderProps) => {
  const [focus, setFocus] = useState<number>(0);

  const onClickNext = () => focus < options.length - 1 && setFocus(focus + 1);
  const onClickPrev = () => focus > 0 && setFocus(focus - 1);

  useEffect(() => {
    onSelectChanged(focus);
  }, [focus, onSelectChanged]);

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      gap={1}
      width='100%'
    >
      <IconButton
        palette='primary'
        iconName='remove_rounded'
        onClick={onClickPrev}
      />
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{
          borderRadius: '100%',
          backgroundColor: 'white',
          width: '40vw',
          aspectRatio: '1 / 1',
        }}
      >
        <Text fontWeight={600}>{options[focus].text}</Text>
        <Text fontSize={'0.8rem'} color={'gray'}>
          {options[focus].subtext}
        </Text>
      </Stack>
      <IconButton
        palette='primary'
        iconName='add_rounded'
        onClick={onClickNext}
      />
    </Stack>
  );
};

export default SelectSlider;
