import promptSync from 'prompt-sync'
import { ProductType } from './Types/Product'

const prompt = promptSync({ sigint: true })

const validateInput = (input: string, type: 'string' | 'number'): boolean => {
	switch (type) {
		case 'string':
			return input.length > 5
		case 'number':
			const num = parseFloat(input)
			return !isNaN(num) && isFinite(num) && num > 0
		default:
			return false
	}
}

const nameInput: string = prompt('Enter product name (6+ characters): ').trim()
const descriptionInput: string = prompt(
	'Enter product description (6+ characters): ',
).trim()
const quantityInput: string = prompt(
	'Enter product quantity (must be a positive number): ',
).trim()
const priceInput: string = prompt(
	'Enter product price (must be a positive number): ',
).trim()

if (
	validateInput(nameInput, 'string') &&
	validateInput(descriptionInput, 'string') &&
	validateInput(quantityInput, 'number') &&
	validateInput(priceInput, 'number')
) {
	const product: ProductType = {
		name: nameInput,
		description: descriptionInput,
		quantity: parseInt(quantityInput),
		price: parseFloat(priceInput),
		createdAt: new Date(),
	}

	console.log('Product created successfully:')
	console.log(product)
} else {
	console.log('Product could not be created due to invalid input.')
}
