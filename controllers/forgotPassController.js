import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
export const ForgotPass = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    //existing user
    const existUSer = await userModel.findOne({ email: email });
    if (!existUSer) {
      res.json({
        msg: "Email not found",
        status: false,
      });
    } else {
      const getPassword = existUSer.password;

      const passwordMatch = await bcrypt.compare(oldPassword, getPassword);
      console.log(passwordMatch);
      if (!passwordMatch) {
        res.status(200).json({
          msg: "Password incorrect",
          success: false,
        });
      } else {
        const hashPassword = newPassword;
        const saltRounds = 10;
        bcrypt.hash(hashPassword, saltRounds, async (err, hash) => {
          if (err) {
            throw new Error(err);
          } else {
            const dataUpdated = await userModel.updateOne(
              { email: email },
              { $set: { password: hash } }
            );
            res.json({
              msg: "Password updated successfully",
              success: true,
            });
          }
        });
      }
    }
  } catch (error) {
    res.status(200).json({
      msg: `Error occured ${error}`,
      success: false,
    });
  }
};

// export const UpdatePassword = async (req, res) => {
//   const { oldPassword, newPassword } = req.body;
//   const getOldPassword = await userModel.findOne({ password: oldPassword });
//   console.log(getOldPassword);
//   //   const extractPassword = getOldPassword.password;
//   bcrypt.compare(oldPassword, extractPassword, (err, result) => {
//     if (err) {
//       throw err;
//     } else {
//       if (result) {
//         userModel.updateOne(
//           { password: oldPassword },
//           { $set: { password: newPassword } }
//         );
//         res.status(200).json({
//           msg: `Password updated successfully`,
//           success: true,
//         });
//       }
//     }
//   });
// };
