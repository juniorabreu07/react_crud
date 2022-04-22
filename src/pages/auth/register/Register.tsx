import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom';

import AuthCard from '../components/AuthCard';
import { User } from '../../../interfaces/User';
import { ApiService } from '../../../services/ApiService';

const Register = () => {
  const inititalState = { username: '', password: '', apellidos: "", nombres: "", email: "" };

  type HandleInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  const titleInput = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User>(inititalState);
  const [error, setError] = useState<Boolean>(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): any => {
    e.preventDefault();
    titleInput.current?.focus();
    signIn(user);
  }



  let history = useNavigate()
  const signIn = async (user: User) => {
    await ApiService.post("/api/v1/auth/signup", user).then((res) => {
      setError(false);
      setMsg(res.data.message);
      history('/login');
    }).catch(error => {
      setError(true);
      const data = JSON.parse(error.request.response);
      setMsg(data.message);
    });

  }

  const handleInputChange = ({ target: { name, value } }: HandleInputChange) => {
    setUser({ ...user, [name]: value });
  }
  return (
    <AuthCard>

      <form className="login-form" onSubmit={handleSubmit}>
        {error ? <div className="alert alert-primary" role="alert">
          {msg}
        </div> : null
        }
        <div className="d-grid gap-2 text-center">
          <h3>Register</h3>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder="ex: jhondoe"
            onChange={handleInputChange}
            value={user.username} />
        </div>
        <div>
          <label htmlFor="nombres">Nombres</label>
          <input type="text" id="nombres" name="nombres" placeholder="ex: Juan " onChange={handleInputChange}
            value={user.nombres} />
        </div>
        <div>
          <label htmlFor="apellidos">Apellidos</label>
          <input type="text" id="apellidos" name="apellidos" placeholder="ex: Perez" onChange={handleInputChange}
            value={user.apellidos} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="ex: email@mail.com" onChange={handleInputChange}
            value={user.email} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" onChange={handleInputChange}
            value={user.password} />
        </div>
        <div>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm password" />
        </div>

        <div className="d-grid gap-2">
          <button type="submit">
            Sign Up
          </button>
        </div>

      </form>

    </AuthCard>
  )
}
export default Register
