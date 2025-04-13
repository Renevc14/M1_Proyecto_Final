import styles from '../styles/TaskCard.module.css';

function TaskCard({ task }) {
  const { title, description, status, deadline } = task;

  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p><strong>Estado:</strong> {status}</p>
      <p><strong>Fecha límite:</strong> {new Date(deadline).toLocaleDateString()}</p>
    </div>
  );
}

export default TaskCard;
