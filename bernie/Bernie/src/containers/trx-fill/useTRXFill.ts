import React, {useEffect, useState, useContext} from 'react';
import {routes, useAPI} from '../../api';
import {useBERNIEState, handleRequests} from '../../app';
import firestore from '@react-native-firebase/firestore';

const {handleGetState} = useBERNIEState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useTRXFill = ({navigation, route}: any) => {
  const [trakTemplate, setTrakTemplate] = useState(route.params.trak);
  const [mintLoading, setMintLoading] = useState(route.params.trak);
  console.log('🚀 ~ file: useTRXFill.ts:12 ~ useTRXFill ~ trak:', trakTemplate);
  const missingProviders = trakTemplate.missingProviders;

  const {POST} = useAPI();

  const handleIDChange = ({text, provider}: any) => {
    switch (provider) {
      case 'youtube':
        setTrakTemplate({
          ...trakTemplate,
          trak: {
            ...trakTemplate.trak,
            youtube: {
              url: text,
            },
          },
        });
        break;
      case 'spotify':
        setTrakTemplate({
          ...trakTemplate,
          trak: {
            ...trakTemplate.trak,
            spotify: {
              uri: text,
            },
          },
        });
        break;
      case 'apple_music':
        setTrakTemplate({
          ...trakTemplate,
          trak: {
            ...trakTemplate.trak,
            apple_music: {
              id: text,
            },
          },
        });
        break;
      case 'soundcloud':
        setTrakTemplate({
          ...trakTemplate,
          trak: {
            ...trakTemplate.trak,
            soundcloud: {
              url: text,
            },
          },
        });
        break;
      default:
        break;
    }
  };

  const handleSubmitTRX = async () => {
    console.log(
      '🚀 ~ file: useTRXFill.ts:68 ~ handleSubmitTRX ~ trakTemplate:',
      trakTemplate,
    );

    const secondaryTRAKRoute = routes.traklist({
      method: 'set_trak',
    });

    const secondaryTRAKResponse = POST({
      route: secondaryTRAKRoute,
      token: accessToken,
      tokenType: 'Bearer',
      body: {
        protocol: `trx-04`,
        TRAK: {
          ...trakTemplate,
        },
      },
      ContentType: 'application/json',
    });

    const doc = firestore()
      .collection(`fundamentals/BERNIE/requests`)
      .where('trak.artist', '==', trakTemplate.trak.artist)
      .get();

    const docId = (await doc).docs[0].id;

    console.log('🚀 ~ file: useTRXFill.ts:94 ~ handleSubmitTRX ~ doc:', doc);
    Promise.resolve(secondaryTRAKResponse)
      .then((res: any) => {
        const data = res.data;
        const {success, trakToken} = data;
        console.log(
          '🚀 ~ file: useMineToken.ts ~ line 243 ~ Promise.resolve ~ trakToken',
          trakToken,
        );

        setMintLoading(false);
        if (success) {
          // @ts-ignore
          alert('SECONDARY minted');

          console.log(
            '🚀 ~ file: useTRXFill.ts:110 ~ .then ~ trakTemplate.trak.artist:',
            trakTemplate.trak.artist,
          );

          firestore()
            .doc(`fundamentals/BERNIE/requests/${docId}`)
            .delete()
            .then(() => {
              navigation.goBack();
            })
            .catch(() => navigation.goBack());
          // @ts-ignore
        } else {
          alert('ERROR: Cannot mine secondary TRAK');
          setMintLoading(false);
        }
      })
      .catch(err => {
        console.log(
          '🚀 ~ file: useTRXFill.ts:112 ~ handleSubmitTRX ~ err:',
          err,
        );
        alert('ERROR: Cannot mine secondary TRAK');
        setMintLoading(false);
      });
  };

  return {
    missingProviders,
    handleIDChange,
    handleSubmitTRX,
  };
};
