import {
  setTRAK,
  appendTRAK,
  findTRAK,
  mineTRAK,
  searchTRAK,
  listenTRAK,
  watchCurrency,
} from "./handlers";

export const useCloudFunctions = () => {
  const setTRAKFunction = ({ ...props }) => setTRAK(props);
  const appendTRAKFunction = ({ ...props }) => appendTRAK(props);
  const mineTRAKFunction = ({ ...props }) => mineTRAK(props);
  const findTRAKFunction = ({ ...props }) => findTRAK(props);
  const watchCurrencyFunction = ({ ...props }) => watchCurrency(props);
  const listenTRAKFunction = ({ ...props }) => listenTRAK(props);
  const listenJUKEFunction = ({ ...props }) => listenTRAK(props);
  const listenPATRONFunction = ({ ...props }) => listenTRAK(props);
  const searchTRAKFunction = ({ ...props }) => searchTRAK(props);
  return {
    setTRAKFunction,
    appendTRAKFunction,
    findTRAKFunction,
    mineTRAKFunction,
    searchTRAKFunction,
    watchCurrencyFunction,
    listenTRAKFunction,
    listenPATRONFunction,
    listenJUKEFunction,
  };
};
