import { app } from "../../src";
import { useCloudFunctions } from "../hooks";

const { setTRAKFunction } = useCloudFunctions();

/** TRAK */
app.post("/trak", setTRAKFunction);
