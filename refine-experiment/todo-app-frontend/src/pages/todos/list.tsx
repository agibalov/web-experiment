import { DeleteButton, EditButton, List, ShowButton, useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { gql } from "graphql-tag";
import { Stack } from "@mui/material";

const TODOS_PAGE = gql`
  query TodosPage($skip: Int, $take: Int, $sort: [TodoSort!]) {
    todos(skip: $skip, take: $take, sort: $sort) {
      items { id title done }
      total
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`;

export const TodoList = () => {
    const { dataGridProps } = useDataGrid({
        resource: "todos",
        meta: { document: TODOS_PAGE },
        pagination: { mode: "server", pageSize: 10 },
        sorters: { mode: "server", initial: [{ field: "id", order: "asc" }] },
        queryOptions: { refetchOnWindowFocus: false, refetchOnReconnect: false },
    });

    const columns = useMemo<GridColDef[]>(
        () => [
            { field: "id", headerName: "Id", type: "number", minWidth: 50, },
            { field: "title", headerName: "Title", minWidth: 200, },
            { field: "done", headerName: "Done", type: "boolean", minWidth: 100, },
            { 
                field: "actions", 
                headerName: "Actions", 
                sortable: false, 
                filterable: false, 
                minWidth: 120, 
                flex: 1,
                renderCell: ({ row }) => (
                    <Stack direction="row" spacing={1}>
                        <ShowButton
                            hideText
                            size="small"
                            recordItemId={row.id}
                            resource="todos"
                        />
                        <EditButton
                            hideText
                            size="small"
                            recordItemId={row.id}
                            resource="todos"
                        />
                        <DeleteButton
                            hideText
                            size="small"
                            recordItemId={row.id}
                            resource="todos"
                            meta={{ document: DELETE_TODO }}
                        />
                    </Stack>
                )
            },
        ],
        []
    );

    return (
        <List>
            <DataGrid
                {...dataGridProps}
                columns={columns}
                getRowId={(r) => r.id}
                pageSizeOptions={[5, 10, 25]}
            />
        </List>
    );
}
