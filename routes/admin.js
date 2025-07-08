const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { authCheck } = require("../middleware/auth.middleware");

router.route("/register").get(authController.getRegister).post(authController.register);
router.route("/login").get(authController.getLogin).post(authController.login);
router.get("/logout", authController.logout);
router.get("/profile", authCheck, authController.profileGet);
router.post("/profile", authCheck, authController.profileUpdate);

router.get("/", authCheck, async function (req, res, next) {
    try {
        res.render("dashboard", { title: "Dashboard", activePage: "dashboard", auth: req?.auth });
    } catch (error) {
        console.error("Error fetching dashboard:", error);
        res.status(500).send("Internal Server Error: " + error);
    }
});

module.exports = router;
