'use strict'
//!dmbg

const { model, Schema, Types } = require('mongoose')

const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'

const shopModel = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      // status có 2 trạng thái, có cho hoạt động hay không
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    verify: {
      //xác minh shop này đã đăng kí thành công hay chưa
      type: Schema.Types.Boolean,
      default: false,
    },
    roles: {
      //shop có quyền truy cập vào tài nguyên hay k
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, shopModel);