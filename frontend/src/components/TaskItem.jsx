import { useState } from "react";
function TaskItem({task,toggleTask,deleteTask,updateTask}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const saveEdit = () => {
    console.log("保存クリック");
    console.log(task.id,editTitle,task.done);
    updateTask(task.id,editTitle, task.done);
    setIsEditing(false);
  };
  
  return (
    <div className="task-item">
      <input type="checkbox" checked={task.done} onChange={() => toggleTask(task)}/>
      {isEditing ? ( 
      <>
      <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)}/>
        <button onClick = {saveEdit}>保存</button>
      </>
      ) : (
      <>
      <span style={{textDecoration: task.done ? "line-through" : "none",}}>{task.title}</span>
      <button onClick={() => setIsEditing(true)}>編集</button>
      </>
      )}
      <button className="delete-btn" onClick={() => deleteTask(task.id)}>削除</button>
    </div>
  );
}

export default TaskItem;