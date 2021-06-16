import React from 'react';
import styles from './ContractModal.module.scss';

//material
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import DialogContent from '@material-ui/core/DialogContent';


//hooks
import {useStylesDark} from '../../hooks/useStyles';
import { useHistory } from 'react-router';



const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContractModal({open,url} :{
  open:boolean, 
  url?: string
}) {
  const classes = useStylesDark();
  const history = useHistory();

  return (
      <Dialog  
      fullScreen 
      open={open} 
      TransitionComponent={Transition}
      >
        <DialogContent className={classes.content} style={{padding:'0 20px'}}>
            <div className={styles['container']}> 
              <div className={styles['contract-img']}
                          style={{
                            backgroundImage: `url(${url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
              >

              </div>
            </div>  
        </DialogContent>
      </Dialog>
 
  );
}