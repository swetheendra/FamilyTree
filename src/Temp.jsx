import Header from './Header';
import './Profile.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

function Profile(props) {
    const location = useLocation()

    const family = props.family ?? location?.state?.family;
    const children = family?.children;
    const count = children?.length;
    const image= family?.image;


    return (
        <div className='page'>
            <Header />
            { !!family && <div className='profile'>
                <img src={require('./images/'+image)} />
                <div className='name'> {family.name} </div>
                {children?.map((child, index) => {
                    return (
                        <Link key = {child.id} to="/profile" state={{ family: child }}>{(index+1)+' child'}</Link>
                    );
                })}

                <Routes>
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
            }
        </div>
    );
}

export default Profile;