import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

import type { ForexData } from '../model/forex';

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
export const VALID_UNTIL_MIDNIGHT_KEY = 'valid-until-midnight';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: (query) => {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);

        const timeToMidnight = midnight.getTime() - now.getTime();

        const stateDate = (query.state.data as ForexData)?.date;
        const isSameDay =
          stateDate && new Date(stateDate).getDate() === new Date().getDate();

        return isSameDay ? timeToMidnight : 0;
      },
      gcTime: DAY_IN_MILLISECONDS,
      refetchOnWindowFocus: false,
    },
  },
});

const localStoragePersister = createAsyncStoragePersister({
  storage: window.localStorage,
  key: 'forex-cache',
  throttleTime: 1000,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: DAY_IN_MILLISECONDS,
});
