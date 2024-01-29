module.exports = (server) => {
    const userController = require("../controllers/userController");
    server.post("/user/register", userController.userRegister);
    server.post("/user/login", userController.userLogin);

    // vvv   A SUPPRIMER EN PROD   vvv
    const auth = require("../middlewares/auth");
    server.get("/user/getall", userController.userGetAll);
    server.get('/user/myInfos', auth, userController.userGetTokenInfos)
}