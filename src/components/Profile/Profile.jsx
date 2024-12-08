import React, { useEffect, useState } from 'react';
import { supabase } from '../../SupabaseClient';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data);
        };

        fetchUser();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="profile-container">
            <h2>Welcome, {user.email}</h2>
            <p>Your ID: {user.id}</p>
        </div>
    );
};

export default Profile;
