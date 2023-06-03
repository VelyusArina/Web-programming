import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {privateRoutes, publicRoutes} from "../routes/routes";

const AppRouter = () => {
    const {loggedIn} = useContext(AuthContext);
    return (
        <div className="main_container">
            {
                loggedIn
                    ?
                    <Routes>
                        {privateRoutes.map((route) =>
                            <Route key={route.path} path={route.path} element={route.element}/>
                        )}
                        <Route path="/*" element={<Navigate to="/main"/>}/>
                    </Routes>
                    :
                    <Routes>
                        {publicRoutes.map((route) =>
                            <Route key={route.path} path={route.path} element={route.element}/>
                        )}
                        <Route path="/*" element={<Navigate to="/login"/>}/>
                    </Routes>
            }
        </div>
    );
};

export default AppRouter;