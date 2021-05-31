import { ComponentType } from "react";
import { RouteComponentProps } from "react-router";
import {RoutePaths} from '../core/utils/path';

import MapPage from '../pages/MainPage';
import DetailPage from '../pages/main/DetailPage';

export interface RouterServiceModel{
    path:string,
    component : 
    | ComponentType<RouteComponentProps<any>  & { routes?: RouterServiceModel[] }> 
    | ComponentType<any> & {route?:RouterServiceModel[]}
    redirect?: string,
    title?: string,
    exact?: boolean,
    sideProps?:{
        onClick? : ()=>void;
    }
}

export const MainPageRoute : RouterServiceModel[] =[
    {
        path : RoutePaths.main.index,
        component : MapPage,
    },
    {
        path : RoutePaths.main.detail,
        component : DetailPage,
    }
]