import { Box, Drawer, Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import addData from './AddData';
import MoonLoader from "react-spinners/MoonLoader";

import './ChildDrawer.css';
import { useState  } from "react"

const ChildDrawer = ({openChildDrawer, setOpenChildDrawer, parentId, addPerson, setImageOfPerson}) => {
    const [personFirstName, setPersonFirstName] = useState(); 
    const [personLastName, setPersonLastName] = useState();
    const [fileSelected, setFileSelected] = useState();
    const [gender, setGender] = useState('Male');

    const [loading, setLoading] = useState(false);

    const matches = useMediaQuery('(max-width:400px)');
    const width = matches ? "150px" : "350px";

    const handleChange = (e) => {
        setGender( e.target.value);
    }

    const onFileChange = (event) => {
        setFileSelected(event.target.files[0]);
    };

    const onSubmit = async () => {
        if(!!personFirstName) {
            await addData(personFirstName, personLastName, gender, fileSelected, parentId, setLoading, addPerson, setImageOfPerson);
        }
        setOpenChildDrawer(false);
    };

    const override = {
        position: "absolute",
        top: "40%",
        left: "80%",
        borderColor: "blue",
        zIndex: '100000000'
      };

    return (
        <>
            <Drawer anchor="right" open={openChildDrawer} onClose={() => {setOpenChildDrawer(false)}}>
                <Box p={2} width={width} textAlign='center' role='presentation'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                    }}>

                    <Typography component='div' variant="h6">
                        <h4 className="bold">
                            Add a child
                        </h4>
                    </Typography>

                    <div className="left">
                        <span className="bold">
                            Enter child details
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
                                    <label>Gender: </label>
                                    <select onChange={(e) => {
                                        handleChange(e);
                                    }}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                <div>
                                    <label>Enter Person Image File
                                        <input type="file" name="myImage" accept="image/png, image/gif, image/jpeg" onChange={onFileChange} />
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
                                <button onClick={() => setOpenChildDrawer(false)} className="button">Cancel</button>
                            </div>
                        </div>
                    </Typography>
                    </form>
                </Box>
            </Drawer>
            <MoonLoader
                color="#000000"
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
                cssOverride={override}
            />
        </>
    );
};

export default ChildDrawer;