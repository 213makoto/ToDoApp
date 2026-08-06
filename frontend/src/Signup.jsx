import { useState } from "react";

function Signup({ onBack }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSignup = async () => {
    
    if (!name || !password || !confirmPassword) {
      alert("すべて入力してください");
      return;
    }
    if (password !== confirmPassword) {
      alert("パスワードが一致しません");
      return;
    }
    const response = await fetch("http://localhost:8000/users",
    {method: "POST",
     headers: {"Content-Type": "application/json",},
     body: JSON.stringify({name,password,}),
    });
     const data = await response.json();
     console.log(data);
     if(data.success) {
       alert("登録完了!");
       onBack();
     }else {
       alert(data.message);
     }
   };
  return (
    <div className="login-container">
      <div className="login-card">

        <h2>アカウント作成</h2>
        <p className ="subtitle">新しいアカウントを作成しましょう</p>
        <input type="text" placeholder="ユーザー名" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <p className="input-label">パスワード確認</p>
        <input type="password" placeholder="パスワード確認" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        <div className = "btn-group">
          <button className = "signup-btn" onClick = {handleSignup}>登録</button>
          <button className = "back-btn" onClick={onBack}>ログイン画面へ戻る</button>
        </div>  
      </div>
    </div>
  );
}

export default Signup;