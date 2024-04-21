import { ISOString } from './common';

export interface Match {
  id: string;
  title: string;
  time: ISOString;
  userprofiles: string[];
  recentChatMsg: string;
}
