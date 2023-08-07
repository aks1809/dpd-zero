const data = (sequelize, DataTypes) =>
  sequelize.define(
    'data',
    {
      key: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      value: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'data',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'key' }],
        },
      ],
    }
  );

export default data;
