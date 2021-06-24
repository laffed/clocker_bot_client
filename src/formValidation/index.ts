import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const requiredMessage = 'Required field';

//SIGNIN
const loginSchema = yup.object().shape({
	email: yup.string().email('Wrong email format').required(requiredMessage),
	password: yup.string().required(requiredMessage)
});
export const loginResolver = yupResolver(loginSchema);

//SIGNUP
const signupSchema = yup.object().shape({
	email: yup.string().email('Wrong email format').required(requiredMessage),
	password: yup.string().required(requiredMessage)
});
export const signupResolver = yupResolver(signupSchema);