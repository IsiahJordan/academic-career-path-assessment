import { ReactNode } from "react";
import "./Alert.css"

interface Props {
  children: ReactNode;
  onClose: ()=> void;
}
                //destructure
const Alert = ({ children , onClose}: Props) => {
  return (
    <div className="AlertContainer" >
        <div className="alert alert-primary alert-dismissible"> 
            {children}
        <button type="button" className="btn-close" onClick={onClose} data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
     </div>
    
  );
};

export default Alert;
