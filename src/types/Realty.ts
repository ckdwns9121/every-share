export interface IRealty{
addr: string,
addr_detail:string,
addr_extra: string|null
createdAt: string,
deposit: number|string,
hit: number,
lat: number,
lng: number,
isLiked?:boolean
maintenance_charge: number,
monthly_rent: number,
oper_end_time: string,
oper_start_time: string,
post_num: string|number|null,
realty_all_floors?: string|number|null,
realty_comment: string|null
realty_contract_images: string|null
realty_id: number
realty_images: string,
realty_kind: number|null
realty_my_floors: number|null|string,
realty_name: string,
realty_options?: string | null,
realty_status: string|null|number,
realty_subcomment: string,
realty_type: number| string | null
updatedAt: string
user_id: number
}