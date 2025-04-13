import styles from '../styles/TaskCard.module.css';
import { Link } from 'react-router-dom';

function TaskCard({ task }) {
    const { title, description, status, deadline } = task;

    return (
        <div className={styles.card}>
            <h3>{title}</h3>
            <p>{description}</p>
            <p><strong>Estado:</strong> {status}</p>
            <p><strong>Fecha límite:</strong> {new Date(deadline).toLocaleDateString()}</p>

            <Link to={`/tasks/${task.id}/edit`}>
                <button style={{ marginTop: '0.5rem' }}>✏️ Editar</button>
            </Link>
        </div>
    );
}

export default TaskCard;
