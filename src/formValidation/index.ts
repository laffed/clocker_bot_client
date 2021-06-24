import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const requiredMessage = 'Required field';

//SIGNIN
const loginSchema = yup.object().shape({
	username: yup.string().required(requiredMessage),
	password: yup.string().required(requiredMessage)
});
export const loginResolver = yupResolver(loginSchema);

