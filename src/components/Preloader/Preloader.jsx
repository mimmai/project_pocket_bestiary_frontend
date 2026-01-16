import { PacmanLoader } from "react-spinners";
import "./Preloader.css";

export default function Preloader() {
  return (
    <div className="preloader">
      <PacmanLoader
        loading={true}
        color="#af00ff"
        size={25}
        margin={2}
        speedMultiplier={1}
      />
    </div>
  );
}