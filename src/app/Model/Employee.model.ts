import { Departement } from "./Departement.model";

export class Employee {
    id?: number;
    empCode?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    department?: Departement
   
  
  
    constructor(
        id?: number,
        empCode?: string,
        firstname?: string,
        lastname?: string,
        email?: string,
        department?: Departement,
    ) {
      this.id = id;
      this.empCode = empCode;
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.department = department;
    }
  }
  