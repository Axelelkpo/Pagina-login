import { useRef } from "react";

import { useDispatch } from "react-redux";
import { setUser } from "../App/userSlice";
import { useNavigate } from "react-router-dom";

import usersData from "./users.json";

export const Index = () => {
  const emailField = useRef(null);
  const passwordField = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userToLog = usersData.users.find(
      (user) => user.email === emailField.current.value
    );

    if (userToLog) {
      if (userToLog.password === passwordField.current.value) {
        console.log("Credenciales válidas");
        dispatch(
          setUser({
            email: userToLog.email,
            fullName: `${userToLog.first_name} ${userToLog.last_name}`,
            token: Date.now(),
          })
        );
        navigate("/home");
      } else {
        console.log("Contraseña incorrecta");
        // Puedes mostrar un mensaje al usuario indicando que la contraseña es incorrecta
      }
    } else {
      console.log("Usuario no encontrado");
      // Puedes mostrar un mensaje al usuario indicando que el usuario no existe
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <h2 className="mb-4">LOGIN FORM</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" ref={emailField} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              ref={passwordField}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
