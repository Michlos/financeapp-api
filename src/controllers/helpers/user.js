import validator from 'validator';
import { badRequest, notFound } from './http.js';

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must be at lesat 6 caracters.',
    });

export const invalidEmailResponse = () =>
    badRequest({
        message: 'Invalid e-mail. Please provide a valide one.',
    });

export const checkIfPassworIsValid = (password) => password.length >= 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);

export const userNotFoundReponse = () =>
    notFound({ message: 'User not found.' });
