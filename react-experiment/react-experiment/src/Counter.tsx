import { useState } from 'react'
import './Counter.css'
import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material'
import { Typography, Button, Stack } from '@mui/material'

interface CounterProps {
    default?: number
    min?: number
    max?: number
    onChange?: (count: number) => void
}

export default function Counter(props: CounterProps) {
    const [count, setCount] = useState(props.default ?? 0)

    let onChange = props.onChange ?? (() => {})

    return (
        <Stack direction="row">
            <Button onClick={decrement} className='counter-button' disabled={!canDecrement()}>
                <RemoveCircleOutline />
            </Button>

            <Typography>Hello world {count}</Typography>

            <Button onClick={increment} className='counter-button' disabled={!canIncrement()}>
                <AddCircleOutline />
            </Button>
        </Stack>
    )

    function canDecrement(): boolean {
        return props.min == null || count - 1 >= props.min
    }

    function decrement() {
        const newCount = count - 1
        setCount(newCount)
        onChange(newCount)
    }

    function canIncrement(): boolean {
        return props.max == null || count + 1 <= props.max
    }

    function increment() {
        const newCount = count + 1
        setCount(newCount)
        onChange(newCount)
    }
}
