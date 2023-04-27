//
require('dotenv').config();
//
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const fileUpload = require('express-fileupload');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
//
app.use(cors());
app.use(express.json());
//указываем серверу, что файлы из папки static можно получать через localhost:5000/...
//с помощью path указываем путь до папки static
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
//установка адреса для роутинга в приложении
app.use('/api', router);

//Обработка ошибок, последний Middleware
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
}

start();

