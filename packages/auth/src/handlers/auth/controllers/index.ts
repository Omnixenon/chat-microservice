import { createAuthResponseModel } from "@root/helpers/create-model"
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { AuthRegisterException } from "../exceptions"
import { AuthResponseModel } from "../responseModels/users"
import AuthenticationService from "../services"
import { AuthContext } from "../types/auth"
import { RegisterInput, LoginInput } from "../types/auth"

@Resolver()
class AuthenticationController {
  @Authorized()
  @Query(() => String)
  public(@Ctx() { mapper }: AuthContext) {
    return "hi"
  }

  @Authorized("ADMIN")
  @Query(() => String)
  semiPrivate(@Ctx() { mapper }: AuthContext) {
    return "hi"
  }

  @Authorized("ADMIN", "MODERATOR")
  @Query(() => String)
  private(@Ctx() { mapper }: AuthContext) {
    return "hi"
  }

  @Mutation(() => AuthResponseModel)
  async registration(
    @Arg("options") options: RegisterInput,
    @Ctx() { mapper }: AuthContext
  ): Promise<AuthResponseModel> {
    const authService = new AuthenticationService(mapper)

    try {
      const response = await authService.register(options)
      return response
    } catch (error) {
      console.log(error)
      return createAuthResponseModel({ errors: [AuthRegisterException(error)] })
    }
  }

  @Mutation(() => AuthResponseModel)
  async login(
    @Arg("options") options: LoginInput,
    @Ctx() { mapper }: AuthContext
  ): Promise<AuthResponseModel> {
    const authService = new AuthenticationService(mapper)

    const response = await authService.loggingIn(options)

    return response
  }
}

export default AuthenticationController
