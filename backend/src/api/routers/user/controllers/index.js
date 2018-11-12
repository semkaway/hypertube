import {createUser} from './create'
import {checkEmail} from "./check-email";
import {activateUser} from "./activate";
import {User} from '../models'

const controllers = {
    createUser: createUser(User),
    checkEmail: checkEmail(User),
    activateUser: activateUser(User)
};

export default controllers;
