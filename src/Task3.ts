import promptSync from 'prompt-sync'
import { OrderType } from './Types/Order'

const prompt = promptSync({ sigint: true })

function validateInput(
	input: string,
	type: 'name' | 'phone' | 'postcode' | 'payMethod',
): boolean {
	switch (type) {
		case 'name':
			return input.length >= 2 && input.length <= 50
		case 'phone':
			return /^\+?\d{1,4}[-.\s]?\(?\d{1,5}\)?[-.\s]?\d{1,5}[-.\s]?\d{1,9}$/.test(
				input,
			)
		case 'postcode':
			return /^\d{5}$/.test(input)
		case 'payMethod':
			return ['card', 'paypal', 'cash'].includes(input)
		default:
			return false
	}
}

const nameInput: string = prompt('Enter name (2-50 characters): ').trim()
const phoneInput: string = prompt('Enter phone number: ').trim()
const postcodeInput: string = prompt(
	'Enter postcode (positive number): ',
).trim()
const payMethodInput: string = prompt(
	'Enter payment method (card, paypal, cash): ',
).trim()

if (
	validateInput(nameInput, 'name') &&
	validateInput(phoneInput, 'phone') &&
	validateInput(postcodeInput, 'postcode') &&
	validateInput(payMethodInput, 'payMethod')
) {
	const order: OrderType = {
		name: nameInput,
		phone: phoneInput,
		postcode: parseInt(postcodeInput),
		payMethod: payMethodInput as 'card' | 'paypal' | 'cash',
	}

	console.log('Order created successfully:')
	console.log(order)
} else {
	console.log('Order could not be created due to invalid input.')
}
