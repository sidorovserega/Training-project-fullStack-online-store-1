import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Context } from "..";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
    //Достаем объект user из глобального контекста 
    const {user} = useContext(Context);
    //Задаем функци для последующего перехода по URL
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to={SHOP_ROUTE}>КупиДевайс</NavLink>
                {user.isAuth 
                    ?
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            <Button 
                                onClick={() => navigate(ADMIN_ROUTE)}
                                variant={"outline-light"}
                            >
                                Админ. панель
                            </Button>
                            <Button
                                onClick={() => logOut()}
                                variant={"outline-light"}
                            >
                                Выйти
                            </Button>
                        </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button 
                            variant={"outline-light"} 
                            onClick={() => {
                                navigate(LOGIN_ROUTE);
                            }}
                        >
                            Авторизация
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
  );
})

export default NavBar;