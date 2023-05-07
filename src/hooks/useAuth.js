import { useEffect } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigation = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('jwt');
        if (!token) {
            navigation('/login');
        }
    }, [navigation]);

    return;
};

export default useAuth;
