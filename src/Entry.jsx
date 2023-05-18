import './Entry.css';
import {Link} from 'react-router-dom';
import {ParentPersonId} from './util/Constants';
import { useEffect, useState } from 'react';
import { readPersons, readDatabase, createDatabase } from './util/DBHelper';
import { getParentChildMappings } from './util/personHelper';
import { getBlobsInContainer } from './blob/azure-storage-blob';
import jwt_decode from "jwt-decode";

function Entry() { 

    const [persons, setPersons] = useState([]);
    const [mappings, setMappings] = useState({});
    const [blobList, setBlobList] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {

        const prom1 = getBlobsInContainer();

        const prom2 = createDatabase()
        .then(() => {
            readDatabase();
        })
        .then(() => {;
            return readPersons();
        });

        const prom3 = fetch("https://tallamrajutree.azurewebsites.net/.auth/me",{
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(resp => resp.json());

        Promise.all([prom1, prom2, prom3]).then(values => {
            const blobList = values[0];
            const objects = values[1];
            const data = values[2];

            const relations = getParentChildMappings(objects);
            setPersons(objects);
            setMappings(relations);
            setBlobList(blobList);

            const token = data[0].id_token;
            const decoded = jwt_decode(token);
            const hasRole = decoded?.roles?.includes("App.Writer");
            setIsAdmin(hasRole);
        })
        .catch((err) => {
            console.log('error.....', err);
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
                <Link to={`/profile/${ParentPersonId}`} state={{persons: persons, mappings: mappings, blobList: blobList, isAdmin: isAdmin}}>
                    <span className='arrow'>
                        <img src={require('./images/rightArrow.png')} alt="tree" width="32" height="40"/>
                    </span>
                </Link>
            </span>
        </div>
    );
}

export default Entry;