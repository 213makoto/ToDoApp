import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  toggleTask,
  deleteTask,
  updateTask,
}) {
  return (
    <>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
    </>
  );
}

export default TaskList;