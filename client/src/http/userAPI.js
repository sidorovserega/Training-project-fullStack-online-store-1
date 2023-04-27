import { $authHost, $host } from ".";
import jwt_decode from 'jwt-decode';

//в ответ получаем токен или сведения об ошибке
export const registration = async (email, password) => {
    const {data} = await $host.post(`api/user/registration`, {email, password, role: 'ADMIN'});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}
//в ответ получаем токен или сведения об ошибке
export const login = async (email, password) => {
    const {data} = await $host.post(`api/user/login`, {email, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}
//проверка токена на валидность
//укаждый раз при обновлении страуницы будет проверяться токен через данную функцию
//если токен не валидный, то пользователь раздогинится
export const check = async () => {
    const {data} = await $authHost.get(`api/user/auth`);
    localStorage.getItem('token', data.token);
    return jwt_decode(data.token);
}