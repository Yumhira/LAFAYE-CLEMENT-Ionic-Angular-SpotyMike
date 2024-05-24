import { IAdress, IArtist, ICompagny, IUserTest } from '../interfaces/userTest';

export class UserTest implements IUserTest {
  public id: string;
  public name: string;
  public username: string;
  public phone: string;
  public website: string;
  public address?: IAdress;
  public company?: ICompagny | undefined;
  public artist?: IArtist | undefined;

  constructor(
    id: string,
    name: string,
    username: string,
    phone: string,
    website: string
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.phone = phone;
    this.name = name;
    this.website = website;
  }
}
