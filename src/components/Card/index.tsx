import React from "react";
import { CardContent } from "./styles";

const Card = ({ children }: { children: React.ReactNode }) => {
  return <CardContent>{children}</CardContent>;
};

export default Card;
