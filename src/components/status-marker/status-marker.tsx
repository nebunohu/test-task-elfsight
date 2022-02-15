import { FC } from "react";
import styles from './status-marker.module.css';

type TStatusMarkerProps = {
  status: string;
}

const StatusMarker: FC<TStatusMarkerProps> = ({ status }) => {
  const markerColor = (status === 'Dead') ? styles.red : (status === 'unknown') ? styles.grey : styles.green;
  return (
    <div className={`${styles.marker} ${markerColor}`} />
  );
};

export default StatusMarker;