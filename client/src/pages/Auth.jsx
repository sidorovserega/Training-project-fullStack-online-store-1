import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import {REGISTRATION_ROUTE , LOGIN_ROUTE, SHOP_ROUTE} from '../utils';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { registration, login, check } from "../http/userAPI";
import { observer } from "mobx-react-lite";

const Auth = observer(() => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    //Задаем для последующего перехода по URL
    const navigate = useNavigate();
    //Достаем объект user из глобального контекста 
    const {user} = useContext(Context);

    //состояние для регистрации и авторизации
    const [email, setEmail] = useState('');
    const [password, setPasswors] = useState('');
    //Функция для авторизации и регистрации универсальная
    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);    
            } else {
                data = await registration(email, password);
            }  
            user.setUser(data);
            user.setIsAuth(true);
        } catch (e) {
            //если ошибка авторизации или иная ошибка выводим сообщение об ошибке
            alert(e.response.data.message);
        }
    }

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите Ваш email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите Ваш пароль..."
                        type="password"
                        value={password}
                        onChange={(e) => setPasswors(e.target.value)}
                    />
                    <Row className="d-flex justify-content-between">
                        {isLogin
                        ? 
                            <div>
                                Нет аккаунта? 
                                <nav>
                                    <Link to={REGISTRATION_ROUTE} style={{color: "green"}}>Зарегистрируйся!</Link>
                                </nav>
                            </div>
                        :
                            <div>
                                Есть аккаунт? 
                                <nav>
                                    <Link to={LOGIN_ROUTE} style={{color: "green"}}>Войдите!</Link>
                                </nav>
                            </div>
                        }
                        <Button 
                            variant={"outline-success"}
                            onClick={() => {
                                click();    
                            }}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                    
                </Form>
            </Card>
            
        </Container>
    );
});

export default Auth;