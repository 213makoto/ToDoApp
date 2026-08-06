function TaskForm({ title, setTitle, createTask }) {
  return (
    <div className="task-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createTask}>
        追加
      </button>
    </div>
  );
}

export default TaskForm;