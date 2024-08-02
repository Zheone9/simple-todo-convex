import type { Welcome } from "./interfaces"
import { useQuery } from "react-query"
import axios from "axios"

const apiUrl = "https://rickandmortyapi.com/api"

async function fetchCharacters() {
  const response = await axios.get<Welcome>(`${apiUrl}/character`)
  console.log(response)
  return response.data
}

export function useGetCharacters() {
  return useQuery<Welcome, Error>({
    queryKey: ["characters"],
    queryFn: fetchCharacters // Llama a la función fetchCharacters
  })
}
