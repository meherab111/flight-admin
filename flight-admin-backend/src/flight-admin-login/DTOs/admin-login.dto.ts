import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class ForgotPasswordDto {
  email: string;
}

export class ResetPasswordDto {
  token: string;
  newPassword: string;
}
