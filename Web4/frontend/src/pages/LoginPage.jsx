import React, {useContext, useEffect, useState} from 'react';
import MyInput from "../components/UI/MyInput";
import MyButton from "../components/UI/MyButton";
import AuthContext from "../context/AuthContext";
import UserService from "../API/UserService";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
    const {loggedIn, setLoggedIn} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    useEffect(() => {
        console.log("Now logged in:", loggedIn);
    }, [loggedIn])

    const login = async (e) => {
        e.preventDefault();
        const p = UserService.login(username, password);
        p.then((data) => {
            if (data === true) {
                setLoggedIn(true);
                localStorage.setItem("web-lab-4-authorization", "true");
                localStorage.setItem("web-lab-4-username", username);
                setMessage("");
            } else {
                setMessage(data);
            }
        }).catch((reason) => {
            if (reason.request.status - 400 < 100) {
                setMessage("Неизвестная ошибка");
            }
        })
    }

    const register = async (e) => {
        e.preventDefault();
        const p = UserService.register(username, password);
        p.then((data) => {
            if (data === true) {
                setMessage("Регистрация прошла успешно");
            } else {
                setMessage(data);
            }
        }).catch((reason) => {
            if (reason.request.status - 400 < 100) {
                setMessage("Неизвестная ошибка");
            }
        })
    }

    const checkUsername = () => {
        if (!(password.length >= 3 && username.length >= 3))
            return false;
        const usernameRegex = /^[a-zA-Zа-яА-ЯёЁйЙ0-9_-]+$/;
        return username.match(usernameRegex) != null;
    }

    return (
        <div>
            <h1 style={{margin: 15}}>Войдите в аккаунт</h1>

            <form className={styles.login_form_input}>
                <MyInput
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    type="text"
                    placeholder="Введите логин"/>
                <br/>
                <MyInput
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    type="password"
                    placeholder="Введите пароль"/>
                <br/>
                <h4 style={{color: "red"}}>{message != null ? message : ""}</h4>
                {checkUsername() ?
                    <div className={styles.login_form_submit__wrapper}>
                        <MyButton onClick={login}>Войти</MyButton>
                        <MyButton onClick={register}>Зарегистрироваться</MyButton>
                    </div>
                    :
                    <div className={styles.login_form_submit__wrapper}>
                        <MyButton disabled onClick={login}>Войти</MyButton>
                        <MyButton disabled onClick={register}>Зарегистрироваться</MyButton>
                    </div>
                }
            </form>
        </div>
    );
};

export default LoginPage;