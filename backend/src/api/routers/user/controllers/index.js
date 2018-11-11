import {createUser} from './create'
import {emailExist} from "./check-email-exist";
import {User} from '../models'

const controllers = {
    createUser: createUser(User),
    emailExist: emailExist(User)
};

export default controllers;
