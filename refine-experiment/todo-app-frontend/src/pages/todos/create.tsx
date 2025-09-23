import { Create } from "@refinedev/mui";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import gql from "graphql-tag";
import { ErrorMessage } from "@hookform/error-message";

const CREATE_TODO = gql`
  mutation CreateTodo($input: TodoCreateInput!) {
    createTodo(data: $input) {
      id
      title
      done
    }
  }
`;

type FormVals = { title: string; done: boolean };

export const TodoCreate = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<FormVals>({
    refineCoreProps: {
      meta: {
        document: CREATE_TODO,
      },
    },
    defaultValues: { title: "", done: false },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <TextField
        {...register("title", { required: "Title is required" })}
        label="Title"
        margin="normal"
        fullWidth
        error={!!errors.title}
        helperText={<ErrorMessage errors={errors} name="title" />}
      />

      <FormControlLabel
        label="Done"
        control={<Checkbox {...register("done")} />}
      />
    </Create>
  );
};
