// import './Header.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import Logo from "../../assets/logo.png";
import Bars from "../../assets/bars.png";
// import { Link } from "react-router-dom";
import { Link } from "react-scroll";
import Modal from "../Modal";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import axios from "../../axios";
import ProfileDropdown from "../ProfileDropdown";

const HomeHeader = () => {
  const token = localStorage.getItem("accessToken");
  const token_init = token ? token : null;
  const [menuOpened, setMenuOpened] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [showModal, setShowModal] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false); // Track which page to display
  const [user, setUser] = useState(token_init); // Track current user

  const navigate = useNavigate(); // For navigation after login/logout

  useEffect(() => {
    if (token) {
      axios
        .get("profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.data); // Set user profile data
        })
        .catch((error) => {
          console.error("Error fetching profile", error);
          setUser(null);
          localStorage.removeItem("accessToken"); // Clear token
        });
    }

    const handleResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [token]);

  // Logout user
  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      // Send logout request with the token in the Authorization header
      await axios.post(
        "logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in header
          },
        }
      );

      // On success, remove the token from localStorage and reset user state
      localStorage.removeItem("accessToken");
      setUser(null); // Reset the user state
      navigate("/"); // Redirect to home page or login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  // Open Sign-In modal
  const openSignIn = () => {
    setIsSignUpPage(false); // Open Sign-in page
    setShowModal(true);
  };

  return (
    
    <div className="flex justify-between items-center p-4 text-white relative">
    {/* Logo */}
    <img src={Logo} alt="logo img" className="w-32" />

    {/* Desktop Navigation and Profile */}
    {!mobile && (
      <div className="flex items-center gap-4">
        {/* Navigation Links */}
        <ul className="flex gap-4 items-center font-semibold">
          <li className="p-4">
            <Link
              to="hero"
              smooth={true}
              className="cursor-pointer hover:text-gray-400"
            >
              Home
            </Link>
          </li>
          <li className="p-4">
            <Link
              to="programs"
              smooth={true}
              className="cursor-pointer hover:text-gray-400"
            >
              Programs
            </Link>
          </li>
          <li className="p-4">
            <Link
              to="reasons"
              smooth={true}
              className="cursor-pointer hover:text-gray-400"
            >
              Reasons
            </Link>
          </li>
          <li className="p-4">
            <Link
              to="plans"
              smooth={true}
              className="cursor-pointer hover:text-gray-400"
            >
              Plans
            </Link>
          </li>
          <li className="p-4">
            <Link
              to="testimonials"
              smooth={true}
              className="cursor-pointer hover:text-gray-400"
            >
              Testimonials
            </Link>
          </li>
        </ul>

        {/* Profile or Login */}
        {user ? (
          <ProfileDropdown user={user} handleLogout={handleLogout} />
        ) : (
          <button
            onClick={openSignIn}
            className="cursor-pointer font-bold text-gray-800 bg-white border rounded-full px-4 py-2 hover:bg-gray-200"
          >
            Login
          </button>
        )}
      </div>
    )}

    {/* Mobile Hamburger Menu */}
    {mobile && (
      <div
        className="flex items-center justify-center p-2 rounded cursor-pointer md:hidden"
        onClick={() => setMenuOpened(!menuOpened)}
      >
        <img src={Bars} alt="menu icon" className="w-6 h-6" />
      </div>
    )}

    {/* Mobile Dropdown Menu */}
    {menuOpened && mobile && (
      <ul className="absolute top-16 left-0 w-full bg-gray-700 text-white flex flex-col items-center py-4 gap-4 z-50">
        <li className="p-4">
          <Link
            onClick={() => setMenuOpened(false)}
            to="hero"
            smooth={true}
            className="cursor-pointer hover:text-gray-300"
          >
            Home
          </Link>
        </li>
        <li className="p-4">
          <Link
            onClick={() => setMenuOpened(false)}
            to="programs"
            smooth={true}
            className="cursor-pointer hover:text-gray-300"
          >
            Programs
          </Link>
        </li>
        <li className="p-4">
          <Link
            onClick={() => setMenuOpened(false)}
            to="reasons"
            smooth={true}
            className="cursor-pointer hover:text-gray-300"
          >
            Reasons
          </Link>
        </li>
        <li className="p-4">
          <Link
            onClick={() => setMenuOpened(false)}
            to="plans"
            smooth={true}
            className="cursor-pointer hover:text-gray-300"
          >
            Plans
          </Link>
        </li>
        <li className="p-4">
          <Link
            onClick={() => setMenuOpened(false)}
            to="testimonials"
            smooth={true}
            className="cursor-pointer hover:text-gray-300"
          >
            Testimonials
          </Link>
        </li>

        {/* Mobile Login Button */}
        {!user && (
          <li className="p-4">
            <button
              onClick={() => {
                setMenuOpened(false);
                openSignIn();
              }}
              className="w-full text-center font-bold text-gray-800 bg-white border rounded-full px-4 py-2 hover:bg-gray-200"
            >
              Login
            </button>
          </li>
        )}

        {/* Mobile Profile Dropdown (Optional) */}
        {user && (
          <li className="p-4">
          <Link
            onClick={handleLogout}
            smooth={true}
            className="cursor-pointerw-full text-center font-bold text-gray-800 bg-white border rounded-full px-4 py-2 hover:bg-gray-200"
          >
            Logout
          </Link>
        </li>
         
        )}
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
                const token = localStorage.getItem("accessToken");

                if (token) {
                  axios
                    .get("profile", {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                    .then((response) => {
                      setUser(response.data.data);
                      setShowModal(false);
                    })
                    .catch((error) => {
                      console.error("Error fetching profile", error);
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

export default HomeHeader;
