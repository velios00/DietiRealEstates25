import { UserDTO } from "../DTOs/UserDTO.js";

export class UserMapper {
  static toUserDTO(user, tempPassword = null) {
    return new UserDTO({
      idUser: user.idUser,
      email: user.email,
      name: user.name,
      surname: user.surname,
      role: user.role,
      userAddress: user.userAddress,
      temporaryPassword: tempPassword,
    });
  }

  static toUserDTOList(users) {
    return users.map((user) => UserMapper.toUserDTO(user));
  }
}
