import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';
import AuthContext from '../../context/auth/authContext';

 const Register = (props) => {
  const authContext = useContext(AuthContext);

  const {isAuthenticated} = authContext;
   let initialState = {
    name:"",
    email:"",
    password:"",
  } 
   const [state,setState] = useState(initialState);
   const [loginError,setError] = useState([]);
    const onChange = (e) => {
       setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
if(isAuthenticated){
  if(isAuthenticated){
    props.history.push('/dashboard')
  }
}
  },[isAuthenticated,props.history])
   const onSubmit = async(e) => {
    e.preventDefault();
    setError(setError => []);
     try {
      const result = await axios.post("/api/users",state);
       console.log(result)
     } catch (error) {
       Object.values(error.response.data.error).forEach(obj=>{
                setError(loginError => [...loginError, obj]);
       })
    }
  };
    return (
      <div className="card">
  <div className="card-header  font-weight-bold">Register New Employee</div>
  <div className="card-body">
{loginError.length !== 0 && (
  loginError.map((obj,index)=>{
    return(<div className="alert alert-danger" key={index}>
    {obj.msg}
      </div>
    )
  })
)}
      <form  onSubmit={onSubmit} noValidate>
      <div className="form-group">
        <label >Name</label>
        <input type="name"  className="form-control" onChange={onChange} placeholder="Enter Name" name="name" />
      </div>
      <div className="form-group">
        <label >Email address:</label>
        <input  type="email" className="form-control" onChange={onChange} placeholder="Enter email" name="email" />
      </div>
      <div className="form-group">
        <label >Password:</label>
        <input  type="password" className="form-control" onChange={onChange} placeholder="Enter password" name="password" />
      </div>
     
     
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div></div>
        
        
    )
}
export default Register;