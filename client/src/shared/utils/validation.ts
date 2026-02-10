export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return "Email non valida";
  }
  if (!email.trim()) {
    return "Email non puo' essere vuota";
  }
  return null;
};

export const validatePassword = (password: string) => {
  if (!password) {
    return "La password non puo' essere vuota";
  }
  if (password.length < 8) {
    return "La password deve essere almeno di 8 caratteri";
  }
  if (!/[A-Z]/.test(password)) {
    return "La password deve contenere almeno una lettera maiuscola";
  }
  if (!/[a-z]/.test(password)) {
    return "La password deve contenere almeno una lettera minuscola";
  }
  if (!/[0-9]/.test(password)) {
    return "La password deve contenere almeno un numero";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "La password deve contenere almeno un carattere speciale";
  }
  return null;
};
