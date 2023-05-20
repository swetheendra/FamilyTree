import { v4 as uuidv4 } from 'uuid';
import uploadFileToBlob from './blob/azure-storage-blob';

import {createPerson} from './util/DBHelper';

const addData = async (personFirstName, personLastName, gender, personImage, parentId, setLoading, addPerson, setImageOfPerson) => {

    setLoading(true);
    const pid = uuidv4();

    const person = {
        firstName: personFirstName,
        lastName: personLastName,
        gender,
        parent: parentId,
        personId: pid
    }

    const np = await createPerson(person);
    person.id = np.id;

    const newPerson = {
        [pid]: person
    }

    addPerson(newPerson);

    const personupl = await uploadFileToBlob(personImage, person.personId);
    if (!!personupl) {
        setImageOfPerson(`${person.personId}.png`, personupl._response.request.url);
    }

    setLoading(false);
};

export default addData;