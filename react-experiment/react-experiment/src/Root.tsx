import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Container, Stack, Toolbar, Link } from "@mui/material";
import { Link as RouterLink, Outlet } from 'react-router-dom'

export default function Root() {
    return (
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Stack direction="row" spacing={2}>
                    <img src={reactLogo} />
                    <img src={viteLogo} />
                    <Link component={RouterLink} to="/">Home</Link>
                    <Link component={RouterLink} to="/test">Test</Link>
                </Stack>
            </Toolbar>
            <Outlet />
        </Container>
    )
}
