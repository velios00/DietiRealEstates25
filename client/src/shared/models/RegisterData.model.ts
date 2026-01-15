import { InputField } from "./InputField.model";

export interface RegisterData {
  email: InputField<string>;
  password: InputField<string>;
  name: InputField<string>;
  surname: InputField<string>;
  userAddress: InputField<string>;
}
