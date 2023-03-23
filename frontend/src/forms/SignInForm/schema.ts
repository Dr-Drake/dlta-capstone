import * as yup from 'yup';

export const SignInFormSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required()
})

export type SignInFormState = yup.InferType<typeof SignInFormSchema>;