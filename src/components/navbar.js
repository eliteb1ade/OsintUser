// components/Navbar.js
import { Github } from 'lucide-react';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                Osint<span className="logo-accent">User</span>
            </div>
            <a 
                href="https://github.com/eliteb1ade" 
                className="navbar-link" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <Github size={20} />
            </a>
        </nav>
    );
}

export default Navbar;
