import './Entry.css';
import {Link} from 'react-router-dom';
import {ParentPersonId} from './util/Constants';


function Entry() { 

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
                <Link to={`/profile/${ParentPersonId}`}>
                    <span className='arrow'>
                        <img src={require('./images/rightArrow.png')} alt="tree" width="32" height="40"/>
                    </span>
                </Link>
            </span>
        </div>
    );
}

export default Entry;