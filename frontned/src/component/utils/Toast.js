import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const showToast = (status, message) => {

    switch (status) {

        case 'success':
            toast.success(message, {
                position: "top-right",
                autoClose: 2001,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            break;

        case 'danger':
            toast.error(message, {
                position: "top-right",
                autoClose: 2001,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            break;

        case 'warning':
            toast.warning(message, {
                position: "top-right",
                autoClose: 2001,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            break;

        default:
            toast.info(message, {
                position: "top-right",
                autoClose: 2001,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            break;
    }

}

