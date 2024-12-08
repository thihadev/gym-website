import './Header.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import Logo from '../../assets/logo.png';
import Bars from '../../assets/bars.png';
import { Link } from "react-scroll";
import Modal from '../Modal';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import { supabase } from '../../SupabaseClient'; // Import Supabase client
import DefaultAvatar from '../../assets/default-avatar.png';

const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [mobile, setMobile] = useState(window.innerWidth < 768);
    const [showModal, setShowModal] = useState(false);
    const [isSignUpPage, setIsSignUpPage] = useState(false); // Track which page to display
    const [user, setUser] = useState(null); // Track current user
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate(); // For navigation after login/logout

    // Fetch user session and listen for changes
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user);
        };
        
        fetchUser(); // Initial fetch when component mounts
        
        // Listen for auth state changes
        const authListener = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                setUser(session?.user || null); // Update user state
            }
        });
        
        // No need to manually unsubscribe; Supabase will clean up automatically when the component is unmounted
        return () => {
            authListener?.subscription?.unsubscribe(); // Optionally call unsubscribe if necessary
        };
    }, []);
    
    // Logout user
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setUser(null); // Clear user state on logout
            setDropdownOpen(false);
            navigate('/'); // Optionally navigate to home or other page after logout
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    // Open Sign-In modal
    const openSignIn = () => {
        setIsSignUpPage(false); // Open Sign-in page
        setShowModal(true);
    };

    return (
        <div className="header" id="header">
            <img src={Logo} alt="logo img" className="logo" />

            {/* Hamburger menu for mobile */}
            {mobile ? (
                <div className="hamburger-menu" onClick={() => setMenuOpened(!menuOpened)}>
                    <img src={Bars} alt="menu icon" style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
            ) : (
                <ul className="header-menu">
                <li>
                    <Link to="hero" spy={true} smooth={true}>Hero</Link>
                </li>
                <li>
                    <Link to="programs" spy={true} smooth={true}>Programs</Link>
                </li>
                <li>
                    <Link to="reasons" spy={true} smooth={true}>Reasons</Link>
                </li>
                <li>
                    <Link to="plans" spy={true} smooth={true}>Plans</Link>
                </li>
                <li>
                    <Link to="testimonials" spy={true} smooth={true}>Testimonials</Link>
                </li>
                {user ? (
                    <>
                     <li className="profile-section">
                        <img
                            src={user?.user_metadata?.avatar_url || DefaultAvatar}
                            alt="User Avatar"
                            className="profile-avatar"
                            onClick={toggleDropdown}
                        />
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <p className="dropdown-user">{user?.user_metadata?.name || user.email}</p>
                                <button onClick={handleLogout} className="logout-btn">Logout</button>
                            </div>
                        )}
                    </li>
                    </>
                ) : (
                    <li>
                        <Link onClick={openSignIn} className="signin-btn">
                            Login / Register
                        </Link>
                    </li>
                )}
            </ul>
            
            )}

            {/* Mobile menu (only visible when menuOpened state is true) */}
            {menuOpened && mobile && (
                <ul className={`header-menu open`}>
                    <li>
                        <Link onClick={() => setMenuOpened(false)} to="hero" spy={true} smooth={true}>Hero</Link>
                    </li>
                    <li>
                        <Link onClick={() => setMenuOpened(false)} to="programs" spy={true} smooth={true}>Programs</Link>
                    </li>
                    <li>
                        <Link onClick={() => setMenuOpened(false)} to="reasons" spy={true} smooth={true}>Reasons</Link>
                    </li>
                    <li>
                        <Link onClick={() => setMenuOpened(false)} to="plans" spy={true} smooth={true}>Plans</Link>
                    </li>
                    <li>
                        <Link onClick={() => setMenuOpened(false)} to="testimonials" spy={true} smooth={true}>Testimonials</Link>
                    </li>

                    <li>
                        <Link onClick={() => setMenuOpened(false)} to="signup" spy={true} smooth={true}>Sign Up</Link>
                    </li>
                </ul>
            )}

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {isSignUpPage ? (
                        <SignUp
                            switchToSignIn={() => setIsSignUpPage(false)}
                            onSuccess={() => setShowModal(false)}
                        />
                    ) : (
                        <SignIn
                            switchToSignUp={() => setIsSignUpPage(true)}
                            onSuccess={() => setShowModal(false)}
                        />
                    )}
                </Modal>
            )}
        </div>
    );
};

export default Header;
