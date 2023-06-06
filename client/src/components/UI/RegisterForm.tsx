import React from 'react'
import {Formik, Form, Field, ErrorMessage, FormikHelpers, useFormik} from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../../hooks/hooks'
import { createUser } from '../../slices/currentUserSlice'

export interface RegisterFormNames{
    firstName: string 
    lastName: string
    password: string
    email: string
}

export interface RegisterFormProps {
    onCancel?: ()=>void
}

interface FormField {
    name: keyof RegisterFormNames
    type: 'text' | 'number' | 'email' | 'password'
    placeholder: string
}

const initialValues: RegisterFormNames = {
    firstName:'', 
    lastName:'',
    password:'',
    email:''
}

const validationSchema =  Yup.object({
        firstName: Yup.string().required('Поле должно быть заполнено'),
        lastName: Yup.string().required('Поле должно быть заполнено'),
        password: Yup.string().required('Поле должно быть заполнено').min(5, 'Пороль должен состоять не меннее чем из 5 символов'),
        email: Yup.string().email('Неправильный формат email').required('Поле должно быть заполнено'),
    })

 const formFields: FormField[] = [
    {
        name: 'firstName',
        type: 'text',
        placeholder: 'Введите Ваше имя'
    },
    {
        name: 'lastName',
        type: 'text',
        placeholder: 'Введите Вашу фамилию'

    },
    {
        name: 'email',
        type: 'email',
        placeholder: 'Введите Ваш email'

    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Введите пароль'

    },
]


export const RegisterForm = ({onCancel=()=>{}}:RegisterFormProps) => {

    const dispatch = useAppDispatch()

    const sentForm = (data:RegisterFormNames, helpers: FormikHelpers<RegisterFormNames>) => {
        dispatch(createUser(data))
        helpers.resetForm()
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: sentForm
    })    

    const closeForm = () => {
        formik.resetForm()
        onCancel()
    }


  return (
    <div className='w-[420px] min-h-[200px] bg-yellow-100 rounded-md shadow-deep flex flex-col items-center gap-5 p-2 pb-5'>
        <h2 className='text-4xl font-bold'>Регистрация</h2>
        <form  className='flex flex-col gap-2' 
        onSubmit={formik.handleSubmit}
        >
            {
            formFields.map( input => 
            <div className='relative z-[1]' 
            key={input.name}
            >
                <input 
                {...input}
                id={input.name} 
                className={'input-field'}
                value={formik.values[input.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {
                formik.errors[input.name] && formik.touched[input.name] &&
                <div className={`input-error`}>
                {formik.errors[input.name] }
                </div> 
                }
            </div>
            )
            }
            <button className='btn mt-5'>Отправить</button>
        </form>
            <button className='btn mt-5'
                    onClick={closeForm}
            >
                Отменить
            </button>
    </div>
  )
}
