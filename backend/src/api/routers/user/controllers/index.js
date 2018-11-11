import {createUser} from './create'
import {emailExist} from "./check-email-exist";
import {activateUser} from "./activate";
import {User} from '../models'

const controllers = {
    createUser: createUser(User),
    emailExist: emailExist(User),
    activateUser: activateUser(User)
};

export default controllers;
