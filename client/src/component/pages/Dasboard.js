import React, {  useEffect, useContext } from 'react';
import AuthContext from "../../context/auth/authContext";
const Dashboard = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      hhdfh
      </>
  )
}
export default Dashboard;