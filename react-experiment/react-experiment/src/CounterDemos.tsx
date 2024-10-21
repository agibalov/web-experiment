import { Typography } from "@mui/material";
import Counter from "./Counter";
import Demo from "./Demo";

export default function CounterDemos() {
    return (
        <>
            <Typography variant="h3">Counter</Typography>
            <Demo explanation="No default">
                <Counter />
            </Demo>

            <Demo explanation="default: 123">
                <Counter default={123} />
            </Demo>

            <Demo explanation="default: 123, min: 120, max: 130">
                <Counter default={123} min={120} max={130} onChange={(count) => { console.log(`Counter: ${count}`); }} />
            </Demo>
        </>
    );
}
