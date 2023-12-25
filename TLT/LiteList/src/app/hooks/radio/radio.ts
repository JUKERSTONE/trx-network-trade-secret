import {handleGetTimeline, useLITELISTState} from '../..';
import {api, useAPI} from '../../../api';
import {
  store,
  setTimeline,
  useAsyncStorage,
  asyncStorageIndex,
  handleSetBasket,
  handleMediaPlayerAction,
  setTraklist,
} from '../../../stores';

export const handleGetTRXRadio = async () => {
  const {useGET} = useAPI();
  const {handleGetState} = useLITELISTState();
  const keys = handleGetState({index: 'keys'});
  console.log('🚀 ~ file: radio.ts:17 ~ handleGetTRXRadio ~ keys:', keys);

  const route = api.bernie({method: 'trx-radio'});
  const response = await useGET({route, token: keys.trx.accessToken});
  console.log(
    '🚀 ~ file: radio.ts:15 ~ handleGetTRXRadio ~ response:',
    response,
  );

  const trx = response.data.radio;
  const traklist = response.data.traklist;

  const playerService = traklist.map((item: any) => {
    const trak = JSON.parse(item.serialized_trak).TRAK;
    console.log('🚀 ~ file: radio.ts:27 ~ trx ~ trak:', trak);
    return {
      player: {
        title: trak.trak.title,
        artist: trak.trak.artist,
        cover_art: trak.trak.thumbnail,
        geniusId: trak.trak.genius.id,
      },
      service: {provider: 'youtube', url: trak.trak.youtube.url},
      id: item.id,
    };
  });
  console.log('🚀 ~ file: radio.ts:33 ~ trx ~ trx:', trx);
  const action1 = handleMediaPlayerAction({
    playbackState: 'pause:force',
  });

  store.dispatch(action1);
  const action = setTraklist({
    traklist: playerService,
    activeIndex: 0,
    radio: trx,
  });

  store.dispatch(action);
};
