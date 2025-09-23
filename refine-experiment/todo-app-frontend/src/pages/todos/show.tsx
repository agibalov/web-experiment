import { Show } from "@refinedev/mui";
import { useShow } from "@refinedev/core";
import { gql } from "graphql-tag";
import { Stack, Typography, Chip } from "@mui/material";

const TODO_SHOW = gql`
  query TodoShow($id: Int!) {
    todo(id: $id) {
      id
      title
      done
    }
  }
`;

export const TodoShow = () => {
  const { query } = useShow({
    resource: "todos",
    meta: { 
        document: TODO_SHOW,
        variables: ({ id }: { id: any }) => ({ id: Number(id) }) // 🤦‍♂️
    },    
  });

  const record = query?.data?.data; // dataProvider.getOne should return { data: todo }

  return (
    <Show isLoading={query?.isLoading}>
      <Stack gap={1}>
        <Typography variant="subtitle2">ID</Typography>
        <Typography>{record?.id}</Typography>

        <Typography variant="subtitle2">Title</Typography>
        <Typography>{record?.title}</Typography>

        <Typography variant="subtitle2">Done</Typography>
        <Chip label={record?.done ? "Yes" : "No"} />
      </Stack>
    </Show>
  );
};
