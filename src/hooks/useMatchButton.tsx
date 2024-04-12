import request from '@/server/fetch/request';
import { useState } from 'react';

/**
 * Match Page 상태 관리를 위한
 * Custom Hook
 *
 * @export
 * @param {{ location?: string; size?: number }} inits
 * @return {*}
 */
export function useMatchButton(inits: { location?: string; size?: number }) {
  const [location, setLocation] = useState<string>(inits.location ?? '');
  const [size, setSize] = useState<number>(inits.size ?? 0);
  const [disabled, setDisabled] = useState<boolean>(false);

  // handler 함수
  const handleSizeChange = (newSize: number) => {
    if (size !== newSize) {
      setSize(newSize);
    }
  };
  const handleLocationChange = (newLocation: string) => {
    if (location !== newLocation) {
      setLocation(newLocation);
    }
    if (location !== '') setDisabled(false);
    else setDisabled(true);
  };

  return {
    location,
    setLocation: handleLocationChange,
    size,
    setSize: handleSizeChange,
    disabled,
  };
}
