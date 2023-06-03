import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import MyButton from "./MyButton";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
    const {setLoggedIn} = useContext(AuthContext);

    const logout = () => {
        setLoggedIn(false);
        localStorage.removeItem("web-lab-4-username");
        localStorage.removeItem("web-lab-4-authorization");
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <NavLink to={"/main"}>
                <MyButton type="button">
                    На главную
                </MyButton>
            </NavLink>
            <NavLink to={"/about"}>
                <MyButton type="button">
                    О сайте
                </MyButton>
            </NavLink>
        </div>
    );
};

export default Navbar;