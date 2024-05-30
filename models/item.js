module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'Users',
              key: 'id',
            },
            allowNull: true,
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        starting_price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        current_price: {
            type: DataTypes.DECIMAL,
        },
        image_url: {
            type: DataTypes.STRING,
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        });
    
        // Hook to set current_price to starting_price on creation
        Item.addHook('beforeCreate', (item, options) => {
        item.current_price = item.starting_price;
        });
    
        return Item;
  };
  