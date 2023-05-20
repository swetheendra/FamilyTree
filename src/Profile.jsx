import Header from './Header';
import './Profile.css';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {Gender} from './util/Constants';
import { useState } from 'react';
import DrawerComponent from './Drawer';
import DisplayImagesFromContainer from './ContainerImages';

function Profile(props) {
    const { persons, mappings, blobList, isAdmin, addPerson, setImageOfPerson} = props || {};
    const param = useParams();;
    const id = props.id ?? param?.id;
    
    const person = persons?.[id];
    const children = mappings?.[id];
    const parent = person?.parent;
    const parentPerson =  parent != null ? persons[parent] : null;

    const spouse = person?.spouse;
    const spousePerson = spouse != null ? persons[spouse] : null;

    const femaleChildren = children?.filter(childId => {
        const child = persons[childId];
        const gender = child.gender;
        return gender === Gender.Female;
    });

    const maleChildren = children?.filter(childId => {
        const child = persons[childId];
        const gender = child.gender;
        return gender === Gender.Male;
    });

    const doesMaleChildExist = (!!maleChildren && maleChildren.length > 0);
    const doesFemaleChildExist = (!!femaleChildren && femaleChildren.length > 0);
    const doesBothTypesOfChildrenExist = doesFemaleChildExist && doesMaleChildExist;

    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <div className='screen'>
            <div className='page'>
                <Header />
                {!!person && openDrawer && <DrawerComponent openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} person={person} spouse={spousePerson} addPerson={addPerson} setImageOfPerson={setImageOfPerson}/> }
                { !!person && <div className='profile'>
                        {!!parentPerson && 
                            <div className='parentLink'>
                                <Link key = {parent} to={`/profile/${parent}`}>
                                    <img src={require('./images/uparrow.png')} alt="arrow" width="20" height="20"/>
                                </Link>
                            </div>
                        }
                        <span className='section'>
                            <div className='persons'>
                                <div className='person-details'>
                                    <DisplayImagesFromContainer blobList={blobList} id={id}/>
                                    <div className='name'> {person.firstName} </div>
                                </div>

                                {!!person.spouse && !!spousePerson &&
                                    <div className='person-details'>
                                        <DisplayImagesFromContainer blobList={blobList} id={spouse}/>
                                        <div className='name'> 
                                            {spousePerson.firstName}
                                            {(!!spousePerson.lastName && !!spousePerson.Gender === Gender.Male) ? ` ${spousePerson.lastName}` : ""} 
                                        </div>
                                    </div>
                                }
                            </div>
                            { isAdmin && <button className='update-button' onClick={() => setOpenDrawer(true)}>Edit Profile</button>}
                        </span>
                    </div>
                }
            </div>

            { doesBothTypesOfChildrenExist && 
                <div className='links'>
                    <div className='female-links'>
                        {femaleChildren?.map((childId, index) => {
                            const child = persons[childId];
                            const childName = child.firstName;
                            return (
                                <Link className="child-link" key = {childId} to={`/profile/${childId}`}>{childName}</Link>
                            );
                        })} 
                    </div>  
                    <div className='male-links'>
                        {maleChildren?.map((childId, index) => {
                            const child = persons[childId];
                            const childName = child.firstName;
                            return (
                                <Link className="child-link" key = {childId} to={`/profile/${childId}`}>{childName}</Link>
                            );
                        })} 
                    </div>      
                </div>
            }

            {
                !doesBothTypesOfChildrenExist && 
                    (
                        doesFemaleChildExist ? (
                            <div className='only-link-parent'>
                                <div className='female-links-only'>
                                    {femaleChildren?.map((childId, index) => {
                                        const child = persons[childId];
                                        const childName = child.firstName;
                                        return (
                                            <Link className="child-link-only" key = {childId} to={`/profile/${childId}`}>{childName}</Link>
                                        );
                                    })} 
                                </div> 
                            </div>
                        ) : (
                            <div className='only-link-parent'> 
                                <div className='male-links-only'>
                                {maleChildren?.map((childId, index) => {
                                    const child = persons[childId];
                                    const childName = child.firstName;
                                    return (
                                        <Link className="child-link-only" key = {childId} to={`/profile/${childId}`}>{childName}</Link>
                                    );
                                })} 
                                </div> 
                            </div>
                        )
                    )
            }

        </div>
    );
}

export default Profile;
