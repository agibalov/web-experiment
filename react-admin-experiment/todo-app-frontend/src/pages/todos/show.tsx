import { BooleanField, DateField, Show, SimpleShowLayout, TextField } from 'react-admin';
import { useTodoSubscription } from '../../useTodoSubscription';

export const TodoShow = () => {
    useTodoSubscription();

    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="title" />
                <BooleanField source="done" />
                <DateField source="createdAt" />
                <DateField source="updatedAt" />
            </SimpleShowLayout>
        </Show>
    );
};
