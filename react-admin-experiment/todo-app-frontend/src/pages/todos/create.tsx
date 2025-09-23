import { Create, SimpleForm, TextInput, BooleanInput } from 'react-admin';

export const TodoCreate = () => (
    <Create title="Create New Todo">
        <SimpleForm>
            <TextInput 
                source="title" 
                label="Title" 
                required 
                fullWidth
                helperText="Enter the todo description"
            />
            <BooleanInput 
                source="done" 
                label="Completed" 
                defaultValue={false}
                helperText="Mark as completed if already done"
            />
        </SimpleForm>
    </Create>
);