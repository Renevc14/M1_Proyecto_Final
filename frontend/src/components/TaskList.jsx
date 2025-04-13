// src/components/TaskList.jsx
import TaskCard from "./TaskCard";
import styles from "../styles/TaskList.module.css";

function TaskList({ tasks, onDelete }) {
    return (
        <div className={styles.grid}>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default TaskList;
