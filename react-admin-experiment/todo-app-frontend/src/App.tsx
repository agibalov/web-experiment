import {
  Admin,
  Resource,
  ListGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource
      name="Todo"
      list={ListGuesser}
      show={ShowGuesser}
    />
  </Admin>
);
