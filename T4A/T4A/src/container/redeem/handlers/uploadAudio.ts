import {Platform} from 'react-native';
import storage from '@react-native-firebase/storage';

export const handleStoreAudio = async ({result, audioFileName}: any) => {
  const upload: any = storage()
    .ref('requests/trx-00/' + audioFileName)
    .putString(result, 'base64', {contentType: 'audio/mp3'});

  upload.on('state_changed', (snapshot: any) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload ' + progress + '% done');
    switch (snapshot.state) {
      case storage.TaskState.PAUSED:
        console.log('Upload Paused');
        break;
      case storage.TaskState.RUNNING:
        console.log('Upload Running');
        break;
    }
  }),
    (error: any) => {
      console.log(
        '🚀 ~ file: uploadAudio.ts ~ line 22 ~ handleStoreAudio ~ error',
        error,
      );
    },
    () => {
      upload.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
        console.log('File available at ', downloadURL);
      });
    };
};
