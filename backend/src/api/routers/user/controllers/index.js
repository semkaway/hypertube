import {createUser} from './create'
import {checkEmail} from "./check-email"
import {activateUser} from "./activate"
import {login} from "./login"
import {User} from '../models'

const controllers = {
    createUser: createUser(User),
    checkEmail: checkEmail(User),
    activateUser: activateUser(User),
    login: login(User),
};

export default controllers;
