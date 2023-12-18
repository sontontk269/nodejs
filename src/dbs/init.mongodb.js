"use strict";
//ket noi database su dung design pattern (Singleton)
const { default: mongoose } = require("mongoose");

const {db:{host, name, port}} = require('../configs/config.mongodb')
const connectString =`mongodb://${host}:${port}/${name}`;

const {countConnect} = require("../helpers/check.connect")
class Database {
  constructor() {
    this.connect();
  }

  //connect
  connect() {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString, {
        maxPoolSize: 50, //
      })
      .then((_) =>
        console.log("Connected Mongodb Success !!!!", countConnect(), connectString)
      )
      .catch((err) => console.log("Error Connect!!!"));
    }
    
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb
