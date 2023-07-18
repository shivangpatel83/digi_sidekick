const express = require(`express`)
const authRouter = express.Router()
const jwtAuth = require(`../middlewear/jwtAuth`)

const {signupAuth, loginAuth, userEdit,getUser, findOneUser, deleteUser} = require(`../controllers/auth`)

authRouter.route(`/signup`).post(signupAuth)
authRouter.route(`/login`).post(loginAuth)
authRouter.route(`/getuser`).get(jwtAuth, getUser)
authRouter.route(`/finduser/:id`).get(jwtAuth, findOneUser)
authRouter.route(`/updateuser/:id`).put(jwtAuth, userEdit)
authRouter.route(`/deleteuser/:id`).delete(jwtAuth, deleteUser)



module.exports = authRouter;