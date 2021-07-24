import { DataMapper } from "@aws/dynamodb-data-mapper"

export const get = async (mapper: DataMapper, obj: any, options = {}) => {
  const response = await mapper
    .get(obj, options)
    .then((data) => data)
    .catch((error) => {
      console.log(error)
      return null
    })
  return response
}

export const put = async (mapper: DataMapper, obj: any, options = {}) => {
  const response = await mapper
    .put(obj, options)
    .then((data) => data)
    .catch((error) => {
      console.log(error)
      return null
    })
  return response
}
