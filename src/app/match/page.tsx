import { Match } from '@/types/match';
import { DateTime } from 'luxon';
import MatchHistoryView from './components/MatchHistory';
import MatchListLayout from './components/MatchListLayout';
import MatchTodayView from './components/MatchToday';

const getMatchData = async (): Promise<Match[]> => {
  // const matches = await requestMatchList();
  const today = DateTime.now().setLocale('ko').startOf('day');
  const yesterday = today.minus({ days: 1 });
  return [
    {
      id: '1',
      title: '모임1',
      time: today.toISO(),
      userprofiles: ['', '', '', ''],
      recentChatMsg: '가장 최근 채팅을 노출합니다.',
    },
    {
      id: '1',
      title: '모임2',
      time: today.toISO(),
      userprofiles: ['', '', '', ''],
      recentChatMsg: '가장 최근 채팅을 노출합니다.',
    },
    {
      id: '1',
      title: '모임3',
      time: yesterday.toISO(),
      userprofiles: ['', '', '', ''],
      recentChatMsg: '가장 최근 채팅을 노출합니다.',
    },
    {
      id: '1',
      title: '모임4',
      time: yesterday.toISO(),
      userprofiles: ['', '', '', ''],
      recentChatMsg: '가장 최근 채팅을 노출합니다.',
    },
    {
      id: '1',
      title: '모임5',
      time: yesterday.toISO(),
      userprofiles: ['', '', '', ''],
      recentChatMsg: '가장 최근 채팅을 노출합니다.',
    },
  ];
};

export default async function MatchPage() {
  const matches = await getMatchData();
  const matchToday = getTodaysMatch(matches);
  const matchHistory = getMatchHistory(matches);

  const today = <MatchTodayView matches={matchToday} />;
  const history = <MatchHistoryView matches={matchHistory} />;
  return <MatchListLayout today={today} history={history} />;
}

const getTodaysMatch = (matches: Match[]) => {
  const midnight = DateTime.now().setLocale('ko').startOf('day');
  return matches.filter(each => each.time >= midnight.toISO());
};

const getMatchHistory = (matches: Match[]) => {
  const midnight = DateTime.now().setLocale('ko').startOf('day');
  return matches.filter(each => each.time < midnight.toISO());
};
