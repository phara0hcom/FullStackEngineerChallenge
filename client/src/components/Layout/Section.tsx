import React, { ReactNode } from "react";

import classes from "./Section.module.scss";

export interface SectionProps {
  children: ReactNode;
}

const Section: React.SFC<SectionProps> = ({ children }) => {
  return <section className={classes.container}>{children}</section>;
};

export default Section;
