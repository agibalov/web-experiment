import {
  Admin,
  EditGuesser,
  Resource,
  ShowGuesser  
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { TodoList } from "./pages/todos/list";
import { TodoCreate } from "./pages/todos/create";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource
      name="Todo"
      list={TodoList}
      create={TodoCreate}
      show={ShowGuesser}
      edit={EditGuesser}
    />
  </Admin>
);
