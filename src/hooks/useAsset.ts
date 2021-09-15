import { useSelector,useDispatch } from "react-redux";
import {RootState} from '../store';

import { onLoading } from "../store/loading";
import { onSnackbar,offSnackbar } from "../store/snackbar";
import { onDialog,offDialog} from '../store/dialog';


/* 스낵바 훅*/
export const useSnackbar =()=>{
    const dispatch = useDispatch();

    const handleOpen =(message:string,open:boolean,up:boolean,variant:string )=>{
        dispatch(onSnackbar({message,open,up,variant}));
        setTimeout(()=>{
            dispatch(offSnackbar());
        },3000)
    }
   
    const handleClose=()=>{
        dispatch(offSnackbar());
    }
   
    return [handleOpen,handleClose];
}

/* 로딩 훅*/
export const useLoading =()=>{
    const {loading} = useSelector((state:RootState) =>state.loading);
    const dispatch = useDispatch();
   
    const handleLoading =(type:boolean)=>{
        dispatch(onLoading(type));
    }
   
    return{loading,handleLoading}
}

export const useDialog =()=>{

    const dispatch = useDispatch();
    const openDialog =(title:string,message:string,isConfirm:boolean,onClick:()=>void | Promise<void>, onClose:()=>void)=>{
        dispatch(onDialog({open:true,title,message,isConfirm,onClick,onClose}))
    }
    return openDialog;
}

export default useSnackbar;