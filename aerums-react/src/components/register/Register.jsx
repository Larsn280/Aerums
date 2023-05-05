import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onHandleEmailTextChanged = (e) => {
    setEmail(e.target.value);
  };

  const onHandlePasswordTextChanged = (e) => {
    setPassword(e.target.value);
  };

  const onHandleFirsNameTextChanged = (e) => {
    setFirstName(e.target.value);
  }

  const onHandleLastNameTextChanged = (e) => {
    setLastName(e.target.value);
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_BASEURL}/auth/register`;

    const user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
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
      navigate("/login");
    } else {
      console.log("Det gick inte att registrera dig...");
    }
  };

  return (
    <>
      <h1 className="page-title">Registrera</h1>
      <section className="form-container">
        <h4>Användar info</h4>
        <section className="form-wrapper">
          <form className="form" onSubmit={handleRegister}>
            <div className="form-control">
              <label className="userName" htmlFor="Email">E-mail</label>
              <input
                onChange={onHandleEmailTextChanged}
                value={email}
                type="text"
                id="email"
                name="email"
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
              />
            </div>
            <div className="form-control">
                <lable htmlFor="FirstName">Förnamn</lable>
                <input
                onChange={onHandleFirsNameTextChanged}
                value={firstName}
                type="text"
                id="firstName"
                name="firstName"
                />
            </div>
            <div className="form-control">
                <lable htmlFor="LastName">Efternamn</lable>
                <input
                onChange={onHandleLastNameTextChanged}
                value={lastName}
                type="text"
                id="lastName"
                name="lastName"
                />
            </div>
            <div className="buttons">
              <button type="submit" className="greenBtn">
                Registrera
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
}

export default Register;
