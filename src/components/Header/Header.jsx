import './Header.css'
import { useState, useEffect } from 'react'
import Logo from '../../assets/logo.png'
import Bars from '../../assets/bars.png'
import { Link } from "react-scroll"

const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false)
    const [mobile, setMobile] = useState(window.innerWidth < 768)

    // Adjust menu based on window resize
    useEffect(() => {
        const handleResize = () => setMobile(window.innerWidth < 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="header" id="header">
            <img src={Logo} alt="logo img" className="logo" />

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
                </ul>
            )}

            {/* For mobile menu when clicked */}
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
                </ul>
            )}
        </div>
    )
}

export default Header
