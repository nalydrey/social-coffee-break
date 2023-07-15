import { useFormik } from 'formik'
import { RoundButton } from '../../UI/RoundButton'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import * as Yup from 'yup'

interface ChatFormProps {
    onSubmit: (text: string) => void
}


export const ChatForm = ({
    onSubmit
}: ChatFormProps) => {

    const formik = useFormik({
        initialValues:{
            message:''
        },
        validationSchema: Yup.object({
            message: Yup.string().required('Required')
            }),
        onSubmit: (value, helpers) => {
            onSubmit(value.message)
            helpers.resetForm()
        }
    })

  return (
    <form 
        className='flex gap-2 p-2 border-t-4 border-sky-700'
        onSubmit={formik.handleSubmit}
    >
        <textarea 
            className=' w-full border-2 border-sky-500 px-3 rounded-lg focus:border-4 focus:outline-none font-medium text-lg text-sky-700' 
            name='message'
            id='message'
            placeholder='Your message ...'
            value={formik.values.message}
            onChange={formik.handleChange}
        />
        <RoundButton
            title='Send'
            d={10}
            classWrap='self-end'
            icon = {<PaperAirplaneIcon className='w-6 h-6 text-slate-300'/>}
            type='submit' 
        />
    </form>
  )
}
