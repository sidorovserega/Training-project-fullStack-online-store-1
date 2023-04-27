const {Device, DeviceInfo} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class DeviceController {
    async create (req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body;
            //требуется установка npm i express-fileupload 
            const {img} = req.files;
            //требуется установка npm i uuid для уникальных идентификаторов
            let fileName = uuid.v4() + '.jpg';
            //отдаем полученные файлы в папку static
            //dirname указывает путь до данной папки controllers
            //затем указываем путь, папку и передаваемый файл
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const device = await Device.create({name, price, brandId, typeId, img: fileName});
            //так как данные info получаем из form-data(из формы),
            //то их будем преобразовывать для передачи в формат json
            if (info) {
                info = JSON.parse(info);
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                });
            }

            return res.json(device);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll (req, res) {
        let {brandId, typeId, page, limit} = req.query;
        //номер страницы
        page = page || 1;
        //количество товаров на странице
        limit = limit || 9;
        //отступ, первые товары которые не надо отобаржать
        let offset = page * limit - limit;
        
        let devices;
        if (!brandId && !typeId) {
            //findAndCountAll - получает запрашиваемые по условию товары 
            //с указанием их общего количества для пагинации на Frontend
            devices = await Device.findAndCountAll({limit, offset});
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset});
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset});
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset});
        }
        return res.json(devices);  
    }

    async getOne(req, res) {
        const {id} = req.params;
        const device = await Device.findOne({
            //подгружаем устройство с указанным id и его хар-ки
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        });
        return res.json(device);
    }
}

module.exports = new DeviceController();