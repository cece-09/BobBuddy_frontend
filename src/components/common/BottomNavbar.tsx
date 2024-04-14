'use client';
import BottomNavbarItemList from '@/constants/match';
import { Icon, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * 하단 내비게이션바입니다.
 * 현대 페이지에 해당하는 아이템을 하이라이팅합니다.
 *
 * @client
 * @return {JSX.Element}
 */
export default function BottomNavbar(): JSX.Element {
  const current = usePathname();
  const found = BottomNavbarItemList.find(item => item.link === current);
  if (!found) return <></>;

  return (
    <Stack
      direction='row'
      width='100%'
      height='10vh'
      padding='0.5rem'
      justifyContent='space-around'
      alignItems='center'
      sx={{ backgroundColor: 'white' }}
    >
      {BottomNavbarItemList.map(({ icon, text, link }, idx) => (
        <Link key={idx} href={link}>
          <Stack direction='column' alignItems='center'>
            <Icon color={current === link ? 'primary' : 'inherit'}>{icon}</Icon>
            <Typography color={current === link ? 'primary' : 'inherit'}>
              {text}
            </Typography>
          </Stack>
        </Link>
      ))}
    </Stack>
  );
}
