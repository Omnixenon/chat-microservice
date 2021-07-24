import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations"
import { DYNAMODB_TABLE_NAME } from "@root/constants"
import { Field, ObjectType } from "type-graphql"

@ObjectType()
@table(DYNAMODB_TABLE_NAME)
export class UserProfile {
  @Field()
  @hashKey()
  pk: string

  @Field()
  @rangeKey()
  sk: string

  @Field()
  @attribute()
  firstName: string

  @Field()
  @attribute()
  lastName: string

  @Field()
  @attribute()
  dob: Date
}

// class UserAddress {
//   @attribute()
//   houseNumber: string

//   @attribute()
//   addressLine1: string

//   @attribute()
//   addressLine2?: string

//   @attribute()
//   postCode: string
// }
