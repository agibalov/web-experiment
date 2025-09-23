import { Refine, WelcomePage } from "@refinedev/core";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";
import { ThemedLayout } from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Route, Routes } from "react-router";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { TodoList } from "./pages/todos/list";
import { TodoCreate } from "./pages/todos/create";

import { Client, fetchExchange } from "@urql/core";
import { myDataProvider } from "./mydataprovider";
import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { TodoShow } from "./pages/todos/show";
import { TodoEdit } from "./pages/todos/edit";

export const gqlClient = new Client({
  url: "http://localhost:8000/graphql",
  exchanges: [fetchExchange],
});

const dataProvider = myDataProvider(gqlClient);

const AppTitle = ({ collapsed }: { collapsed?: boolean }) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <RouterLink to="/" style={{ textDecoration: "none" }}>
      <Typography variant="h6" component="span">
        {collapsed ? "App" : "My App"}
      </Typography>
    </RouterLink>
  </Box>
);

function App() {
  return (
    <BrowserRouter>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "nVng1f-oUd9rP-cq8h3y",
              }}
              resources={[
                {
                  name: "todos", 
                  list: "/todos", 
                  create: "/todos/create",
                  show: "/todos/:id",
                  edit: "/todos/:id/edit"
                }
              ]}
            >
              <ThemedLayout Title={AppTitle}>
                <Routes>
                  <Route index element={<WelcomePage />} />

                  <Route path="/todos">
                    <Route index element={<TodoList />} />                      
                  </Route>

                  <Route path="/todos/create" element={<TodoCreate />} />

                  <Route path="/todos/:id" element={<TodoShow />} />

                  <Route path="/todos/:id/edit" element={<TodoEdit />} />

                  <Route path="*" element={<ErrorComponent />} />
                </Routes>
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </ThemedLayout>
            </Refine>
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </BrowserRouter>
  );
}

export default App;
