import Text from '@/components/common/Text';
import DateFormat from '@/constants/date';
import { ISOString, TextType } from '@/types/common';
import { Match } from '@/types/match';
import { Avatar, AvatarGroup, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import Link from 'next/link';

const MatchTodayView = ({ matches }: { matches: Match[] }) => {
  const placeholder = (
    <Stack
      justifyContent='center'
      alignItems='center'
      height='10vh'
      borderRadius='0.5rem'
      sx={{ backgroundColor: 'white' }}
    >
      <Typography fontSize='0.9rem' color='#666'>
        매칭이 없습니다
      </Typography>
    </Stack>
  );
  return (
    <Stack gap={1}>
      {matches.length > 0
        ? matches.map((each, idx) => <MatchCard key={idx} match={each} />)
        : placeholder}
    </Stack>
  );
};

export default MatchTodayView;

const MatchCard = ({ match }: { match: Match }) => {
  const { id, time, userprofiles, recentChatMsg } = match;
  const formatDate = (time: ISOString) =>
    DateTime.fromISO(time).toFormat(DateFormat.MATCH_CARD);

  return (
    <Link href={`/chat/${id}`}>
      <Stack
        direction='column'
        sx={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          padding: '0.5rem 1rem',
        }}
      >
        <Stack direction='column'>
          <Text type={TextType.APPBAR_TITLE}>{`${formatDate(time)} 모임`}</Text>
          <Typography fontSize='0.8rem'>{recentChatMsg}</Typography>
        </Stack>
        <AvatarGroup max={3} total={userprofiles.length}>
          {userprofiles.map((url, idx) => (
            <Avatar key={idx} alt={url} src={url} sizes='sm' />
          ))}
        </AvatarGroup>
      </Stack>
    </Link>
  );
};
