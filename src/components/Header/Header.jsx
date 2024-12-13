import './Header.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import Logo from '../../assets/logo.png';
import Bars from '../../assets/bars.png';
import { Link } from "react-scroll";
import Modal from '../Modal';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import DefaultAvatar from '../../assets/default-avatar.png';
import axios from 'axios';

const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [mobile, setMobile] = useState(window.innerWidth < 768);
    const [showModal, setShowModal] = useState(false);
    const [isSignUpPage, setIsSignUpPage] = useState(false); // Track which page to display
    const [user, setUser] = useState(null); // Track current user
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate(); // For navigation after login/logout

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        console.log(token);
        
        if (token) {
            axios.get('http://localhost:8000/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(response => {
                setUser(response.data.data);  // Set user profile data
            })
            .catch(error => {
                console.error('Error fetching profile', error);
                setUser(null);  // Clear user if error occurs
                localStorage.removeItem('accessToken');  // Clear token
            });
        }
    }, []);

    // Logout user
    const handleLogout = async () => {
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
            console.log('No access token found');
            return; // No token found, can't log out
        }

        axios.get('http://localhost:8000/api/logout', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            setUser(response.data);  // Set user profile data
        })
        .catch(error => {
            console.error('Error fetching profile', error);
            setUser(null);  // Clear user if error occurs
            localStorage.removeItem('accessToken');  // Clear token
        });
    
        try {
            // Send logout request with the token in the Authorization header
            await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in header
                },
            });
    
            // On success, remove the token from localStorage and reset user state
            localStorage.removeItem('accessToken');
            setUser(null); // Reset the user state
            navigate('/'); // Redirect to home page or login page
        } catch (error) {
            console.error('Logout failed', error);
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
                        {/* Show user profile if logged in */}
                        <li className="profile-section">
                            <img
                                src={user?.avatar || DefaultAvatar}
                                alt="User Avatar"
                                className="profile-avatar"
                                onClick={toggleDropdown}
                            />
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <p className="dropdown-user">{user?.name || user.email}</p>
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
                            onSuccess={() => setIsSignUpPage(false)}
                        />
                    ) : (
                        <SignIn
                            switchToSignUp={() => setIsSignUpPage(true)}
                            onSuccess={() => {
                                // Update the user immediately after successful login
                                const token = localStorage.getItem('accessToken');
                                if (token) {
                                    axios.get('http://localhost:8000/api/profile', {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        }
                                    })
                                    .then(response => {
                                        setUser(response.data.data);  // Set user profile data
                                        setShowModal(false);
                                    })
                                    .catch(error => {
                                        console.error('Error fetching profile', error);
                                    });
                                }
                            }}
                        />
                    )}
                </Modal>
            )}
        </div>
    );
};

export default Header;
