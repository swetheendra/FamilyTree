import './Entry.css';
import {Link} from 'react-router-dom';
import {ParentPersonId} from './util/Constants';
import { useEffect, useState } from 'react';
import { readPersons, readDatabase, createDatabase } from './util/DBHelper';
import { getParentChildMappings } from './util/personHelper';

function Entry() { 

    const [persons, setPersons] = useState([]);
    const [mappings, setMappings] = useState({});

    useEffect(() => {
        createDatabase()
        .then(() => {
            readDatabase();
        })
        .then(() => {;
            return readPersons();
        })
        .then((objects) => {
            const relations = getParentChildMappings(objects);
            setPersons(objects);
            setMappings(relations);
        })
    }, [])

    return(
        <div className='entry-body'>
            <div className='entry-elements'>
                <span className='entry-header'>
                    <span className='entry-body-text'>
                        Tallamraju Family Tree 
                    </span>
                    <img src={require('./images/tree.png')} alt="tree" width="32" height="40"/>
                </span>
                
            </div>
            <span className='entry-tree-image'>
                <Link to={`/profile/${ParentPersonId}`} state={{persons: persons, mappings: mappings}}>
                    <span className='arrow'>
                        <img src={require('./images/rightArrow.png')} alt="tree" width="32" height="40"/>
                    </span>
                </Link>
            </span>
        </div>
    );
}

export default Entry;