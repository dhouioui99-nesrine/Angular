export class Departement {
    id?: number;
    codeDept?: string;
    name?: string;
    is_default?: boolean;



    constructor(
        id?: number,
        codeDept?: string,
        name?: string,
        is_default?: boolean,
    
    ) {
      this.id = id;
      this.codeDept = codeDept;
      this.name = name;
      this.is_default = is_default;
     
    }
  }