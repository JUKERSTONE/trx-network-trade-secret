import {genius, spotify} from './internal';

export const routes = {
  genius: ({method, payload}: any) => genius({method, payload}),
  spotify: ({method, payload}: any) => spotify({method, payload}),
};
