export class Person {
    person_id: string;
    person_name: string;
    person_password: string;
    person_properties: any; // Type properties ? 

    constructor(params : {}) {
        if(!params){
            throw new TypeError('Person : constructor param is undefined or null')
        }else{
        this.person_id = params['id']
        this.person_name = params['name']
        this.person_password = params['password']
        this.person_properties = params['properties']
        }
    }
    
    json():{}{
        return{
            id:this.person_id,
            name:this.person_name,
            password:this.person_password,
            properties:this.person_properties
        }
    }
}