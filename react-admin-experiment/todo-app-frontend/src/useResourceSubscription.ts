import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { type DocumentNode } from 'graphql';
import { apolloClient } from './dataProvider';

interface UseResourceSubscriptionOptions {
  resourceName: string;
  subscription: DocumentNode;
}

export const useResourceSubscription = ({
  resourceName,
  subscription,
}: UseResourceSubscriptionOptions) => {
  const queryClient = useQueryClient();
  const queryClientRef = useRef(queryClient);

  useEffect(() => {
    queryClientRef.current = queryClient;
  }, [queryClient]);

  useEffect(() => {
    const sub = apolloClient
      .subscribe({
        query: subscription,
      })
      .subscribe({
        next: () => {
          // Invalidate all queries for this resource to trigger refetch
          // This includes getList, getOne, getMany, etc.
          queryClientRef.current.invalidateQueries({
            queryKey: [resourceName],
          });
        },
        error: (error) => {
          console.error(`${resourceName} subscription error:`, error);
        },
      });

    return () => {
      sub.unsubscribe();
    };
  }, [resourceName, subscription]);
};
