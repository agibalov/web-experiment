import {
    Admin,
    DataProvider,
    EditGuesser,
    Resource,
    ShowGuesser
} from "react-admin";
import { Layout } from "./Layout";
import { TodoList } from "./pages/todos/list";
import { TodoCreate } from "./pages/todos/create";
import { useEffect, useState } from "react";
import { buildDataProvider } from "./dataProvider";

export const App = () => {
    const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        buildDataProvider()
            .then((provider) => {
                setDataProvider(() => provider);
            })
            .catch((err) => {
                console.error('Failed to build data provider:', err);
                setError(err.message || 'Failed to initialize data provider');
            });
    }, []);

    if (error) {
        return (
            <div>Error: {error}</div>
        );
    }

    return (
        <Admin layout={Layout} dataProvider={dataProvider ?? undefined}>
            <Resource
                name="Todo"
                list={TodoList}
                create={TodoCreate}
                show={ShowGuesser}
                edit={EditGuesser}
            />
        </Admin>
    );
};
