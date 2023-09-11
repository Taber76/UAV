import { MapComponent, StatusBar, UavVideo, HorizonInst } from "../../components"
import './styles.css'

const Main = () => {
  const videoUrl = "http://192.168.1.16:8082"

  return(
    <div className="mainContainer">
      <div className="statusBarContainer">
        <StatusBar />
      </div>
      <div className="horizonContainer">
        <HorizonInst />
      </div>
      <div className="videoContainer">
        <UavVideo videoUrl={videoUrl} />
      </div>
      <div className="mapContainer">
        <MapComponent />
      </div>
    </div>
  )
}

export default Main