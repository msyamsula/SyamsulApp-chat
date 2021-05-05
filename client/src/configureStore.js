import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index.js"
import reduxThunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
}

const pReducer = persistReducer(persistConfig, reducers)

export let store = createStore(pReducer, {}, composeWithDevTools(applyMiddleware(reduxThunk)));
export let persistor = persistStore(store) 