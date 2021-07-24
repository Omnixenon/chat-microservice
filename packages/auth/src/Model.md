### Auth Model

## Attributes

- email_address => string
- password => string => hash
- created_at => date
- updated_at => date
- deleted => boolean

## Access Patterns

- Get user object by email_address => pk(#AUTH), sk(foo@bar.com)
- Get list of all users in system
- Get existing user by email_address
