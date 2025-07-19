export interface ILogin {
	email: string
	password: string
}

export interface ISignUp extends ILogin {
    name: string
    confirmPassword: string
}

export interface IFormData {
	email: string
	password: string
	name?: string
	confirmPassword?: string
}