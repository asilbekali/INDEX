import { useContext } from "react";
import "./App.css";
import { Context } from "./context/UserContext";
import AuthRoute from "./routes/AuthRoute";
import DashboardLayout from "./features";

function App() {
    const { token, isLoading } = useContext(Context);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return token ? <DashboardLayout /> : <AuthRoute />;
}

export default App;
