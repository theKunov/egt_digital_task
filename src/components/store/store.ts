import { createStore } from 'redux';
import reducer from './reducer';
import { RootState } from '../../interfaces';

const store = createStore<RootState, any, any, any>(reducer);

export default store;