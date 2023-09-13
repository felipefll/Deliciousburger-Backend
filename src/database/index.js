import Sequelize from "sequelize";
import mongoose from "mongoose";

import Product from "../app/models/Products";
import User from "../app/models/User";
import Category from "../app/models/Category";

import configDatabase from "../config/database";

const models = [User, Product, Category];
class Database {
  constructor() {
    this.init();
    this.mongo();
  }
  init() {
    this.connection = new Sequelize(
      "postgresql://postgres:7fxRPfRwWAHPzyFMDvDC@containers-us-west-103.railway.app:7640/railway"
    );
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://mongo:AMcyzk40Zgy1JnP5Zf6J@containers-us-west-57.railway.app:6680",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
