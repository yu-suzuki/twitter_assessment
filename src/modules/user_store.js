import {createStore, combineReducers} from "redux";
import {initialState, reducer as userReducer} from "./user_info";
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {reducer as formReducer} from 'redux-form'

const persistConfig = {
    key: 'root',
    storage,
};

const reducers = combineReducers({
    user: userReducer,
    form: formReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export let store = createStore(persistedReducer, initialState);
export let persistor = persistStore(store);
export default function () {
    return {store, persistor}
}