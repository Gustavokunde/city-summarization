import { useEffect, useState } from "react";
import { Params } from "../services/params";
import { getParams } from "../services/params/getParams";

export const UseParams = () => {
  const [params, setParams] = useState<Params | null>(null);

  useEffect(() => {
    getParams().then((response) => {
      setParams(response.data);
    });
  }, []);
  return params;
};
