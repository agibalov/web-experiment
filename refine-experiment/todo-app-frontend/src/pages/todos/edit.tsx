import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import { gql } from "graphql-tag";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";

const TODO_SHOW = gql`
  query TodoShow($id: Int!) {
    todo(id: $id) {
      id
      title
      done
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: Int!, $input: TodoUpdateInput!) {
    updateTodo(id: $id, patch: $input) {
      id
      title
      done
    }
  }
`;

type FormVals = { title: string; done: boolean };

export const TodoEdit = () => {
  const { saveButtonProps, register, control, formState: { errors } } =
    useForm<FormVals>({
      refineCoreProps: {
        action: "edit",
        queryMeta: {
            document: TODO_SHOW,
            variables: ({ id }: any) => ({ id: Number(id) }), // 🤦‍♂️
        },
        mutationMeta: {
            document: UPDATE_TODO,
            variables: (values: any, { id }: any) => ({ id: Number(id), input: values }), // 🤦‍♂️
        },
      },
    });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <TextField
        {...register("title", { required: "Title is required" })}
        label="Title"
        margin="normal"
        fullWidth
        error={!!errors.title}
        helperText={<ErrorMessage errors={errors} name="title" />}
      />
      <Controller
        name="done"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            label="Done"
            control={
              <Checkbox
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
          />
        )}
      />
    </Edit>
  );
};
