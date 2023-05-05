import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/calendar";

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onHandleUserNameTextChanged = (e) => {
    setUserName(e.target.value);
  };

  const onHandlePasswordTextChanged = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_BASEURL}/auth/login`;

    const user = {
      userName: userName,
      password: password,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status >= 200 && response.status <= 299) {
      const result = await response.json();
      localStorage.setItem("token", JSON.stringify(result.token));

      const accessToken = result.token;

      setAuth({ userName });
      setUserName("");
      setPassword("");
      navigate(from, { replace: true });
    } else {
      console.log("Det gick inte att logga in");
    }
  };

  return (
    <>
      <h1 className="page-title">Logga In</h1>
      <section className="form-container">
        <h4>Användar info</h4>
        <section className="form-wrapper">
          <form className="form" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="userName" htmlFor="userName">E-mail </label>
              <input
                onChange={onHandleUserNameTextChanged}
                value={userName}
                type="text"
                id="userName"
                name="userName"
                autoComplete="off"
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Lösenord</label>
              <input
                onChange={onHandlePasswordTextChanged}
                value={password}
                type="password"
                id="password"
                name="password"
                autoComplete="off"
              />
            </div>
            <div className="buttons">
              <button type="submit" className="greenBtn">
                Logga In
              </button>
            </div>
            <p>Inte medlem än?</p>
            <Link to={"/register"}>
              <p>Klicka här!</p>
            </Link>
          </form>
        </section>
      </section>
    </>
  );
}

export default Login;
