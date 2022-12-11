import { toast } from 'react-toastify';

const toaster = (msg, reason = 'error') => {
    switch (reason) {
        case 'error':
        return toast.error(msg);

        case 'success':
        return toast.success(msg);
        
        case 'warning':
        return toast.warning(msg);

        case 'info':
        return toast.info(msg);
        
        default:
        return toast(msg);
    }
}

export default toaster