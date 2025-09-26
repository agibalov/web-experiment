import { Stack, Box, Typography, Chip } from '@mui/material';
import { BooleanField, DataTable, List, DeleteButton, EditButton, ShowButton, useRecordContext, DateField, SearchInput, BooleanInput, SelectInput } from 'react-admin';

const TodoExpandPanel = () => {
    const record = useRecordContext();

    if (!record) return null;

    return (
        <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
                Todo Details
            </Typography>
            <Stack spacing={2}>
                <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                        ID:
                    </Typography>
                    <Typography variant="body1">
                        {record.id}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                        Title:
                    </Typography>
                    <Typography variant="body1">
                        {record.title}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                        Status:
                    </Typography>
                    <Chip
                        label={record.done ? 'Completed' : 'Pending'}
                        color={record.done ? 'success' : 'warning'}
                        size="small"
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                        Created At:
                    </Typography>
                    <Typography variant="body1">
                        <DateField record={record} source="createdAt" showTime />
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                        Updated At:
                    </Typography>
                    <Typography variant="body1">
                        <DateField record={record} source="updatedAt" showTime />
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
};

const todoFilters = [
    <SearchInput source="q" alwaysOn />
];

export const TodoList = () => (
    <List filters={todoFilters}>
        <DataTable expand={<TodoExpandPanel />}>
            <DataTable.Col source="id" />
            <DataTable.Col source="title" />
            <DataTable.Col source="done">
                <BooleanField source="done" />
            </DataTable.Col>
            <DataTable.Col source="createdAt" label="Created">
                <DateField source="createdAt" showTime />
            </DataTable.Col>
            <DataTable.Col source="updatedAt" label="Updated">
                <DateField source="updatedAt" showTime />
            </DataTable.Col>
            <DataTable.Col source="actions" label="Actions" disableSort={true}>
                <Stack direction="row" spacing={1}>
                    <ShowButton />
                    <EditButton />
                    <DeleteButton />
                </Stack>
            </DataTable.Col>
        </DataTable>
    </List>
);
