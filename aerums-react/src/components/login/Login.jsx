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
    // console.log(e.target.name);
    setUserName(e.target.value);
  };

  const onHandlePasswordTextChanged = (e) => {
    // console.log(e.target.name);
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_BASEURL}/auth/login`;
    // console.log(url);

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

    // console.log(response);

    if (response.status >= 200 && response.status <= 299) {
      const result = await response.json();
      localStorage.setItem("token", JSON.stringify(result.token));
      // console.log(JSON.stringify(result));

      const accessToken = result.token;

      setAuth({ userName, password, accessToken });
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
