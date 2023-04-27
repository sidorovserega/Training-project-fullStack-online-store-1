import { $authHost, $host } from ".";

//создание типа
export const createType = async (type) => {
    const {data} = await $authHost.post(`api/type`, type);
    return data;
}
//получяение всех типов
export const fetchTypes = async () => {
    const {data} = await $host.get(`api/type`);
    return data;
}

//создание бренда
export const createBrand = async (brand) => {
    const {data} = await $authHost.post(`api/brand`, brand);
    return data;
}
//получяение брендов
export const fetchBrands = async () => {
    const {data} = await $host.get(`api/brand`);
    return data;
}

//создание товара
export const createDevice = async (device) => {
    const {data} = await $authHost.post(`api/device`, device);
    return data;
}
//получяение товаров, параметры автоматически подставятся в строку запроса
//если переменная не пустая
export const fetchDevices = async (typeId, brandId, page, limit = 2) => {
    const {data} = await $host.get(`api/device`, {params: {
        typeId, brandId, page, limit
    }});
    //получсаем ответ (устройства из поля rows, так как для пагинации получаем еще и общее количество товаров 
    return data;
}
//получение одного товара
export const fetchOneDevice = async (id) => {
    const {data} = await $host.get(`api/device/` + id);
    return data;
}