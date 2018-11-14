import {createUser} from './create'
import {checkEmail} from "./check-email"
import {activateUser} from "./activate"
import {resendActivation} from "./resend-activation";
import {login} from "./login"
import {User} from '../models'

const controllers = {
    createUser: createUser(User),
    checkEmail: checkEmail(User),
    activateUser: activateUser(User),
    login: login(User),
    resendActivation: resendActivation(User),
};

export default controllers;
