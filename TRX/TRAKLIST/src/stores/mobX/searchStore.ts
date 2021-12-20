import {extendObservable} from 'mobx';

class SearchStore {
  constructor() {
    extendObservable(this, {
      index: [0],
      cache: new Set(),
    });
  }
}

export const IStore = new SearchStore() as any;
