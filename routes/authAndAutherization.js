import router from "express";
import { Signup, Login } from "../controllers/userController.js";
//router
const Router = router();
//signup route
Router.post("/signup", Signup);
//login route
Router.post("/login", Login);

export default Router;
