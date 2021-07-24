import { Field, ObjectType } from "type-graphql"
import { UserAuth } from "../entities/userAuth"
import { FieldError } from "./fieldErrors"

@ObjectType()
export class AuthResponseModel {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => UserAuth, { nullable: true })
  user?: UserAuth
}
