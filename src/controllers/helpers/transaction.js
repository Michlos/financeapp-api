import validator from 'validator';
import { badRequest } from './http.js';

export const checkIfAmountIsValid = (amount) => {
    if (typeof amount !== 'number') {
        return false;
    }
    return validator.isCurrency(amount.toFixed(2), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    });
};

export const checkIfTypeIsValid = (type) => {
    const validTypes = ['EARNING', 'EXPENSE', 'INVESTMENT'];
    return validTypes.includes(type);
};

export const invalidAmoutResponse = () => {
    return badRequest({
        message: 'HLP Ctrl: The amount must be a valid currency.',
    });
};
export const invalidTypeResponse = () => {
    return badRequest({
        message: 'The type must be EARNING, EXPENSE or INVESTMENT.',
    });
};
