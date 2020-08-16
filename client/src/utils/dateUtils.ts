import dayjs from "dayjs";

export const unixToFormattedDate = (
  unix: number,
  format = "YYYY/MM/DD HH:mm"
) => dayjs.unix(unix).format(format);
