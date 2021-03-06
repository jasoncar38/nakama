import {combineReducers, Dispatch, Action, AnyAction} from 'redux';
import {all, fork} from 'redux-saga/effects';

import {loginSaga} from './login/sagas';
import {loginReducer} from './login/reducer';
import {LoginState} from './login/types';

import {configurationSaga} from './configuration/sagas';
import {configurationReducer} from './configuration/reducer';
import {ConfigurationState} from './configuration/types';

import {storageSaga} from './storage/sagas';
import {storageReducer, storagesReducer} from './storage/reducer';
import {StorageState, StoragesState} from './storage/types';

import {userSaga} from './users/sagas';
import {userReducer, usersReducer} from './users/reducer';
import {UserState, UsersState} from './users/types';

import {statusSaga} from './status/sagas';
import {statusReducer} from './status/reducer';
import {StatusState} from './status/types';


import {tournamentSaga} from './tournaments/sagas';
import {tournamentReducer, tournamentsReducer, newTournamentReducer} from './tournaments/reducer';
import {TournamentState, TournamentsState, NewTournamentState} from './tournaments/types';

export interface ConnectedReduxProps<A extends Action = AnyAction>
{
  dispatch: Dispatch<A>
};

export interface ApplicationState
{
  login: LoginState,
  configuration: ConfigurationState,
  storage: StoragesState,
  storage_details: StorageState,
  user: UsersState,
  user_details: UserState,
  new_tournament: NewTournamentState,
  tournament: TournamentsState,
  tournament_details: TournamentState,
  status: StatusState
};

export const createRootReducer = () =>
  combineReducers({
    login: loginReducer,
    configuration: configurationReducer,
    storage: storagesReducer,
    storage_details: storageReducer,
    user: usersReducer,
    user_details: userReducer,
    status: statusReducer,
    new_tournament: newTournamentReducer,
    tournament: tournamentsReducer,
    tournament_details: tournamentReducer
  });

export function* rootSaga()
{
  yield all([
    fork(loginSaga),
    fork(configurationSaga),
    fork(storageSaga),
    fork(userSaga),
    fork(statusSaga),
    fork(tournamentSaga)
  ]);
};
