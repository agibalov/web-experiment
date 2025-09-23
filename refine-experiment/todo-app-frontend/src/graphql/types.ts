import type * as Types from "./schema.types";

export type CreateTodoMutationVariables = Types.Exact<{
  input: Types.TodoCreateInput;
}>;

export type CreateTodoMutation = {
  createTodo: Pick<Types.Todo, "id" | "title" | "done">;
};

export type TodoShowQueryVariables = Types.Exact<{
  id: Types.Scalars["Int"]["input"];
}>;

export type TodoShowQuery = {
  todo?: Types.Maybe<Pick<Types.Todo, "id" | "title" | "done">>;
};

export type UpdateTodoMutationVariables = Types.Exact<{
  id: Types.Scalars["Int"]["input"];
  input: Types.TodoUpdateInput;
}>;

export type UpdateTodoMutation = {
  updateTodo?: Types.Maybe<Pick<Types.Todo, "id" | "title" | "done">>;
};

export type TodosPageQueryVariables = Types.Exact<{
  skip?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  take?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  sort?: Types.InputMaybe<Array<Types.TodoSort> | Types.TodoSort>;
}>;

export type TodosPageQuery = {
  todos: Pick<Types.TodosPage, "total"> & {
    items: Array<Pick<Types.Todo, "id" | "title" | "done">>;
  };
};

export type DeleteTodoMutationVariables = Types.Exact<{
  id: Types.Scalars["Int"]["input"];
}>;

export type DeleteTodoMutation = Pick<Types.Mutation, "deleteTodo">;
