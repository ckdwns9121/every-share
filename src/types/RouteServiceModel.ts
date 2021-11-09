import { ComponentType } from "react";
import { RouteComponentProps } from "react-router";
import {RoutePaths} from '../core/utils/path';

import AuthPage from "../pages/AuthPage";
import MainPage from "../pages/MainPage";
import { Map,Detail,EventList, Event ,Realty, RealtyContact, RealtyWrite} from "../pages/main";
export interface RouterServiceModel{
    path:string,
    component :  | ComponentType<RouteComponentProps<any>  & { routes?: RouterServiceModel[] }> | ComponentType<any> & {route?:RouterServiceModel[]}
    redirect?: string,
    title?: string,
    exact?: boolean,
    isAccess ?: boolean,
    children?: RouterServiceModel[],
    
}
export const MainPageRoute : RouterServiceModel[] =[
    {
        path : `${RoutePaths.main.index}/:modal?`,
        component : Map,
    },
    {
        path : `${RoutePaths.main.detail}/:modal?/:id`,
        component : Detail,
    },
    {
        path :`${RoutePaths.main.event.index}`,
        component : EventList
    },
    {
        path: `${RoutePaths.main.event.detail}/:id`,
        component : Event,
    },
    {
        path:`${RoutePaths.main.realty.index}`,
        component:Realty,
        redirect : RoutePaths.main.index,
        children:[
            {
                path :RoutePaths.main.realty.contact,
                component : RealtyContact
            },
            {
                path :`${RoutePaths.main.realty.write}/:id?` ,
                component : RealtyWrite
            },
        ]
    },
    {
        path: RoutePaths.main.mypage.index,
        component : Event,
    },
]

export const AppPageRoute : RouterServiceModel[]=[
    {
        path : RoutePaths.auth.index,
        component : AuthPage,
    },
    {
        path : RoutePaths.index,
        component : MainPage,
    },
]