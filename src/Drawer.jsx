import { Box, Drawer, Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useForm } from "react-hook-form";

import './Drawer.css';

const DrawerComponent = ({openDrawer, setOpenDrawer, person, spouse}) => {
    const matches = useMediaQuery('(max-width:400px)');
    const width = matches ? "150px" : "350px";
    
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
          personFirstName: person?.firstName,
          personLastName: person?.lastName,
          spouseFirstName: spouse?.firstName,
          spouseLastName: spouse?.lastName,
          person
        }
      });

    const onSubmit = data => {
        console.log('data....', data);
    }

    return (
        <Drawer anchor="right" open={openDrawer} onClose={() => {setOpenDrawer(false)}}>
            <Box p={2} width={width} textAlign='center' role='presentation'>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                    <label for="person-first">FirstName: </label>
                                    <input id="person-first"{...register("personFirstName")}/>
                                </div>

                                <div>
                                    <label for="person-last">LastName: </label>
                                    <input id="person-last"{...register("personLastName")}/>
                                </div>

                                <div>
                                    <label>Enter Person Image File
                                        <input type="file" name="myImage" accept="image/png, image/gif, image/jpeg" />
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
                                    <label for="spouse-person-first">FirstName: </label>
                                    <input id="spouse-person-first"{...register("spouseFirstName")}/>
                                </div>

                                <div>
                                    <label for="spouse-person-last">LastName: </label>
                                    <input id="spouse-person-last"{...register("spouseLastName")}/>
                                </div>

                                <div>
                                    <label>Enter Spouse Image File
                                        <input type="file" accept=".png, .jpg, .jpeg" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Typography>
                    <Typography component='div'>
                        <div className="footer">
                            <div className="footer-buttons">
                                <input type="submit" onClick={() => {}} className="button" />
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