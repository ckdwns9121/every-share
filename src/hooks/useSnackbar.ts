import { snackbar_open,snackbar_close } from "../store/snackbar";
import {useDispatch} from 'react-redux';

const useSnackbar =()=>{
    const dispatch = useDispatch();

    const handleOpen =(message:string,open:boolean,up:boolean,variant:string )=>{
        dispatch(snackbar_open({message,open,up,variant}));
        setTimeout(()=>{
            dispatch(snackbar_close());
        },3000)
    }
    const handleClose=()=>{
        dispatch(snackbar_close());
    }
    return [handleOpen,handleClose];
}


export default useSnackbar;