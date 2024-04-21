const isValidPhoneNumber = (number) => {
    // Add your custom validation logic here
    // For simplicity, this example checks if the number has at least 10 digits
    return /^\d+$/.test(number) && number.length >= 10;
};

const isValidOTPNumber = (number) => {
    // Add your custom validation logic here
    // For simplicity, this example checks if the number has at least 10 digits
    return /^\d+$/.test(number) && number.length >= 6;
};

const isValidEmailID = (inputValue) => {
    // Add your custom validation logic here
     // Basic validation: Check if the input matches the email pattern
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);
};

export const Validations = {
    isValidPhoneNumber,
    isValidEmailID,
    isValidOTPNumber
}