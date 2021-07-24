import { IsEmail } from "class-validator"
import { DataMapper } from "@aws/dynamodb-data-mapper"
import { Field, InputType } from "type-graphql"
import { UserAuth } from "../entities/userAuth"

export type AuthContext = {
  mapper: DataMapper
}

export interface AuthService {
  user: UserAuth
}

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  password: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  dob: string
}

@InputType()
export class LoginInput {
  @Field()
  email: string

  @Field()
  password: string
}
