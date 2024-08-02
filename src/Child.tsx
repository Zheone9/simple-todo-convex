import type React from "react"
import { useGetCharacters } from "./queries/getTodos"
import { Loading } from "./components/Loading"
import { Gender } from "./queries/interfaces"
import { useQuery } from "convex/react"
import { api } from "../convex/_generated/api"

type ChildProps = {
  first: number
  setFirst: React.Dispatch<React.SetStateAction<number>>
}

export function Child(props: ChildProps) {
  const { first, setFirst } = props
  const { data, isLoading, isError, error } = useGetCharacters()
  const tasks = useQuery(api.tasks.get)

  if (isLoading) return <Loading />
  if (isError) return <p>Error: {error.message}</p>

  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Gender</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {data?.results.map((result) => {
              return (
                <tr key={result.id}>
                  <td>{result.name}</td>
                  <td>{result.location.name}</td>
                  <td>{result.gender}</td>
                  {result.gender === Gender.Female && <td>es mujer</td>}
                  <td>{new Date(result.created).toLocaleDateString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {tasks?.map(({ _id, text }) => (
          <div key={_id}>{text}a</div>
        ))}
      </div>
    </>
  )
}
