import React from 'react'
import { InputField } from '../UI/InputField'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { UserModel } from '../../models/UserModel'
import * as Yup from 'yup'
import { editUser } from '../../slices/currentUserSlice'

export interface EditUserForm {
    userId: string
    firstName:  string
    lastName: string
    nikName: string
    age: number
    gender: '' | 'male' | 'female'
    email: string
    tel: string
}

export const Profile = () => {

    const currentUser = useAppSelector<UserModel>(state => state.currentUser.user) || null
    const dispatch = useAppDispatch()
    

    const formik = useFormik({
        initialValues:{
            firstName: currentUser?.private.firstName || '',
            lastName:currentUser?.private.lastName || '',
            nikName:currentUser?.private.nikName || '',
            age:currentUser?.private.age || 0,
            gender:currentUser?.private.gender || 'female',
            email:currentUser?.contacts.email || '',
            tel:currentUser?.contacts.tel || ''
        },
        validationSchema: 
            Yup.object({
                firstName: Yup.string().required('Field must be fill'),
                lastName: Yup.string().required('Field must be fill'),
                age: Yup.number().max(100, 'Age must be less'),
                email: Yup.string().email('Invalid email address').required('Field must be fill'),
            }),
        onSubmit: () => {
            dispatch(editUser({userId: currentUser._id, ...formik.values}))
        }
        
    })




  return (
    <div>
        <h1 className='text-4xl font-bold text-center mb-3'>My Profile</h1>
        <form action="" className='grid gap-5' onSubmit={formik.handleSubmit}>
            <InputField 
                name='firstName'
                value={formik.values.firstName}
                placeholder='Enter Your first Name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <InputField 
                name='lastName'
                value={formik.values.lastName}
                placeholder='Enter Your last Name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <InputField 
                name='nikName'
                value={formik.values.nikName}
                placeholder='Enter Your nikName'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <InputField 
                name='age'
                value={formik.values.age}
                placeholder='Enter Your age'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <div className='flex gap-5'>
                <label className={`cursor-pointer ${formik.values.gender === 'female'? 'border-2': ''}`} htmlFor ='female'>female</label>
                <input 
                    className='hidden'
                    type="radio" 
                    name='gender' 
                    value='female' 
                    id='female' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <label className={`cursor-pointer ${formik.values.gender === 'male'? 'border-2': ''}`} htmlFor ='male'>male</label>
                <input 
                    className='hidden'
                    type="radio" 
                    name='gender' 
                    value='male' 
                    id='male' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>
            <InputField 
                name='email'
                value={formik.values.email}
                placeholder='Enter Your email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <InputField 
                name='tel'
                value={formik.values.tel}
                placeholder='Enter Your telephone'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <button type='submit' className='btn-1 w-[200px] center'>Change profile</button>
        </form>
    </div>
  )
}
