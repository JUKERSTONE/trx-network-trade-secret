import {genius} from './internal';

export const routes = {
  genius: ({method, payload}: any) => genius({method, payload}),
};
