const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Register extends Model {
        static associate(models) {
            // define association here
        }
    }
    Register.init(
        {
            email: {
                type: DataTypes.STRING,
            },
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Register',
            tableName: 'register',
            underscored: true,
            timestamps: false,
        }
    );
    return Register;
};
