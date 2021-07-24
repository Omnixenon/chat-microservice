import { AuthResponseModel } from "@root/handlers/auth/responseModels/users"

export const createAuthResponseModel = (obj: AuthResponseModel) => {
  if (obj.errors) return { errors: obj.errors }

  if (obj.user) return { user: obj.user }

  return {}
}
