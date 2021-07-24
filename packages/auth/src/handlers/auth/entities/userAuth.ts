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
export class UserAuth {
  @Field()
  @hashKey()
  pk: string

  @Field()
  @rangeKey()
  sk: string

  @Field()
  @attribute()
  email: string

  @attribute()
  password: string

  @Field()
  @attribute()
  role: string

  @Field()
  @attribute({ defaultProvider: () => new Date() })
  created_at: Date

  @Field()
  @attribute({ defaultProvider: () => new Date() })
  updated_at: Date

  @Field()
  @attribute()
  deleted: boolean
}
