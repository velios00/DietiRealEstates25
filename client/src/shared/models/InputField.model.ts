export interface InputField<T> {
  value: T;
  validateCriteria?: (value: T) => string | null;
}
