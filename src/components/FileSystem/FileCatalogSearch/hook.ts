import {useEffect, useState} from "react";

export function useDebounce(value: string, delay: number = 300): string{
    const [debounce, setDebounce] = useState<string>(value)
    useEffect(() => {
        const temp = setTimeout(() => setDebounce(value), delay)
        return () => clearTimeout(temp)
    }, [value])
    return debounce
}