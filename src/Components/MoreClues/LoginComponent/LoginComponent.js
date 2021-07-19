import React, { useState, useRef, useEffect } from 'react'
import OrangeButton from '../../Atoms/OrangeButton/OrangeButton';
import styles from './LoginComponent.module.scss'
import {  motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import {useAuth} from '../../../Context/AuthProvider'
import {useLoader} from '../../../Context/LoaderProvider'
function LoginScreen() {
    const [signUpScreen, setSignUpScreen]= useState(false);
    const [forgotPassword, setForgotPassword]= useState(false);
    const [username, setUsername]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    const [spanEmail, setSpanEmail]= useState("");
    const [spanUsername, setSpanUsername]= useState("");
    const [spanPassword, setSpanPassword]= useState("");
    const [spanConfirmPassword, setSpanConfirmPassword]= useState("");
    const { signup, login, currentUser, logout, setCurrentUser, resetPassword } = useAuth();
    const { turnOnLoader, turnOffLoader }= useLoader();
    const handleSwitch = () =>{
        setSpanConfirmPassword("");
        setSpanUsername("");
        setSignUpScreen(!signUpScreen);
        
    }
    const handleSignUp = () => {
        checkvalid("email");
        checkvalid("password");
        checkvalid("username");
        checkvalid("confirmpassword");
        if(spanEmail !== "" || spanPassword !== "" || spanConfirmPassword !== "" || spanUsername !== "") 
            return ;
        turnOnLoader();
        signup(email, password)
            .then(() => {
                turnOffLoader();
                console.log("signUp");
                setSignUpScreen(false);
                })
            .catch(err => {
            setSpanEmail("Email already in use");
            turnOffLoader();
        })
  
        
    }
    const handleLogin = async() => {
        turnOnLoader();
        login(email, password)
            .then(async (res) => {
                setCurrentUser(res);
                console.log("login");
                console.log(currentUser.user.uid);
                window.localStorage.setItem("user", JSON.stringify(currentUser));
                turnOffLoader();
            })
            .catch(err => {
                turnOffLoader();
                if(err.code === "auth/user-not-found"){
                    setSpanEmail("Email not found");
                    setSpanPassword("");
                    return;
                }
                setSpanPassword("Wrong password");
                setSpanEmail("");
                // console.log(errc)
            });

    
    }

    const checkvalid = (type) => {
        switch (type){
            case "email":
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!re.test(String(email).toLowerCase()))
                    setSpanEmail("Email not valid");
                else setSpanEmail("");
                break;
            case "password":
                if(password.length < 6){
                    setSpanPassword("Must Contain at Least 6 characters and an Uppercase");
                    break;
                }
                let x= false;
                for(let i = 0; i < password.length; i++)
                    if(password[i]<="Z" && password[i] >="A"){
                        x= true;
                        break;
                    }
                if(!x)
                    setSpanPassword("Must Contain at Least 6 characters and an Uppercase");
                break;
            case "confirmpassword":
                if(password !== confirmPassword)
                    setSpanConfirmPassword("Confirm and password must be the same");
                break;
            case "username":
                if(username === "")
                setSpanUsername("Username not valid");
                    break;
        }
    }
    const history= useHistory();
    const setForgotPasswordScreen = () => {
        if(!forgotPassword)
            setSpanEmail("Enter email to reset Password");
        else
            setSpanEmail("");
        setForgotPassword(!forgotPassword);
        
    }
    const handleForgotPassword = () => {
        checkvalid("email");
        if(spanEmail !== "") return;
        alert("Sended, please check your email");
        resetPassword(email);
    }
    return (<>
        {
            !forgotPassword?
<motion.div 
            initial= {{ opacity: 0.4, y: -100}}
            animate= {{ opacity: 1, y: 0}}
            className={styles.mainComponent}>
                <input  type="text" 
                        placeholder="email" 
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        className={spanEmail !== "" ?styles.input_warn : styles.input} 
                        onBlur={() =>checkvalid("email")} 
                        onFocus={()=>setSpanEmail("")}/>
                <span className={styles.span}>{spanEmail}</span>
                <div className={signUpScreen?styles.visible: styles.notvisible}>
                    <input  type="text"
                            placeholder="username" 
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                            className={spanUsername !== "" ?styles.input_warn : styles.input} 
                            onBlur={() =>checkvalid("username")} 
                            onFocus={()=>setSpanUsername("")}/>       
                    
                </div>
                <span className={styles.span} style={{marginTop: -20}}>{spanUsername}</span>
                <input  type="password" 
                        placeholder="password" 
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        className={spanPassword !== "" ?styles.input_warn : styles.input} 
                        onBlur={() =>checkvalid("password")} 
                        onFocus={()=>setSpanPassword("")}/>
                <span className={styles.span}>{spanPassword}</span>
                <div className={signUpScreen?styles.visible: styles.notvisible}>
                    <input  type="password"
                            placeholder="confirm password" 
                            onChange={e => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            className={spanConfirmPassword !== ""? styles.input_warn : styles.input} 
                            onBlur={() =>checkvalid("confirmpassword")} 
                            onFocus={()=>setSpanConfirmPassword("")}/>
                    
                </div>
                <span className={styles.span} style={{marginTop: -20}}>{spanConfirmPassword}</span>
                
                <div className={styles.footer}>
                    {
                        forgotPassword||!signUpScreen?
                        <p className={styles.forgotpassword} onClick={setForgotPasswordScreen}>Forgot password?</p>:
                        <div/>
                    }
                    <OrangeButton size="medium" text={signUpScreen?"Sign Up":"Log In"} action={signUpScreen? handleSignUp: handleLogin}/>
                    <p className={styles.descript}>
                        <span>
                            {signUpScreen?"Already have an account, ":"Don't have an account, "}
                        </span>
                        <span className={styles.signUp} onClick={()=>handleSwitch()}>
                            {signUpScreen?"Sign In":"Sign Up"}
                        </span> now.
                    </p>
                </div>
        </motion.div>:
        <motion.div 
        initial= {{ opacity: 0.4, y: -100}}
        animate= {{ opacity: 1, y: 0}}
        className={styles.mainComponent}>
            <input  type="text" 
                    placeholder="email" 
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    className={spanEmail !== "" ?styles.input_warn : styles.input} 
                    onBlur={() =>checkvalid("email")} 
                    onFocus={()=>setSpanEmail("")}/>
            <span className={styles.span}>{spanEmail}</span>
            <div className={styles.footer}>
                    <p className={styles.forgotpassword} onClick={setForgotPasswordScreen}>Turn back</p>:
                <OrangeButton size="medium" text={"Send Email"} action={handleForgotPassword}/>
                <p className={styles.descript}>
                    <span>
                        {"Already have an account, "}
                    </span>
                    <span className={styles.signUp} onClick={setForgotPasswordScreen}>
                        Sign In
                    </span> now.
                </p>
            </div>
    </motion.div>
        }
        
        
        </>)
}

export default LoginScreen
