import {createRoot} from "react-dom/client"
import {App} from "./app"
import {BrowserRouter} from "react-router-dom"
import {QueryClient, QueryClientProvider} from "react-query"

const queryClient = new QueryClient()

const root = createRoot(document.getElementById("root") as HTMLDivElement)
root.render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QueryClientProvider>,
)
