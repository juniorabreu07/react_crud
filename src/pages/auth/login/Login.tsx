import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import { ApiService } from '../../../services/ApiService';
import { User } from '../../../interfaces/User';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
const Login = () => {

  const inititalState = {
    email: "",
    password: "",
  };
  let navigate = useNavigate()
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

  const signIn = async (user: User) => {
    await ApiService.post("/api/v1/auth/signin", user).then((res) => {
      setError(true);
      setMsg("Welcome");
      ApiService.setCurrentUser(res.data.data);

      setError(false);
      navigate("/products");
    }).catch(error => {
      setError(true);
      const data = JSON.parse(error.request.response);
      console.log("data", data)
      setMsg(data.data.message);
    });
  }
  useEffect(() => {
    if (ApiService.getCurrentUser() != null) {
      navigate("/products");
    }
  }, []);

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
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Ex: jhondae@mail.com"
            name="email"
            onChange={handleInputChange}
            value={user.email}
            // className="form-control mb-3 rounded-0 shadow-none border-0"
            autoFocus
            ref={titleInput}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            value={user.password}
            // className="form-control mb-3 rounded-0 shadow-none border-0"
            autoFocus
            ref={titleInput}
          />
        </div>


        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </div>

        <div className="mt-3 mb-3 text-center">
          <h6>Don´t have an account</h6>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </AuthCard>
  )
}

export default Login