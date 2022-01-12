import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const registerUser = ({ res, req }: any) => {
  const {
    body: {
      // bio,
      // confirm_email_address,
      email_addres,
      // isAuthenticatedSpotify,
      // likes,
      // location,
      password,
      // phone_number,
      // quotable,
      // subscription,
      // trak_name,
      // trak_symbol,
      // user_name,
    },
  } = req;

  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email_addres, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return res.json(user);
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // ..
    });

  // return res.json({
  //   bio,
  //   confirm_email_address,
  //   email_addres,
  //   isAuthenticatedSpotify,
  //   likes,
  //   location,
  //   password,
  //   phone_number,
  //   quotable,
  //   subscription,
  //   trak_name,
  //   trak_symbol,
  //   user_name,
  // });
};
