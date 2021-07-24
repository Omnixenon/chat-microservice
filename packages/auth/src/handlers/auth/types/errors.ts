import { FieldError } from "../responseModels/fieldErrors"

class DynamoDBException extends FieldError {
  public field: string
  public message: string

  constructor(field: string, message: string) {
    super()
    this.field = message
    this.message = message
  }
}

export default DynamoDBException
