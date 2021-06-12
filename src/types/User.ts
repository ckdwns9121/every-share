

export interface User{
    user :{
        user_id : number,
        email:string,
        name:string| null,
        password: string,
        phone_number:string,
        agree_sms : number|boolean,
        agree_push: number|boolean,
        register_type : string | null,
        native_token? :string | null,
    }
}