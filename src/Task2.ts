import moment from 'moment'
import promptSync from 'prompt-sync'
import { UserInterface } from './Types/User'

const prompt = promptSync({ sigint: true })

const validateInput = (
	input: string,
	type: 'email' | 'password' | 'birthday',
	min?: number,
	max?: number,
): boolean => {
	switch (type) {
		case 'email':
			return (
				(min === undefined || input.length > min) &&
				(max === undefined || input.length < max) &&
				input.includes('@') &&
				input.includes('.')
			)
		case 'password':
			return (
				(min === undefined || input.length > min) &&
				(max === undefined || input.length < max)
			)
		case 'birthday':
			const age = moment().diff(moment(input, 'YYYY-MM-DD'), 'years')
			return (
				(min === undefined || age > min) && (max === undefined || age < max)
			)
		default:
			return false
	}
}

const emailInput: string = prompt('Enter email (8+ characters): ').trim()
const passwordInput: string = prompt(
	'Enter password (8-16 characters): ',
).trim()
const birthdayInput: string = prompt('Enter birthday (YYYY-MM-DD): ').trim()

if (
	validateInput(emailInput, 'email', 8) &&
	validateInput(passwordInput, 'password', 8, 16) &&
	validateInput(birthdayInput, 'birthday', 17, 100)
) {
	const user: UserInterface = {
		email: emailInput,
		password: passwordInput,
		birthday: new Date(birthdayInput),
	}

	console.log('User created successfully:')
	console.log(user)
} else {
	console.log('User could not be created due to invalid input.')
}
