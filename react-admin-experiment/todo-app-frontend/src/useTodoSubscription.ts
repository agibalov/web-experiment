import { gql } from './dataProvider';
import { useResourceSubscription } from './useResourceSubscription';

const TODO_UPDATES_SUBSCRIPTION = gql`
  subscription TodoUpdates {
    todoUpdates {
      type
      id
    }
  }
`;

export const useTodoSubscription = () => {
  useResourceSubscription({
    resourceName: 'Todo',
    subscription: TODO_UPDATES_SUBSCRIPTION,
  });
};
