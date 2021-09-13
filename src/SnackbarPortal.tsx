import ReactDom from 'react-dom';
type Props={
    children: React.ReactNode;
}

const SnackbarPortal=({children} :Props )=>{
    const el : any = document.getElementById('snackbar');
    return ReactDom.createPortal(children, el);
}

export default SnackbarPortal