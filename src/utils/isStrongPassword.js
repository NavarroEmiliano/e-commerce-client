const passwordRequirements = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
}

export const isStrongPassword = (password) => {
  // Check minimum length
  if (password.length < passwordRequirements.minLength) {
    return `The password must have at least ${passwordRequirements.minLength} characters.`
  }

  // Check minimum lowercase letters
  const lowercaseRegex = /[a-z]/g
  if (!password.match(lowercaseRegex)) {
    return `The password must contain at least ${passwordRequirements.minLowercase} lowercase letter.`
  }

  // Check minimum uppercase letters
  const uppercaseRegex = /[A-Z]/g
  if (!password.match(uppercaseRegex)) {
    return `The password must contain at least ${passwordRequirements.minUppercase} uppercase letter.`
  }

  // Check minimum numbers
  const numbersRegex = /[0-9]/g
  if (!password.match(numbersRegex)) {
    return `The password must contain at least ${passwordRequirements.minNumbers} number.`
  }

  // Check minimum symbols
  const symbolsRegex = /[^a-zA-Z0-9]/g
  if (!password.match(symbolsRegex)) {
    return `The password must contain at least ${passwordRequirements.minSymbols} symbol.`
  }

  // Password meets all requirements
  return true
}

