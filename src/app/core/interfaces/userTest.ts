export interface IUserTest {
    id: string;
    name: string;
    username: string;
    phone: string;
    website: string;
    address?: IAdress;
    company?: ICompagny;
    artist?: IArtist;
  }
  export interface IArtist {
    nbLike: number;
    year: number;
  }
  export interface IGeo {
    lat: string;
    lng: string;
  }
  export interface IAdress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo?: IGeo;
  }
  export interface ICompagny {
    name: string;
    catchPhrase: string;
    bs: string;
  }
  