import { useEffect, useState } from "react";
import { getUsers } from "./api/userApi";
import { getTasksByUser,} from "./api/taskApi";
import Login from "./Login";
import Signup from "./Signup";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";
import UserSelector from "./components/UserSelector";
import { getTasks, createTask as createTaskAPI,deleteTask as deleteTaskAPI,updateTask as updateTaskAPI,} from "./api/taskApi";
import "./App.css";


function App() {
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [isSignup, setIsSignup] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(Number(localStorage.getItem("user_id")));
  
  const loadTasks = async () => {
  const data = await getTasksByUser(selectedUserId);
  setTasks(data);
  };

  useEffect(() => { loadUsers(); }, []);
  useEffect(() => { loadTasks(); }, [selectedUserId]);
  useEffect(() => {
    if (userId) {
      setSelectedUserId(Number(userId));
    }
  }, [userId]);

  const createTask = async () => {
    await createTaskAPI({
  		title,
  		done: false,
  		user_id: selectedUserId,
  });

    setTitle("");
    loadTasks();
  };
  
  const deleteTask = async (id) => {
  	await deleteTaskAPI(id);
  loadTasks();
  };

  const toggleTask = async (task) => {
  await updateTaskAPI(
    task.id,
    task.title,
    !task.done
  );
  loadTasks();
  };
  const editTask = async(id, title, done) => {
    await updateTaskAPI(id,title,done);
    loadTasks();
  };

  const loadUsers = async () => {
  const data = await getUsers();
  setUsers(data);
  };
  const handleLogout = () => {
  localStorage.removeItem("user_id");
  setUserId(null);
  };
  const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchText.toLowerCase()));

  if(!userId){
    if(isSignup) {
      return(<Signup onBack={() => setIsSignup(false)} /> );
    }
    return (<Login setUserId={setUserId} onSignup={() => {console.log("signup!");setIsSignup(true)}}/> );
  }
  return(
    <div className="app">
      <h1>Todo App</h1>
      <button className="logout-btn" onClick={handleLogout}>ログアウト</button>
    
    <input type="text" placeholder="タスクを検索..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className="search-input"/>
    <TaskForm
		title={title}
		setTitle={setTitle}
		createTask={createTask}
	/>

	<TaskList
  		tasks={filteredTasks}
  		toggleTask={toggleTask}
  		deleteTask={deleteTask}
  		updateTask={editTask}
	/>

    </div>
);
}

export default App;