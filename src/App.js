import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import DashboardScreen from "./components/DashboardScreen";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./components/Auth";
import "./utils/firebase";
function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <DashboardScreen />
                            </PrivateRoute>
                        }
                    />
                    <Route exact path="/" element={<HomeScreen />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
