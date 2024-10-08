import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Не указан email' })
	email: string;

	@IsString({ message: 'Не указан пароль' })
	password: string;
}
