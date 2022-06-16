import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'reduxStore/auth/authSlice';

export const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    return (
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nam
            dolor laboriosam tenetur ullam, velit in cum minima nesciunt aut,
            sunt commodi vel alias enim exercitationem, quae facere quos
            voluptates!
            <button type="button" onClick={handleLogout}>
                logout
            </button>
        </div>
    );
};
