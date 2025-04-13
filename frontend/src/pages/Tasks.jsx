import { useEffect, useState } from 'react';
import api from '../api/api';
import TaskList from '../components/TaskList';
import { Link } from 'react-router-dom';

function Tasks() {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchTasks = async () => {
    try {
        const res = await api.get('/tasks');
        setTasks(res.data.tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    } finally {
        setLoading(false);
    }
    };

    fetchTasks();
}, []);

if (loading) return <p>Cargando tareas...</p>;

return (
    <div style={{ padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%', }}>
    <h2>Mis tareas</h2>
    <Link to="/tasks/new">
            <button style={{ marginBottom: '1rem' }}>➕ Nueva tarea</button>
            </Link>
    {tasks.length > 0 ? (
        <TaskList tasks={tasks} />
    ) : (
        <p>No hay tareas disponibles.</p>
    )}
    </div>
    
);
}

export default Tasks;
