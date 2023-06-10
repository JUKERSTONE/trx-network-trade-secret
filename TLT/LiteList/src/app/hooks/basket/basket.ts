import {handleGetTimeline} from '../..';
import {
  store,
  setTimeline,
  useAsyncStorage,
  asyncStorageIndex,
  handleSetBasket,
} from '../../../stores';

export const handleRetrieveBasket = async () => {
  const {handleGet} = useAsyncStorage();

  const serializedBasket: any = await handleGet({
    key: asyncStorageIndex.updateBasket,
  });
  console.log(
    '🚀 ~ file: basket.ts:16 ~ handleRetrieveBasket ~ serializedBasket:',
    serializedBasket,
  );

  if (!serializedBasket) return;

  const basket = JSON.parse(serializedBasket);
  const action = handleSetBasket(basket);
  store.dispatch(action);
};
