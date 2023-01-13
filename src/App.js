
import './App.css';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { Postpp } from './pages/Postpp';
import { Dashboard } from './pages/Dashboard';
import { Dashbodyuserproperty } from "./component/Body/Dashbodyuserproperty";
import { Dashbodysubsidizedhome } from "./component/Body/Dashbodysubsidizedhome";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./contex/AuthContext"
import { useContext } from "react";
import { Header } from './component/HEADER/Header';
import { Foot } from './component/FOOTER/Foot';

function App() {
  const currenUser = useContext(AuthContext);

  const ProtectesRoute = ({ children }) => {
    if (!currenUser) {
      return <Navigate to="/login" />
    }
    return children;
  }

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<ProtectesRoute>
    <Header/>
          <Home />
          <Foot/>
        </ProtectesRoute>} />
        <Route path="/post" element={<ProtectesRoute>
          <Header/>
          <Postpp />
          <Foot/>
        </ProtectesRoute>} />
        <Route path="/dashboard" element={<ProtectesRoute>
          <Header/>
          <Dashboard />
          <Foot/>
        </ProtectesRoute>} />
        
       
        

        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/post" element={<Postpp />} />
        <Route exact path="/dashboard" element={<>
        <Header/>
        <Dashboard />
        </>
        }>
          <Route path="/dashboard/property" element={<ProtectesRoute>
          <Dashbodyuserproperty/>
        </ProtectesRoute>} />

        <Route path="/dashboard/rental-property" element={<ProtectesRoute>
          <Dashbodysubsidizedhome/>
        </ProtectesRoute>} />
        
          <Route exact path="/dashboard/property" element={<Dashbodyuserproperty />} />
          <Route exact path="/dashboard/rental-property" element={<Dashbodysubsidizedhome />} />
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
