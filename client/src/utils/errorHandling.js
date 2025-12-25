export function errorHandling(error) {
  const ERRORS = {
    "INVALID_LOGIN_CREDENTIALS": "Неверный email или пароль.",
    "TOO_MANY_ATTEMPTS_TRY_LATER": "Слишком много попыток входа, попробуйте позже.",
    "EMAIL_EXISTS": "Неверный email или пароль."
  }
  console.log(ERRORS[error]);
  return ERRORS[error]
}
