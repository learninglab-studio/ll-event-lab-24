"use client"
import { useEffect, useState } from "react"

export default function Counter(props) {
    const [count, setCount] = useState(0)
    return(
        <div onClick={() => {
            setCount(count+1)
            
        }}>
            counter here: {count}
        </div>
    )
}