import { ErrorResponse, MatchRequest, MatchResponse } from '@/types/server';
import { BuddyError, ErrorCode, handleError } from '@/utils/error';
import { jsonifyResponse } from '@/utils/server';
import request from './fetch/request';

export const requestMatch = async (
  location: string,
  matchSize: string,
): Promise<MatchResponse | ErrorResponse> => {
  const body: MatchRequest = {
    location: location,
    matchSize: matchSize,
  };

  try {
    const result: MatchResponse = await request('/match', {
      method: 'PUT',
      body: JSON.stringify(body),
    }).then(r => {
      return jsonifyResponse<MatchResponse>(r, ErrorCode.MATCH_GENERAL_ERROR);
    });
    if (result === undefined) {
      throw new BuddyError(ErrorCode.MATCH_GENERAL_ERROR, 'result is empty');
    }
    return result;
  } catch (error) {
    const errorMsg = `request match fail`;
    return await handleError(error, errorMsg);
  }
};

export const requestMatchJoin = async (): Promise<any> => {
  try {
    const result = await request('/match', {
      method: 'POST',
    }).then(r => jsonifyResponse<any>(r, ErrorCode.MATCH_GENERAL_ERROR));
    console.log(result);
    return result;
  } catch (error) {
    const errorMsg = `request match join fail`;
    await handleError(error, errorMsg);
    return undefined;
  }
};

export const requestMatchExit = async (): Promise<any> => {
  try {
    const result = await request('/match', {
      method: 'DELETE',
    }).then(r => jsonifyResponse<any>(r, ErrorCode.MATCH_GENERAL_ERROR));
    console.log(result);
    return result;
  } catch (error) {
    const errorMsg = `request match exit fail`;
    await handleError(error, errorMsg);
    return undefined;
  }
};

export const requestMatchCancel = async (): Promise<any> => {
  try {
    const result = await request('/match', {
      method: 'PATCH',
    }).then(r => jsonifyResponse<any>(r, ErrorCode.MATCH_GENERAL_ERROR));
    console.log(result);
    return result;
  } catch (error) {
    const errorMsg = `request match cancel fail`;
    await handleError(error, errorMsg);
    return undefined;
  }
};

export const requestMatchList = async (): Promise<any> => {
  try {
    const result = await request('/match', {
      method: 'GET',
    }).then(r => jsonifyResponse<any>(r, ErrorCode.MATCH_GENERAL_ERROR));
    console.log(result);
    return result;
  } catch (error) {
    const errorMsg = `request match list fail`;
    await handleError(error, errorMsg);
    return undefined;
  }
};
