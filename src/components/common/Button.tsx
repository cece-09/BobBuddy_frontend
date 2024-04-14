import { PaletteKey, theme } from '@/styles/theme';
import { TextType } from '@/types/common';
import { Button, Icon, IconButton as MuiIconButton } from '@mui/material';
import { CSSProperties } from 'react';
import Text from './Text';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  sx?: CSSProperties;
}

interface IconButtonProps extends ButtonProps {
  palette?: PaletteKey;
  iconName?: string;
}

export const IconButton = ({
  iconName,
  palette: key,
  onClick,
}: IconButtonProps) => (
  <MuiIconButton
    onClick={onClick}
    sx={
      key && {
        backgroundColor: theme.palette[key].main,
        color: theme.palette[key].contrastText,
        '&:hover': {
          backgroundColor: theme.palette[key].main,
          color: theme.palette[key].contrastText,
        },
      }
    }
  >
    <Icon>{iconName}</Icon>
  </MuiIconButton>
);

interface MainButtonProps extends ButtonProps {
  bgColor: string;
}

export const MainButton = ({
  onClick,
  bgColor,
  label,
  sx,
}: MainButtonProps) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        alignSelf: 'center',
        background: bgColor,
        borderRadius: '5rem',
        width: '80vw',
        aspectRatio: '7 / 2',
        ...sx,
      }}
    >
      <Text type={TextType.HEADER} color='white'>
        {label}
      </Text>
    </Button>
  );
};
