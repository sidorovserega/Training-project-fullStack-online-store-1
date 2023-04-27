import { makeAutoObservable } from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [];
        this._brands = [];
        this._devices = [];
        //выбранные типы и бренды при добавлении устройства
        this._selectedType = {};
        this._selectedBrand = {};
        //отображаемая страница пагинации
        this._page = 1;
        //всего страниц
        this._totalCount = 0;
        //лимит устройств на одной странице
        this._limit = 2;
        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = types;
    };

    setBrands(brands) {
        this._brands = brands;
    }

    setDevices(devices) {
        this._devices = devices;
    }

    setSelectedType(type) {
        this.setPage(1);
        this._selectedType = type;
    }

    setSelectedBrand(brand) {
        this.setPage(1);
        this._selectedBrand = brand;
    }

    setPage(page) {
        this._page = page;
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }

    setLimit(limit) {
        this._limit = limit;
    }

    get types() {
        return this._types;
    }

    get brands() {
        return this._brands;
    }

    get devices() {
        return this._devices;
    }

    get selectedType() {
        return this._selectedType;
    }

    get selectedBrand() {
        return this._selectedBrand;
    }

    get page() {
        return this._page;
    }

    get totalCount() {
        return this._totalCount;
    }

    get limit() {
        return this._limit;
    }
}