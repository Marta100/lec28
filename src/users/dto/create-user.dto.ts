import {IsEmail, isNotEmpty, IsNotEmpty, IsNumber, IsString, Length} from "class-validator"

export class CreateUserDto {
    
    @IsNotEmpty()
    @Length(2,20)
    @IsString()
    name!:string

    @IsNotEmpty()
    @IsNumber()
    age!:number

    @IsNotEmpty()
    @IsEmail()
    email!:string
}
