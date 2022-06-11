const Admin = require('./model/adminModel.js')

const {
    Op
} = require("sequelize");

// 查询管理员
exports.adminDao = async function (login) {

    try {
        const result = await Admin.findOne({
            where: {
                [Op.and]: [{
                        loginId: login.loginId
                    },
                    {
                        loginPwd: login.loginPwd
                    }
                ]
            },
            attributes: { exclude: ['loginPwd','isSpuerAdmin'] }
        })

        return result ? result.toJSON() : null
    } catch (err) {

        throw new Error(err)
    }



}

// 更新管理员
exports.updateAdminDao = async function (updateInfo, login) {
    try {
        await Admin.update(updateInfo, {
            where: {
                [Op.and]: [{
                        loginId: login.loginId
                    },
                    {
                        loginPwd: login.loginPwd
                    }
                ]
            },
            attributes: { exclude: ['loginPwd'] }

        })
    } catch (err) {

        throw new Error(err)
    }



}