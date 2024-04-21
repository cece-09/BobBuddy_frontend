import { Box, Skeleton } from '@mui/material';
import { ReactNode } from 'react';

interface ConditionalProps {
  condition: boolean;
  children: ReactNode;
  fallback?: ReactNode;
  useSkeleton?: boolean;
}

export const Conditional = ({
  condition,
  children,
  fallback,
  useSkeleton,
}: ConditionalProps) => {
  const skeleton = useSkeleton ? <Skeleton width='100%' /> : undefined;
  return condition ? children : fallback ?? skeleton;
};

interface SpacingProps {
  direction: 'row' | 'column';
  size: number;
}

export const Spacing = ({ direction, size }: SpacingProps) => {
  const style = {
    ...(direction === 'row' && { marginRight: size }),
    ...(direction === 'column' && { marginBottom: size }),
  };

  return <Box sx={style} />;
};
