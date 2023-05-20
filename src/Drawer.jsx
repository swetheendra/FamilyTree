import { Box, Drawer, Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import saveData from './SaveData';

import './Drawer.css';
import { useState } from "react";

const DrawerComponent = ({openDrawer, setOpenDrawer, person, spouse, addPerson, setImageOfPerson}) => {
    const matches = useMediaQuery('(max-width:400px)');
    const width = matches ? "150px" : "350px";

    const [personFirstName, setPersonFirstName] = useState(person?.firstName); 
    const [personLastName, setPersonLastName] = useState(person?.lastName); 
    const [spouseFirstName, setSpouseFirstName] = useState(spouse?.firstName); 
    const [spouseLastName, setSpouseLastName] = useState(spouse?.lastName); 

    const [fileSelected, setFileSelected] = useState();
    const [spouseFileSelected, setSpouseFileSelected] = useState();
    
    const onSubmit = async () => {
        await saveData(person,spouse,personFirstName, personLastName, spouseFirstName, spouseLastName, fileSelected, spouseFileSelected, addPerson, setImageOfPerson);
        setOpenDrawer(false);
    }

    const onFileChange = (event) => {
        setFileSelected(event.target.files[0]);
    };

    const onSpouseFileChange = (event) => {
        setSpouseFileSelected(event.target.files[0]);
    };

    return (
        <Drawer anchor="right" open={openDrawer} onClose={() => {setOpenDrawer(false)}}>
            <Box p={2} width={width} textAlign='center' role='presentation'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    }}>
                    <Typography component='div' variant="h6">
                        <h4 className="bold">
                            Edit Personal Profile
                        </h4>
                    </Typography>
                    <div className="left">
                        <span className="bold">
                            Edit person details
                        </span>
                    </div>
                    <Typography component='div'>
                        <div className="heading left">
                            <div className="elements">
                                <div>
                                    <label htmlFor="person-first">FirstName: </label>
                                    <input id="person-first" value={personFirstName} onChange={(e) => setPersonFirstName(e.target.value)}/>
                                </div>

                                <div>
                                    <label htmlFor="person-last">LastName: </label>
                                    <input id="person-last" value={personLastName} onChange={(e) => setPersonLastName(e.target.value)}/>
                                </div>

                                <div>
                                    <label>Enter Person Image File
                                        <input type="file" name="myImage" accept="image/png, image/gif, image/jpeg" onChange={onFileChange} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Typography>
                    <div className="left">
                        <span className="bold">
                            Edit spouse details
                        </span>
                    </div>
                    <Typography component='div'>
                        <div className="heading left">
                            <div className="elements">
                                <div>
                                    <label htmlFor="spouse-person-first">FirstName: </label>
                                    <input id="spouse-person-first" value={spouseFirstName} onChange={(e) => setSpouseFirstName(e.target.value)}/>
                                </div>

                                <div>
                                    <label htmlFor="spouse-person-last">LastName: </label>
                                    <input id="spouse-person-last" value={spouseLastName} onChange={(e) => setSpouseLastName(e.target.value)}/>
                                </div>

                                <div>
                                    <label>Enter Spouse Image File
                                        <input type="file" name="spouseImage" accept="image/png, image/gif, image/jpeg" onChange={onSpouseFileChange} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Typography>
                    <Typography component='div'>
                        <div className="footer">
                            <div className="footer-buttons">
                                <input type="submit" onClick={() => {
                                    onSubmit();
                                }} className="button" />
                                <button onClick={() => setOpenDrawer(false)} className="button">Cancel</button>
                            </div>
                        </div>
                    </Typography>
                </form>
            </Box>
        </Drawer>
    );
};

export default DrawerComponent;