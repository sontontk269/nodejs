"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ email, name, password }) => {
    try {
      //check email exist??
      const holderShop = await shopModel.findOne({ email }).lean(); //nếu k dùng lean() thì finOne sẽ trả về 1 obj thuần mongoose còn lean() trả về obj thuần js
      if (holderShop) {
        return {
          code: "xxxx",
          message: "Shop already registered!",
        };
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newShop = await shopModel.create({
        email,
        name,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      console.log(newShop);
      if (newShop) {
        // created privateKey, publicKey
        // privateKey dùng để sign token còn publicKey CHỈ dùng để verify token(lưu vào database, nếu hacker xâm nhập thì chỉ lấy dc publicKey)
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
            //public key crytography standard
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
            //public key crytography standard
          },
        });
        
        console.log({ privateKey, publicKey }); // save collection Keystore
       
        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey
        });

        if (!publicKeyString) {
          return {
            code: "xxxx",
            message: "publicKeyString error",
          };
        }

        //CREATED token pair
        const tokens = await createTokenPair(
          {userId: newShop._id, email},
          publicKeyString, privateKey
        );
        console.log(`Create Token success::`, tokens);

        return {
          code: 201,
          metadata: {
            shop: getInfoData({fileds:['_id','name','email'], object: newShop}),
            tokens,
          },
        };
      }
      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
