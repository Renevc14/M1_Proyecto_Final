import TaskCard from './TaskCard';

function TaskList({ tasks }) {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
