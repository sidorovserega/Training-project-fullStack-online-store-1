//декодируем токен и проверяем авторизацию пользователя
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //пропускаем метод OPTIONS, пропускаем только методы get, post, put, delete
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        //декодируем токен и проверяем его на валидность в данном middleware
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: "Не авторизован"});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({message: "Не авторизован"});
    }
}