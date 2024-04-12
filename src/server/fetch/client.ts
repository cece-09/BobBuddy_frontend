import { ClientFetchReponse } from '@/types/server';

export const clientFetch = async (
  route: string,
  init: RequestInit,
): Promise<ClientFetchReponse> => {
  console.log(route, init);
  const ret = await fetch(route, init).then(r => {
    return {
      ok: r.ok,
      status: r.status,
      json: () => r.json(),
    };
  });
  return ret;
};
