import React from "react";
import classes from "./Loading.module.scss";

const Loading: React.FC<{ isLocal: boolean }> = ({ isLocal }) => {
  const loadingClass = isLocal ? classes.localLoading : classes.loading;
  return <div className={loadingClass}>Loading</div>;
};

export default Loading;
