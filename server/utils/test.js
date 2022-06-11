const { DataTypes } = require('sequelize');
const { sequelize } = require('../dao/dbConnect');


console.log(sequelize)

const Ship = sequelize.define('ship', { name: DataTypes.STRING }, { timestamps: false });
const Captain = sequelize.define('captain', { name: DataTypes.STRING }, { timestamps: false });

(async function(){
    Ship.belongsTo(Captain); // 这将在 Ship 中创建 `captainId` 外键.

    // 通过将模型传递给 `include` 来完成预先加载:
    console.log((await Ship.findAll({ include: Captain })).toJSON());
    // 或通过提供关联的模型名称:
    console.log((await Ship.findAll({ include: 'captain' })).toJSON());
    
    // 同样,实例获得用于延迟加载的 `getCaptain()` 方法：
    const ship = Ship.findOne();
    console.log((await ship.getCaptain()).toJSON());
})()
