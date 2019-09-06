import { Length } from 'class-validator';
import { MAX_LENGTH_USERNAME, ENCODED_PASSWORD_LENGTH } from '../../constants/validation.const';

export class AuthBaseInput {
  @Length(1, MAX_LENGTH_USERNAME)
  username!: string;

  @Length(ENCODED_PASSWORD_LENGTH, ENCODED_PASSWORD_LENGTH)
  password!: string;
}
