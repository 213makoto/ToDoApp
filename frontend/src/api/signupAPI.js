const handleSignup = async () => {
  const response = await fetch(
    "http://localhost:8000/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
      }),
    }
  );

  const data = await response.json();

  console.log(data);

  if (data.success) {
    alert("登録完了！");
    onBack();
  }
};