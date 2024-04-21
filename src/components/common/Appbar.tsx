import { ActionIcon } from '@/types/common';
import { Icon, IconButton, Stack } from '@mui/material';

export interface AppbarProps {
  title?: string;
  actions?: ActionIcon[];
}

const Appbar = ({ title, actions }: AppbarProps) => {
  const appbarStyles = {
    flexDirection: 'row',
    width: '100%',
    height: '7vh',
    backgroundColor: '#FFFFFF',
  };
  return (
    <Stack
      justifyContent='space-between'
      alignItems='center'
      padding='0rem 1rem'
      sx={appbarStyles}
    >
      {title}
      {actions?.map((button, idx) => (
        <AppbarActionButton key={idx} {...button} />
      ))}
    </Stack>
  );
};

export default Appbar;

interface AppbarActionButtonProps {
  iconName: string;
  onClick: () => void;
}

const AppbarActionButton = ({ iconName, onClick }: AppbarActionButtonProps) => (
  <IconButton onClick={onClick}>
    <Icon>{iconName}</Icon>
  </IconButton>
);
