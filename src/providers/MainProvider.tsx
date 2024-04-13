'use client'
import { store } from '@/store/store'
import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'

const MainProvider: FC<{ children: ReactNode }> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>
}
export default MainProvider
