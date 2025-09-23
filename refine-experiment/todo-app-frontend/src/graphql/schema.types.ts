export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  createTodo: Todo;
  deleteTodo: Scalars["Boolean"]["output"];
  updateTodo?: Maybe<Todo>;
};

export type MutationCreateTodoArgs = {
  data: TodoCreateInput;
};

export type MutationDeleteTodoArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationUpdateTodoArgs = {
  id: Scalars["Int"]["input"];
  patch: TodoUpdateInput;
};

export type Query = {
  todo?: Maybe<Todo>;
  todos: TodosPage;
};

export type QueryTodoArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryTodosArgs = {
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Array<TodoSort>>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
};

export type SortOrder = "ASC" | "DESC";

export type Todo = {
  done: Scalars["Boolean"]["output"];
  id: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
};

export type TodoCreateInput = {
  done?: Scalars["Boolean"]["input"];
  title: Scalars["String"]["input"];
};

export type TodoSort = {
  field: Scalars["String"]["input"];
  order?: SortOrder;
};

export type TodoUpdateInput = {
  done?: InputMaybe<Scalars["Boolean"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type TodosPage = {
  items: Array<Todo>;
  total: Scalars["Int"]["output"];
};
