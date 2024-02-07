import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

//config
dotenv.config();
const SECRETEKEY = process.env.SECRETEKEY;

//signup controller

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    //existing user
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.status(200).json({ msg: `User already exist..` });
    }

    //converting password into hash

    const hashPassword = password;
    const saltRounds = 10;

    bcrypt.hash(hashPassword, saltRounds, async (err, hash) => {
      if (err) {
        res.json({ msg: `Error occured while hashing password ${err}` });
      } else {
        //storing data
        // const UserData = new userModel({
        //   name: name,
        //   email: email,
        //   password: hash,
        // });
        // await UserData.save();
        const userData = await userModel.create({
          name: name,
          email: email,
          password: hash,
        });

        res.status(201).json({
          success: true,
          msg: "regester successfully..",
          user: userData,
        });
      }
    });
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};

// login controller

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //existing data
    const existingUser = await userModel.findOne({
      email: email,
    });

    if (existingUser) {
      const checkedPassword = existingUser.password;
      bcrypt.compare(password, checkedPassword, (err, result) => {
        if (err) {
          throw err;
        } else {
          if (result) {
            const token = jwt.sign({ existingUser }, SECRETEKEY, {
              expiresIn: "1h",
            });
            if (token) {
              res.status(200).json({
                loged: {
                  success: true,
                  msg: "Login successful..",
                },
                token: token,
                user: existingUser,
              });
            }
            //navigate to main page..
          } else {
            res.status(200).json({ msg: `Login failed...` });
          }
        }
      });
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  } catch (err) {
    if (err) {
      throw err;
    }
  }
};
