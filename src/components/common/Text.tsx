import { TextType } from '@/types/common';
import { Typography, TypographyProps } from '@mui/material';
import { CSSProperties } from 'react';

interface TextProps extends TypographyProps {
  type?: TextType;
}

const Text = ({ type, ...props }: TextProps) => (
  <Typography {...props} sx={getTextStyles(type)} />
);

export default Text;

const getTextStyles = (type: TextType | undefined): CSSProperties => {
  switch (type) {
    case TextType.HEADER:
      return {
        fontSize: '1.5rem',
        fontWeight: 600,
        marginBottom: '2px',
      };
    case TextType.SUB_HEADER:
      return {
        fontSize: '1.2rem',
        fontWeight: 600,
        marginBottom: '1px',
      };
    case TextType.APPBAR_TITLE:
      return {
        fontSize: '1.2rem',
        fontWeight: 600,
      };
    default:
      return {};
  }
};
