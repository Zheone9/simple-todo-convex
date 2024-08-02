import { Child } from "./Child"
import { useState } from "react"

export function App() {
  const [first, setFirst] = useState<number>(1)
  return (
    <>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <Child first={first} setFirst={setFirst} />
    </>
  )
}
