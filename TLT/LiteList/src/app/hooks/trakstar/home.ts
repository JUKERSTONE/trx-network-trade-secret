import {handleGetTRX01, handleGetTRX02} from '../../firebase';
import {handleTrakStarListenAgain} from '../../firebase/getTrakstarListenAgain';

interface TrakStarHomeData {
  section:
    | 'listen-again'
    | 'trending' // fb-collection-listener - set by cron-job
    | 'traklists' // trx-collection
    | 'home-banner-1' // fb-collection-listener
    | 'artists-for-you' // fb-collection-listener - works with swipe cache
    | 'new-this-week' // trx-collection
    | 'traklist-of-the-week' // trx-collection
    | 'home-banner-2' // fb-collection-listener
    | 'genre-collections'
    | 'home-banner-3' // fb-collection-listener
    | 'ai-music'
    | 'trx-og'
    | 'complex-news'
    | 'hypebeast-news';
  items: any[];
}

const components = [
  'listen-again',
  'trending', // fb-collection-listener - set by cron-job
  'traklists',
  'home-banner-1', // fb-collection-listener
  'artists-for-you', // fb-collection-listener - works with swipe cache
  // 'new-this-week', // trx-collection
  // 'traklist-of-the-week', // trx-collection
  'home-banner-2', // fb-collection-listener
  'genre-collections',
  'home-banner-3', // fb-collection-listener
  'ai-music',
  'trx-og',
  'complex-news',
  'hypebeast-news',
];

export const handleTrakStarHome = async () => {
  const coreCollections = await Promise.all(
    components.map(async section => {
      switch (section) {
        case 'listen-again':
          const listenAgain = await handleTrakStarListenAgain();
          return {
            section,
            items: listenAgain.map((trak: any) => ({
              uri: trak.cover_art,
              captionTop: trak.title,
              captionBottom: trak.artist,
              nav: trak.nav,
            })),
          };
        //   case 'trending':
        //     break;
        //   case 'traklists':
        //     break;
        //   case 'home-banner-1':
        //     break;
        //   case 'artists-for-you':
        //     break;
        //   case 'new-this-week':
        //     break;
        //   case 'traklist-of-the-week':
        //     break;
        //   case 'home-banner-2':
        //     break;
        case 'genre-collections':
          break;
        //   case 'home-banner-3':
        //     break;
        case 'ai-music':
          const aiMusic = await handleGetTRX01();
          return {
            section,
            items: aiMusic.map((trak: any) => ({
              uri: trak.coverArtUrl,
              captionTop: trak.title,
              captionBottom: trak.bots.artist,
              nav: trak.audioUrl,
            })),
          };
        case 'trx-og':
          const ogMusic = await handleGetTRX02();
          return {
            section,
            items: ogMusic.map((trak: any) => ({
              uri: trak.coverArtUrl,
              captionTop: trak.title,
              captionBottom: trak.artists.artist,
              nav: trak.audioUrl,
            })),
          };
        //   case 'complex-news':
        //     break;
        //   case 'hypebeast-news':
        //     break;
        default:
          return {
            section,
            items: [],
          };
      }
    }),
  );
  console.log(
    '🚀 ~ file: home.ts:102 ~ handleTrakStarHome ~ home:',
    coreCollections,
  );

  // const tsbCollections = await handleGetTSBCollections()

  // const genreCollections = await handleGetGenreCollections();
};
