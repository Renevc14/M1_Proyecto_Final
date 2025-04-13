import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import styles from '../styles/CreateTask.module.css';


function CreateTask() {
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [deadline, setDeadline] = useState('');
const [status, setStatus] = useState('PENDING');
const [error, setError] = useState('');
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
    await api.post('/tasks', {
        title,
        description,
        deadline,
        status,
    });
    navigate('/tasks');
    } catch (err) {
    console.error('Error al crear tarea:', err);
    setError('Error al crear la tarea');
    }
};

return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
    <h2>Nueva tarea</h2>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        />
        <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        />
        <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="PENDING">Pendiente</option>
        <option value="IN_PROGRESS">En progreso</option>
        <option value="COMPLETED">Completada</option>
        </select>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Crear tarea</button>
    </form>
    </div>
    </div>
    );
}

export default CreateTask;
