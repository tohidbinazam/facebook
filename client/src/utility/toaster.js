import { toast } from 'react-toastify';

const toaster = (msg, reason) => {
    switch (reason) {
        case 'success':
        return toast.success(msg);
        
        case 'error':
        return toast.error(msg);

        case 'warning':
        return toast.warning(msg);

        case 'info':
        return toast.info(msg);
        
        default:
        toast(msg);
    }
}

export default toaster