import {useEffect} from 'react'
import { InputField } from '../UI/InputField'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { UserModel } from '../../models/UserModel'
import * as Yup from 'yup'
import { editUser } from '../../slices/currentUserSlice'
import { ContentBox } from '../UI/ContentBox'

export interface EditUserForm {
    userId: string
    firstName:  string
    lastName: string
    nikName: string
    age: number
    gender: 'male' | 'female'
    email: string
    tel: string
}

export const Profile = () => {

    const currentUser = useAppSelector<UserModel>(state => state.currentUser.user) || null
    const dispatch = useAppDispatch()

    
    

    const formik = useFormik<Omit<EditUserForm, 'userId'>>({
        initialValues:{
            firstName: currentUser?.private.firstName || '',
            lastName: currentUser?.private.lastName || '',
            nikName: currentUser?.private.nikName || '',
            age: currentUser?.private.age || 0,
            gender: currentUser?.private.gender || 'male',
            email: currentUser?.contacts.email || '',
            tel: currentUser?.contacts.tel || ''
        },
        validationSchema: 
            Yup.object({
                firstName: Yup.string().required('Field must be fill'),
                lastName: Yup.string().required('Field must be fill'),
                age: Yup.number().max(100, 'Age must be less'),
                email: Yup.string().email('Invalid email address').required('Field must be fill'),
            }),
        onSubmit: () => {
            const a: EditUserForm = {
                userId: formik.values.firstName,
                firstName: formik.values.firstName,
                lastName: formik.values.lastName,
                nikName: formik.values.nikName,
                age: formik.values.age,
                gender: formik.values.gender,
                email: '',
                tel: ''
            }
            dispatch(editUser({userId: currentUser._id, ...formik.values}))
        }
        
    })

    useEffect (()=>{
        
        if(currentUser){
            formik.values.firstName =  currentUser.private.firstName
            formik.values.lastName =  currentUser.private.lastName
            formik.values.age =  currentUser.private.age
            formik.values.gender =  currentUser.private.gender
            formik.values.email =  currentUser.contacts.email
            formik.values.tel =  currentUser.contacts.tel
        }

    },[currentUser])




  return (
    <ContentBox 
        className='w-full'
        title='My Profile'
    >
        <div className='w-full mt-5 px-5'>
            <form action="" className='grid grid-cols-2 gap-5 ' onSubmit={formik.handleSubmit}>
                <InputField 
                    id='firstname'
                    type='text'
                    label='Name'
                    className='w-full'
                    name='firstName'
                    error={formik.errors.firstName}
                    value={formik.values.firstName}
                    placeholder='Enter Your first Name'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <InputField 
                    id='lastName'
                    type='text'
                    label='Last Name'
                    className='w-full'
                    name='lastName'
                    error={formik.errors.lastName}
                    value={formik.values.lastName}
                    placeholder='Enter Your last Name'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <InputField 
                    id='nikName'
                    type='text'
                    label='Nik'
                    className='w-full'
                    name='nikName'
                    error={formik.errors.nikName}
                    value={formik.values.nikName}
                    placeholder='Enter Your nikname'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <InputField 
                    id='nikName'
                    type='number'
                    label='Age'
                    className='w-full'
                    name='age'
                    value={formik.values.age}
                    placeholder='Enter Your age'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <InputField 
                    id='email'
                    type='text'
                    label='email'
                    className='w-full'
                    name='email'
                    value={formik.values.email}
                    placeholder='Enter Your email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <InputField 
                    id='nikName'
                    type='number'
                    label='Telephone'
                    className='w-full'
                    name='tel'
                    value={formik.values.tel}
                    placeholder='Enter Your telephone'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div className='flex gap-5'>
                    <label className={`cursor-pointer`} htmlFor ='female'>female</label>
                    <input 
                        className='hidden'
                        type="radio" 
                        name='gender' 
                        value='female' 
                        id='female' 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <div className='relative border border-sky-600 w-14 h-7 rounded-full shadow-light bg-green-500'
                    >
                        <div className={` shadow-light w-9 h-9 rounded-full border border-sky-600 absolute -translate-x-1/2  -translate-y-1/2 top-1/2 bg-gray-400 duration-300
                                        ${formik.values.gender === 'female' ? 'left-0': 'left-full'}
                        `}>

                        </div>
                    </div>
                    <label className={`cursor-pointer `} htmlFor ='male'>male</label>
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
                <button type='submit' className='btn-1 w-[200px] center'>Change profile</button>
            </form>
        </div>

    </ContentBox>
  )
}
