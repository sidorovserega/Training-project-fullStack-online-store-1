class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
    //нет данных по запросу
    static badRequest(message) {
        return new ApiError(404, message)
    }
    //невозможно обработать запрос
    static internal(message) {
        return new ApiError(500, message)
    }
    //в доступе отказано
    static forbidden(message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError;