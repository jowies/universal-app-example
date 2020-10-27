import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';
import contact from './contactSlice';

const combinedReducer = combineReducers({
  contact: contact,
});

export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'RESET') state = {} as RootState;
  if (action.type === 'REPLACE_STATE') return action.payload as RootState;
  return combinedReducer(state, action);
};

export default rootReducer;
