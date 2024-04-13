import { IOrderItem } from '@/shared/types/order'
import { getLocalStorage } from '@/utils/local-storage'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface initialState {
	orders: IOrderItem[]
	phone: string | null
}

const initialState: initialState = {
	orders: getLocalStorage('order') || [],
	phone: getLocalStorage('phone') || null,
}

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		addToProduct: (state, { payload }: PayloadAction<IOrderItem>) => {
			const isSomeOrder = state.orders.some(item => item.id === payload.id)
			if (!isSomeOrder) {
				state.orders.push(payload)
				localStorage.setItem('order', JSON.stringify(state.orders))
			}
		},
		changeQuantityToProduct: (
			state,
			{ payload }: PayloadAction<{ id: number; type: 'plus' | 'minus' }>
		) => {
			const index = state.orders.findIndex(item => item.id === payload.id)

			if (index === -1) return
			let newState = [...state.orders]
			if (payload.type === 'plus') {
				state.orders[index].quantity++
				state.orders[index].price *= state.orders[index].quantity
				localStorage.setItem('order', JSON.stringify(state.orders))
			} else if (payload.type === 'minus') {
				if (state.orders[index].quantity > 1) {
					state.orders[index].quantity--
					state.orders[index].price *= state.orders[index].quantity
				} else {
					state.orders = state.orders.filter((item, idx) => idx !== index)
				}
				localStorage.setItem('order', JSON.stringify(state.orders))
			}
		},
		addToPhonde: (state, { payload }: PayloadAction<string>) => {
			state.phone = payload
			localStorage.setItem('phone', JSON.stringify(state.phone))
		},
	},
})

export const { reducer, actions } = orderSlice
