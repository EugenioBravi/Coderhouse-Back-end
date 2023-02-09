import { STATUS } from "../constants/constants.js";
import * as usersServices from "../dao/services/user.service.js";
import * as authServices from "../dao/services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const logged = await authServices.login(email, password);

    if (logged) {
      req.session.logged = true;
      req.session.user = await usersServices.getUser(email);

      res.redirect("/");
    } else {
      res.status(401).json({
        success: STATUS.FAIL,
        message: "Incorrect user email and password combination",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        res.json(error);
      } else {
        res.redirect("/login");
      }
    });
  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message,
    });
  }
};
