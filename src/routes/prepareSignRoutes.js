import hashPassword from "../db/hashPassword.js"
import validate from "../middlewares/validate.js"
import {
  displayNameValidator,
  emailValidator,
  passwordValidator,
} from "../validators.js"

const prepareSignRoutes = ({ app, db }) => {
  app.post(
    "/sign-up",
    validate({
      body: {
        displayName: displayNameValidator,
        email: emailValidator.required(),
        password: passwordValidator.required(),
      },
    }),
    async (req, res) => {
      const { email, password, displayName } = req.locals.body
      const [user] = await db("users").where({ email })

      if (user) {
        res.send({ result: "OK" })

        return
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)

      await db("users").insert({
        displayName,
        email,
        passwordHash,
        passwordSalt,
      })

      res.send({ result: "OK" })
    }
  )
  app.post("/sign-in", () => {})
}

export default prepareSignRoutes
