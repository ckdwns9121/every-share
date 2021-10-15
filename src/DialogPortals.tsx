import ReactDom from 'react-dom';
interface Props{
    children: React.ReactNode;
}

const DialogPortals=({children} :Props )=>{
    const el : any = document.getElementById('dialog');
    return ReactDom.createPortal(children, el);
}

export default DialogPortals;