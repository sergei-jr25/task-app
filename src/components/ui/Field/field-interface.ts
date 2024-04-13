import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface IFiledProps {
	error: FieldError | any
}

type TypeFiledProps = IFiledProps & InputHTMLAttributes<HTMLInputElement>
type TypeTextAreaProps = IFiledProps &
	TextareaHTMLAttributes<HTMLTextAreaElement>

export interface IFiled extends TypeFiledProps {}
export interface ITextArea extends TypeTextAreaProps {}
