import TaskCard from "./TaskCard";

function TaskList({ tasks, onDelete }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1rem",
                padding: "1rem",
                width: "100%",
            }}
        >
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default TaskList;
