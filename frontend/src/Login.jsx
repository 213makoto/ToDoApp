import { useState } from "react";
import "./Login.css";

function Login({ setUserId, onSignup }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
      }),
    });

  const data = await response.json();
  console.log(data);

    if (data.success) {
      console.log("user_id =",data.user_id);
      
      localStorage.setItem("user_id", data.user_id);
      setUserId(data.user_id);
    }
    else {
      setError("ユーザー名またはパスワードが違います");
    }
  };

  return (
    <div className="login-container">
     <div className="login-card">
       <h2>ログイン</h2>

       <input
         type="text"
         placeholder="ユーザー名"
         value={name}
         onChange={(e) => setName(e.target.value)}
       />

       <input
         type="password"
         placeholder="パスワード"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
       />
       {error && (<p className="error-message">{error}</p>)}
       <button className = "login-btn" onClick={handleLogin}>ログイン</button>
       <button className = "signup-btn" onClick={onSignup}>アカウント作成</button>
       
     </div>
    </div>
  );
}

export default Login;