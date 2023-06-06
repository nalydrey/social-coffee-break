import {useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../../hooks/hooks'
import { CameraIcon } from '@heroicons/react/24/solid'
import { DeleteButton } from './DeleteButton'

interface NewPostFormProps {
    userId: string
    isView: boolean
    onSubmit: (form: FormData) => void
    onClose: () => void

}

export const NewPostForm = ({
    userId,
    isView,
    onSubmit = () => {},
    onClose = () => {}
}: NewPostFormProps) => {

    const [images, setImg] = useState<FileList | null>(null)


    const formik = useFormik({
        initialValues: {
            name: '',
            discription: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            discription: Yup.string().required('Required')
        }),
        onSubmit: (values) => { 
            const form = new FormData()
            if(images){
                Array.from(images).forEach((img, i)=> form.append(`image${i}`, img))
                // form.append('images', images[0])
            }
            form.append('name', values.name)
            form.append('discription', values.discription)
            form.append('user', userId)
            onSubmit(form)
        }
    })


  return (
    <div className={`relative ${isView ? 'block': 'hidden'}`}>
            <form action="" 
                className=' flex flex-col  gap-5 border-b-2 border-gray-400 pb-4'  
                onSubmit={formik.handleSubmit}
            >
                <h2 className='text-center font-bold text-xl'>Create New Post</h2>
                <div className='flex flex-wrap gap-3'>
                    <div className='w-44 h-28'>
                        <label htmlFor="postImg" className='cursor-pointer w-20 h-20 border-4 border-dotted border-green-700 flex justify-center items-center '>
                            <CameraIcon className='w-8 text-green-700'/>
                        </label>
                        <input type="file" 
                                id='postImg' 
                                multiple  
                                accept='.jpg, .png' className='hidden' 
                                onChange = {(e)=>setImg(e.target.files) }
                        />
                    </div>
                    {images &&
                        Array.from(images).map(img => <img className='img w-44 h-28' src={URL.createObjectURL(img)} alt="" />)
                    }
                </div>
                <input 
                    type="text" 
                    name='name'
                    id='name'
                    className={'input-field w-full'}
                    placeholder='Post Name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <textarea 
                    className='input-field w-full resize-none h-40'
                    name="discription" 
                    id="discription"
                    placeholder='Discription'
                    value={formik.values.discription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <button className='btn-1 self-start' type='submit'>Submit</button>
            </form>
            <DeleteButton className='absolute bg-gray-400 top-0 right-0'
                           onClick={onClose}
            />
        </div>
  )
}
