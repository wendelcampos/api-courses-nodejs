import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { db } from "../database/client.ts"
import { users } from "../database/schema.ts"
import { eq } from "drizzle-orm"
import { verify } from "argon2"
import jwt from "jsonwebtoken"

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/sessions",
    {
      schema: {
        tags: ['auth'],
        summary: 'Login',
        body: z.object({
          email: z.email(),
          password: z.string(),
        }),
        response: {
          200: z.object({ token: z.string() }),
          400: z.object({ message: z.string() }),
        }
      },
    },
    async (req, res) => {
      const { email, password } = req.body

      const result = await db.select().from(users).where(eq(users.email, email))

      if(result.length === 0) {
        return res.status(400).send({ message: 'Invalid credentials' })
      }

      const user = result[0]

      const doesPasswordMatch = await verify(user.password, password)

      if(!doesPasswordMatch) {
        return res.status(400).send({ message: 'Invalid credentials' })
      }

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET must be set.")
      }

      const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET)

      return res.status(200).send({ token })
    }
  )
}