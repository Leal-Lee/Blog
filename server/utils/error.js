
const {formatResqonse} = require('./tool')


//错误基类
class ServiceError extends Error {
    constructor(code, message) {
        super(message)
        this.code = code

    }

    toResponseJSON() {
        return formatResqonse(this.code, this.message, null)
    }
}
// 上传错误
exports.UploadError = class extends ServiceError {
    constructor(message) {
        super(413, message)
    }
}

// 禁止访问错误
exports.ForbiddenError = class extends ServiceError {
    constructor(message) {
        super(401, message)
    }
}

// 验证错误
exports.ValidationError = class extends ServiceError {
    constructor(message) {
        super(406, message)
    }
}

// 无资源错误
exports.NotfoundError = class extends ServiceError {
    constructor() {
        super(406, 'not found')
    }
}

//未知错误
exports.UnknownError = class extends ServiceError {
    constructor() {
        super(500, 'server internal error')
    }
}

module.exports.ServiceError = ServiceError;