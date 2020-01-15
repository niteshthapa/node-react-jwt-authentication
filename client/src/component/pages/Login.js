import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';
const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { login, isAuthenticated, loading, setLoading, unsetLoading } = authContext;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard')
    }
  }, [isAuthenticated, props.history])
  let initialState = {
    email: "",
    password: "",
  }
  const [state, setState] = useState(initialState);
  const [loginError, setError] = useState([]);
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError(setError => []);
    try {
      const result = await axios.post("/api/auth", state);
      login(result)
      props.history.push('/dashboard')
    } catch (error) {
      console.log(error)
      console.log(error.response.data.error)
      Object.values(error.response.data.error).forEach(obj => {
        setError(loginError => [...loginError, obj]);
      })
      unsetLoading(false)
    }
  };
  return (
    <div className="card">
      <div className="card-header font-weight-bold">Login Employee</div>
      <div className="card-body">
        {loginError.length !== 0 && (
          <div className="alert alert-danger p-2 m-0">
            {
              loginError.map((obj, index) =>

                <p key={index} className="mb-0">{obj.msg}</p>

              )
            }
          </div>

        )}
        <form onSubmit={onSubmit} noValidate>
          <div className="form-group">
            <label>Email address:</label>
            <input type="email" onChange={onChange} className="form-control" placeholder="Enter email" name="email" />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" onChange={onChange} className="form-control" placeholder="Enter password" name="password" />
          </div>
          
          <button type="submit"  className="btn btn-primary">
          {loading && (
            <i class='fa fa-spinner fa-spin'></i>

          )}
          Submit</button>
        </form>
      </div></div>

  )
}
export default Login;