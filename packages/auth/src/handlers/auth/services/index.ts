import { DataMapper } from "@aws/dynamodb-data-mapper"
import {
  USER_AUTH_PK_PREFIX,
  USER_AUTH_SK_PREFIX,
  USER_PROFILE_PK_PREFIX,
  USER_PROFILE_SK_PREFIX,
} from "@root/constants"
import { createAuthResponseModel } from "@root/helpers/create-model"
import { get, put } from "@root/helpers/dynamo-funcs"
import { UserAuth } from "../entities/userAuth"
import { UserProfile } from "../entities/userProfile"
import {
  UserWithThatEmailAlreadyExistsException,
  CouldNotFindUserWithEmailException,
  InvalidCredentialsPasswordException,
  InvalidCredentialsEmailException,
} from "../exceptions"
import { AuthService } from "../types/auth"
import { LoginInput, RegisterInput } from "../types/auth"

class AuthenticationService implements AuthService {
  public user: UserAuth
  public mapper: DataMapper

  constructor(mapper: DataMapper) {
    this.user = new UserAuth()
    this.mapper = mapper
  }

  public async register(userData: RegisterInput) {
    const userAuthPK = `${USER_AUTH_PK_PREFIX}${userData.email}`
    const userAuthSK = USER_AUTH_SK_PREFIX
    const userProfilePK = `${USER_PROFILE_PK_PREFIX}${userData.email}`
    const userProfileSK = USER_PROFILE_SK_PREFIX
    const timestamp = new Date()

    const getUser = Object.assign(new UserAuth(), {
      pk: userAuthPK,
      sk: userAuthSK,
    })

    const getResponse = await get(this.mapper, getUser)

    if (getResponse) {
      return createAuthResponseModel({
        errors: [UserWithThatEmailAlreadyExistsException(userData.email)],
      })
    }

    const newUserAuth = Object.assign(new UserAuth(), {
      pk: userAuthPK,
      sk: userAuthSK,
      email: userData.email,
      role: "Basic",
      password: userData.password,
      created_at: timestamp,
      updated_at: timestamp,
      deleted: false,
    })

    const userAuthResponse = await put(this.mapper, newUserAuth)

    const newUserProfile = Object.assign(new UserProfile(), {
      pk: userProfilePK,
      sk: userProfileSK,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dob: new Date(userData.dob),
    })

    await put(this.mapper, newUserProfile)

    return createAuthResponseModel({
      user: userAuthResponse,
    })
  }

  public async loggingIn(userData: LoginInput) {
    const pk = `${USER_AUTH_PK_PREFIX}${userData.email}`
    const sk = USER_AUTH_SK_PREFIX

    const getUser = Object.assign(new UserAuth(), {
      pk,
      sk,
    })

    const response = await get(this.mapper, getUser)

    if (!response) {
      return createAuthResponseModel({
        errors: [CouldNotFindUserWithEmailException(userData.email)],
      })
    }

    if (response.password !== userData.password) {
      return createAuthResponseModel({
        errors: [InvalidCredentialsPasswordException()],
      })
    }

    return createAuthResponseModel({
      user: response,
    })
  }

  public loggingOut() {}
}

export default AuthenticationService
