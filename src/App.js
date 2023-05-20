import Profile from './Profile';
import { Route, Routes } from 'react-router-dom';
import Entry from './Entry';
import { useEffect, useState } from 'react';
import { readPersons, readDatabase, createDatabase } from './util/DBHelper';
import { getParentChildMappings } from './util/personHelper';
import { getBlobsInContainer } from './blob/azure-storage-blob';
import jwt_decode from "jwt-decode";

function App() {

  const [persons, setPersons] = useState({});
  const [mappings, setMappings] = useState({});
  const [blobList, setBlobList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const addPerson = (newPerson) => {
    setPersons({...persons, ...newPerson});
  }

  useEffect(() => {
    const relations = getParentChildMappings(persons);
    setMappings(relations);
  }, [persons])

  const setImageOfPerson = (name, url) => {
    const filteredList = blobList.filter((blob) => blob.name !== name);
    setBlobList([...filteredList, {name,url}]);
  }
  
  useEffect(() => {

    const prom1 = getBlobsInContainer();

    const prom2 = createDatabase()
    .then(() => {
        readDatabase();
    })
    .then(() => {;
        return readPersons();
    });

    const prom3 = fetch("https://tallamrajutreestructure.azurewebsites.net/.auth/me",{
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

  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Entry} render={(props) => <Entry {...props} />}  />
        <Route path='/profile/:id' element={<Profile persons = {persons} mappings = { mappings} blobList = {blobList} isAdmin = {isAdmin} addPerson={addPerson} setImageOfPerson={setImageOfPerson}/>} />
      </Routes>
    </div>
  );
}

export default App;
