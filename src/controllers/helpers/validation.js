import validator from 'validator';
import { badRequest } from './http.js';

export const checkIfIdIsValid = (userId) => validator.isUUID(userId);

export const invalidIdResponse = () =>
    badRequest({
        message: 'The provided ID is not valid.',
    });
