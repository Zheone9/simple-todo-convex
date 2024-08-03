import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { ConvexProvider, ConvexReactClient } from "convex/react"
import { Toaster } from "./components/ui/toaster.tsx"
import { App } from "./App.tsx"
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </ConvexProvider>
  </React.StrictMode>
)
