import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/login" />} />
      <Route path="/tasks/new" element={isAuthenticated ? <CreateTask /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/tasks" />} />
      <Route path="/tasks/new" element={isAuthenticated ? <CreateTask /> : <Navigate to="/login" />}/> 
      <Route path="/tasks/:id/edit"  element={isAuthenticated ? <EditTask /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
