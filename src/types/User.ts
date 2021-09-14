

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
    } | null
}

export interface Filter{
    oneroom: boolean,
    tworoom:boolean,
    op : boolean,
    duplex : boolean,
}

export function isCheck(obj: any): obj is Filter {
    return obj.oneroom!==undefined;
}