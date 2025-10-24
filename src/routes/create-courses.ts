import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { db } from "../database/client.ts"
import { courses } from "../database/schema.ts"
import { checkUserRole } from "./hooks/check-user-role.ts"
import { checkRequestJwt } from "./hooks/check-request-jwt.ts"

export const createCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/courses",
    {
      preHandler: [
        checkRequestJwt,
        checkUserRole("manager"),
      ],
      schema: {
        tags: ['courses'],
        summary: 'Create a new course',
        body: z.object({
          title: z.string().min(5, "O título deve ter no mínimo 5 caracteres"),
        }),
        response: {
          201: z.object({ courseId: z.uuid(), }).describe('Curso criado com sucesso')
        }
      },
    },
    async (req, res) => {
      const courseTitle = req.body.title

      const result = await db
        .insert(courses)
        .values({ title: courseTitle })
        .returning()

      return res.status(201).send({ courseId: result[0].id })
    }
  )
}