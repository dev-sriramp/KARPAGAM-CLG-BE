export class CreateUserDto {
  name: string;
  email_address: string;
  mobile_number: string;
  password: string;
}

export class LoginDto {
  email_address?: string;
  password: string;
}
