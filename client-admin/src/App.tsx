import { Layout } from "@app/layout";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () =>  {
    const theme = useSelector((state:any) => state.config.theme);

    return (
      <div className={`w-full h-screen ${theme ? 'bg-light-primary text-dark-primary' : 'bg-dark-primary text-light-primary'}`}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </div>
  )
}

export default App
