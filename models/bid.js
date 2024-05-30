module.exports = (sequelize, DataTypes) => {
    const Bid = sequelize.define('Bid', {
      item_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Items',
          key: 'id',
        },
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
      },
      bid_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
    return Bid;
  };