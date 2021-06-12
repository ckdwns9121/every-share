//유저 스토어
import {createAction, ActionType, createReducer} from 'typesafe-actions';
import {User} from '../types/User';

const SET_USER  = 'user/SET_USER';

export const set_user = createAction(SET_USER)<any>();

const actions ={set_user};

type Actions = ActionType<typeof actions>

type State =  User;

const initState : State = {
    user :{
        user_id : -1,
        email:'',
        name:null,
        password: '',
        phone_number:'string',
        agree_sms : 0,
        agree_push: 0,
        register_type : null,
    }
};

const user = createReducer<State, Actions>(initState, {
    [SET_USER]: (state, action) =>
    {
        console.log(action);
        const {type,value} = action.payload;
        return {
            ...state,
            user : action.payload
        }
    }
});

export type RooteState = ReturnType<typeof user>;
export default user;