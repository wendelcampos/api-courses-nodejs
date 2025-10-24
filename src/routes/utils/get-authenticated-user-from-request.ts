import type { FastifyRequest } from "fastify";

export function getAuthenticatedUserFromRequest(request: FastifyRequest) {
  const user = request.user

  if(!user) {
    throw new Error("User is not authenticated.");
  }

  return user;
}