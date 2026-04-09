export interface OrderType {
	name: string
	phone: string
	postcode: number
	payMethod: 'card' | 'paypal' | 'cash'
}
