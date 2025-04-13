// src/components/TaskCard.jsx
import { Link } from "react-router-dom";
import api from "../api/api";
import styles from "../styles/TaskCard.module.css";

function TaskCard({ task }) {
    const { id, title, description, status, deadline } = task;

    const handleDelete = async () => {
        if (!confirm("¿Estás seguro de eliminar esta tarea?")) return;

        try {
            await api.delete(`/tasks/${id}`);
            window.location.reload(); //PENDIENTEEEE: Se tiene que recargar para ver el cambio.
        } catch (err) {
            console.error("Error al eliminar la tarea:", err);
            alert("Error al eliminar la tarea");
        }
    };

    return (
        <div className={styles.card}>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>
                <strong>Estado:</strong> {status}
            </p>
            <p>
                <strong>Fecha límite:</strong> {new Date(deadline).toLocaleDateString()}
            </p>

            <Link to={`/tasks/${id}/edit`}>
                <button style={{ marginTop: "0.5rem" }}>✏️ Editar</button>
            </Link>

            {status === "COMPLETED" && (
                <button
                    onClick={handleDelete}
                    style={{
                        marginTop: "0.5rem",
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        padding: "0.5rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    🗑️ Eliminar
                </button>
            )}
        </div>
    );
}

export default TaskCard;
