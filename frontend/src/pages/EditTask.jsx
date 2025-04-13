import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await api.get(`/tasks/${id}`);
                setTask(res.data.task);
            } catch (err) {
                console.error('Error fetching task:', err);
                setError('No se pudo cargar la tarea');
            }
        };

        fetchTask();
    }, [id]);

    const handleChange = (field, value) => {
        setTask({ ...task, [field]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await api.put(`/tasks/${id}`, task);
            navigate('/tasks');
        } catch (err) {
            console.error('Error updating task:', err);
            setError(
                err.response?.data?.message || 'Error al actualizar la tarea'
            );
        }
    };

    if (!task) return <p>Cargando tarea...</p>;

    return (
        <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
            <h2>Editar tarea</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    value={task.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                />
                <textarea
                    value={task.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={4}
                />
                <input
                    type="date"
                    value={task.deadline.split('T')[0]} // ajustar fecha
                    onChange={(e) => handleChange('deadline', e.target.value)}
                    required
                />
                <select
                    value={task.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                >
                    <option value="PENDING">Pendiente</option>
                    <option value="IN_PROGRESS">En progreso</option>
                    <option value="COMPLETED">Completada</option>
                </select>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    );
}

export default EditTask;
