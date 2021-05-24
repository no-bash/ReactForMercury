import React, {FC} from 'react';

interface AlertProps{
    message: string;
    onClose: ()=> void;
}

const  Alert: FC<AlertProps> = ({message, onClose}) =>{
    return(
        <div className="modal">
            <div className="modal-background" onClick={onClose}>
                <div className="modal-card">
                    <div className="header-modal">
                        <p className="modal-title">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
            <footer className="modal-card-footer">
                <button className="button" onClick={onClose}>Close</button>
            </footer>
        </div>
    )
}

export default Alert