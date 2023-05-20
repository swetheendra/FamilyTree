import {Gender} from './Constants';

export const getParentChildMappings = (persons) => {
    const mapping = {};
    for(const key in persons) {
        const person = persons[key];
        const personId = person.personId;
        const parent = person.parent;
        if (parent in mapping) {
            mapping[parent].push(personId);
        } else {
            mapping[parent] = [];
            mapping[parent].push(personId);
        }
    }
    return mapping;
}

const getOppositeGender = (person) => {
    if(person.gender === Gender.Male) {
        return Gender.Female;
    } else {
        return Gender.Male;
    }
}

export {getOppositeGender}
