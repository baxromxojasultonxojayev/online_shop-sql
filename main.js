const {Sequelize, DataTypes} = require('sequelize');
const CartModel = require('./models/CartModel');
const CategoryModel = require('./models/CategoryModel');
const OrderedProduct = require('./models/OrderedProduct');
const OrderModel = require('./models/OrderModel');
const ParamsModel = require('./models/ParamsModel');
const ProductModel = require('./models/ProductModel');
const UserModel = require('./models/UserModel')

const sequelize = new Sequelize('postgres://postgres:new_password@localhost:5432/online_shop', {
  logging: (log) => console.log(`SQL: ${log}`)
})

async function main() {
  try{
    await sequelize.authenticate();
    console.log('Connected ');

    let db = {}

    db.users = await UserModel(Sequelize, sequelize)
    db.categories = await CategoryModel(Sequelize, sequelize)
    db.products = await ProductModel(Sequelize, sequelize)
    db.params = await ParamsModel(Sequelize, sequelize)
    db.cart = await CartModel(Sequelize, sequelize)
    db.order = await OrderModel(Sequelize, sequelize)
    db.orderedProducts = await OrderedProduct(Sequelize, sequelize)


    db.categories.hasMany(db.products, {
      foreignKey: {
        name: 'category_id',
        allowNull: false
      }
    })

    db.products.belongsTo(db.categories, {
      foreignKey: {
        name: 'category_id',
        allowNull: false
      }
    })

    db.products.hasMany(db.params, {
      foreignKey: {
        name: 'product_id',
        allowNull: false
      }
    })

    db.params.belongsTo(db.products, {
      foreignKey: {
        name: 'product_id',
        allowNull: false
      }
    })

    db.users.hasMany(db.cart, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })

    db.cart.belongsTo(db.users, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })

    db.products.hasMany(db.cart, {
      foreignKey: {
        name: 'product_id',
        allowNull: null
      }
    })

    db.cart.belongsTo(db.products, {
      foreignKey: {
        name: 'product_id',
        allowNull: null
      }
    })

    db.users.hasMany(db.order, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })

    db.order.belongsTo(db.users, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })

    db.order.hasMany(db.orderedProducts, {
      foreignKey: {
        name: 'order_id',
        allowNull: false
      }
    })

    db.orderedProducts.belongsTo(db.order, {
      foreignKey: {
        name: 'order_id',
        allowNull: false
      }
    })

    db.products.hasMany(db.orderedProducts, {
      foreignKey: {
        name: 'product_id',
        allowNull: false
      }
    })

    db.orderedProducts.belongsTo(db.products, {
      foreignKey: {
        name: 'product_id',
        allowNull: false
      }
    })

    // sequelize.sync({ force: true })
  }
  catch(e){
    console.log("SQl Error", e);
  }
}
main()