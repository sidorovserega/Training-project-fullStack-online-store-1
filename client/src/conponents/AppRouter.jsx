import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import Shop from "../pages/Shop";
import { Context } from "..";
import { observer } from "mobx-react-lite";
//Компонент устанавливает по какой ссылке можно перейти в зависимости от авторизации пользователя
const AppRouter = observer(() => {

    const {user} = useContext(Context);
    
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, component}) => 
                <Route path={path} element={component} key={path}/>
            )}
            {publicRoutes.map(({path, component}) => 
                <Route path={path} element={component} key={path}/>
            )}
            <Route path='*' element={<Shop/>}/>
        </Routes>
    );
});

export default AppRouter;