// imports from modules
import { Tab, Nav } from "react-bootstrap";
import Slider from "react-slick";

// components imports
import Login from "../Component/Login";

export const LandingPage = () => {
  return (
    <div>
      {/* nav */}
      <div style={{ marginTop: '5%' }}>
        <div className='col-md-6 landingPage-Tabs-Wrap'>
          <div className=''>
            <div className='ms-panel-body clearfix'>
              <Login/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
