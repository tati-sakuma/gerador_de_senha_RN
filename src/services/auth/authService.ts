import * as authResource from "./authResource";
import * as authMapper from "./authMapper";
import { SignUpDTO } from "./authResource";
import { getSignUpResponse } from "./authMapper";

export const signIn = ({email, senha}) => {
  return authResource.signIn(email, senha).then((response) => response.data);
};

export const signUp = (data: SignUpDTO) => {
  const dto = authMapper.getSignUpDTO(data);
  return authResource
    .signUp(dto)
};

export const signOut = () => {
  return authResource.signOut().then((response) => response.data);
};
