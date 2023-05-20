import uploadFileToBlob from './blob/azure-storage-blob';

import {updatePerson, createPerson} from './util/DBHelper';
import {getOppositeGender} from './util/personHelper';
import { v4 as uuidv4 } from 'uuid';

async function saveData(person, spouse, firstName, lastName, spouseFN,  spouseLN, personImage, spouseImage, addPerson, setImageOfPerson)
{
    const isSpouseDefined = !!spouseFN; 
    const shouldCreateSpouse = (spouse == null);
    if(shouldCreateSpouse && isSpouseDefined) {
        const pid = uuidv4();
        spouse = {
            firstName: spouseFN,
            lastName: spouseLN,
            gender: getOppositeGender(person),
            personId: pid
        }
        const np = await createPerson(spouse);
        spouse.id = np.id;
        person.spouse = pid;

        const newPerson = {
            [pid]: spouse
        }

        addPerson(newPerson);
    } else if (isSpouseDefined){
        spouse.firstName = spouseFN;
        spouse.lastName = spouseLN;
        await updatePerson(spouse);
    }

    person.firstName = firstName;
    person.lastName = lastName;
    person = await updatePerson(person);

    const personupl = await uploadFileToBlob(personImage, person.personId);
    if (!!personupl) {
        setImageOfPerson(`${person.personId}.png`, personupl._response.request.url);
    }

    if (isSpouseDefined) {
        const upl = await uploadFileToBlob(spouseImage, spouse.personId);
        if (!!upl) {
            setImageOfPerson(`${spouse.personId}.png`, upl._response.request.url);
        }
    }
}

export default saveData;