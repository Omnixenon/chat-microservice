import { FieldError } from "../responseModels/fieldErrors"

export const GenericServerError = (errorMessage: string) => {
  const error: FieldError = {
    field: "server",
    message: `Invalid server error: ${errorMessage}`,
  }

  return error
}

export const AuthRegisterException = (errorMessage: string) => {
  const error: FieldError = {
    field: "register",
    message: `An error occured when registering user: ${errorMessage}`,
  }

  return error
}

export const UserWithThatEmailAlreadyExistsException = (email: string) => {
  const error: FieldError = {
    field: "email",
    message: `User with email ${email} already exists`,
  }

  return error
}

export const CouldNotFindUserWithEmailException = (email: string) => {
  const error: FieldError = {
    field: "email",
    message: `User with email ${email} could not be found`,
  }

  return error
}

export const InvalidCredentialsEmailException = () => {
  const error: FieldError = {
    field: "email",
    message: `Invalid credentials provided`,
  }

  return error
}

export const InvalidCredentialsPasswordException = () => {
  const error: FieldError = {
    field: "password",
    message: `Invalid credentials provided`,
  }

  return error
}
