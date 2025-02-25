export type FormFieldsElement = {
    name: HTMLInputElement;
    age: HTMLInputElement;
    email: HTMLInputElement;
    gender: HTMLInputElement;
    isAccept: HTMLInputElement;
    password:  HTMLInputElement;
    country:  HTMLInputElement;
    image: HTMLInputElement;
  };
  
  export type FormData = {
    name: string;
    age: number;
    email: string;
    gender: string;
    isAccept: boolean;
    password: string
    country: string;
    image: FileList;
  };
