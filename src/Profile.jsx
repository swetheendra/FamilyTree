import Header from './Header';
import './Profile.css';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Members, {Children} from './data/family';

function Profile(props) {
    const ob = useParams();
    console.log('props....', props, ' ',ob);
    const id = props.id ?? ob?.id;
    const family = Members[id];
    const children = Children[id];
    const image= family?.image;
    const parent = family?.parent;
    const parentPerson =  parent != null ? Members[parent] : null;
    const spouse = family?.spouse;
    const spousePerson = spouse != null ? Members[spouse] : null;
    const spouseImage = spousePerson?.image;

    return (
        <div className='screen'>
            <div className='page'>
                <Header />
                { !!family && <div className='profile'>
                        {!!parentPerson && 
                            <div className='parentLink'>
                                <Link key = {parent} to={`/profile/${parent}`} >
                                    <img src={require('./images/uparrow.png')} alt="arrow" width="20" height="20"/>
                                </Link>
                            </div>
                        }
                        <div className='persons'>
                            <div className='person-details'>
                                <img src={require('./images/'+image)} alt="profileImage" width="200" height="200"/>
                                <div className='name'> {family.firstName} </div>
                            </div>

                            {!!family.spouse && 
                                <div className='person-details'>
                                    <img src={require('./images/'+spouseImage)} alt="spouseImage" width="200" height="200"/>
                                    <div className='name'> 
                                        {spousePerson.firstName}
                                        {!!spousePerson.lastName ? ` ${spousePerson.lastName}` : ""} 
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>

            <div className='links'>
                {children?.map((childId, index) => {
                    const child = Members[childId];
                    const childName = child.firstName;
                    return (
                        <Link className="child-link" key = {childId} to={`/profile/${childId}`} >{childName}</Link>
                    );
                })}
                        
            </div>
        </div>
    );
}

export default Profile;
