import * as yup from 'yup';

/**
 * ^ represents the starting of the string.
 * (?=.*[a-z]) represent at least one lowercase character.
 * (?=.*[A-Z]) represents at least one uppercase character.
 * (?=.*\\d) represents at least one numeric value.
 * (?=.[-+_!@#$%^&., ?]) represents at least one special character.
 * . represents any character except line break.
 * {.6,} represents minimum six in length.
 */
let regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

export const SignUpFormSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
    .matches(regex, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
})

export type SignUpFormState = yup.InferType<typeof SignUpFormSchema>;