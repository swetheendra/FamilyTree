import './App.css';
import {Link} from 'react-router-dom';
function Header() {
    return (
        <div className="header">
            <Link className="home" to={`/`} >Home</Link>
            <span className="heading">
                Tallamraju Family Tree
            </span>
        </div>
    );
}

export default Header;
