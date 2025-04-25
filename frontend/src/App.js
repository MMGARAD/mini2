import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import GuideMain from './pages/Guide/GuideMain';
import GuidePreference from './pages/Guide/GuidePreference';
import AddPreference from './pages/Guide/AddPreference';
import ViewPreference from './pages/Guide/ViewPreference';
import FilteredView from './pages/Guide/FilteredView';
import AddUser from './pages/AddUser';

const ProtectedLayout = () => (
  <>
    <Sidebar />
    <div className="main-content">
      <Outlet />
    </div>
  </>
);

function App() {
  const isAuthenticated = !!localStorage.getItem('isLoggedIn');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {isAuthenticated ? (
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/guide" element={<GuideMain />} />
            <Route path="/guide/preference" element={<GuidePreference />} />
            <Route path="/guide/preference/add" element={<AddPreference />} />
            <Route path="/guide/preference/view" element={<ViewPreference />} />
            <Route path="/guide/preference/view/:year" element={<FilteredView />} />
            <Route path="/add-user" element={<AddUser />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;