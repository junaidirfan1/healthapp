export const validationRules = {
    required: (fieldName, customMsg) => value =>
        value?.toString().trim() !== '' ||
        customMsg ||
        `${fieldName} is required.`,
    email:
        (customMsg = 'Invalid email format.') =>
            value =>
                /^\S+@\S+\.\S+$/.test(value) || customMsg,
    minLength: (min, fieldName, customMsg) => value =>
        value.length >= min ||
        customMsg ||
        `${fieldName} must be at least ${min} characters.`,

    maxLength: (max, fieldName, customMsg) => value =>
        value.length <= max ||
        customMsg ||
        `${fieldName} must be less than ${max} characters.`,

    number: (fieldName, customMsg) => value =>
        !isNaN(value) || customMsg || `${fieldName} must be a number.`,

    range: (min, max, fieldName, customMsg) => value =>
        (value >= min && value <= max) ||
        customMsg ||
        `${fieldName} must be between ${min} and ${max}.`,

    regex:
        (pattern, customMsg = 'Invalid format.') =>
            value =>
                pattern.test(value) || customMsg,


};