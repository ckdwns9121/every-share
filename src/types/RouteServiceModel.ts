import { ComponentType } from "react";
import { RouteComponentProps } from "react-router";
import {RoutePaths} from '../core/utils/path';

import MapPage from '../containers/main/MapContainer';
import DetailPage from '../containers/main/DetailContainer';

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
        path : RoutePaths.main.index,
        component : MapPage,
    },
    {
        path : `${RoutePaths.main.detail}/:id`,
        component : DetailPage,
    },
]