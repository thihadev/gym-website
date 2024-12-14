import { useMemo } from "react";
import DefaultAvatar from '../../assets/default-avatar.png';
import ManAvatar from '../../assets/man_gym.png';
import WomanAvatar from '../../assets/woman_gym.png';

const UserProfile = ({ user, toggleDropdown }) => {
    const avatar = useMemo(() => {
        if (!user) return DefaultAvatar;
        return user.gender === "Male" ? ManAvatar : WomanAvatar;
    }, [user]);

    return (
        <img
            src={avatar}
            alt="User Avatar"
            className="profile-avatar"
            onClick={toggleDropdown}
        />
    );
};
export default UserProfile;