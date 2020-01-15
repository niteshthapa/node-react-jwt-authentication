import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, SET_LOADING, UNSET_LOADING } from '../type';
const AuthtState = props => {
    const initialState = {
        isAuthenticated: localStorage.getItem("isAuthenticated"),
        user: null,
        loading: false
    }
    const [state, dispatch] = useReducer(authReducer, initialState);
    //Load user
    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        });
   }
    const unsetLoading = async () => {
        dispatch({
            type: UNSET_LOADING
        })
    }
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get("/api/auth");
            dispatch({
                type: USER_LOADED,
                payload: res.data.authUser
            });
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    };
    //LogIn
    const login = async (result) => {
        try {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: result.data.token
            }
            )
            loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL
            })
        }
    }
     //log out
    const logOut = () => {
        dispatch({
            type: LOG_OUT
        })
    }
    return (
        <AuthContext.Provider
            value={{
                setLoading: setLoading,
                unsetLoading: unsetLoading,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                loadUser,
                login,
                logOut
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthtState;
