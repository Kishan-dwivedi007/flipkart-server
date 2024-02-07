import router from "express";
import {
  ForgotPass,
  //   UpdatePassword,
} from "../controllers/forgotPassController.js";

//router
const Router = router();

//Route
Router.post("/forgot", ForgotPass);
// Router.post("/updatePass", UpdatePassword);

export default Router;
