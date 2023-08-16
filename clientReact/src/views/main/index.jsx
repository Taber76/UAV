import { MapComponent, StatusBar } from "../../components"
import './styles.css'

const Main = () => {
  return(
    <div className="mainContainer">
      <div className="statusBarContainer">
        <StatusBar />
      </div>
      <div className="mapContainer">
        <MapComponent />
      </div>
    </div>
  )
}

export default Main