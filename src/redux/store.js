import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/rootReducer";

const persistConfig = {
  key: "userData",
  storage,
};

const persisteReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persisteReducer,
  applyMiddleware(thunkMiddleware)
);

export const persistor = persistStore(store);
