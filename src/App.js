import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  Constants,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import Hls from "hls.js";
import SpeakerView from "./components/SpeakerView";
import { ViewerView } from "./components/ViewerView";
import MeetingView from "./components/MeetingView"; // Import MeetingView component

const App = () => {
  const [mode, setMode] = useState(null);
 

  // You can access the room ID from the meeting configuration
  
  return (
    <div>
      {mode ? (
        <MeetingProvider
          config={{
            meetingId: "tchc-nn9i-gs2f",
            micEnabled: true,
            webcamEnabled: true,
            name: "Harshit's Org",
            mode,
          }}
          joinWithoutUserInteraction
          token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIyMGY4ZDNmMC03N2Q4LTQ5MDgtYjU1NS1kNjViOWM1NGU3NzkiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwODI2OTYwNiwiZXhwIjoxNzA4MzU2MDA2fQ.qcA2cXZ41ATzgk3xHOtYBvgHSLYfGKgPoOhnSZDUejo"
        >
          <MeetingView /> {/* Include MeetingView component */}
        </MeetingProvider>
      ) : (
        <div>
          <button
            onClick={() => {
              setMode(Constants.modes.CONFERENCE);
            }}
          >
            Join as Speaker
          </button>
          <button
            style={{ marginLeft: 12 }}
            onClick={() => {
              setMode(Constants.modes.VIEWER);
            }}
          >
            Join as Viewer
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
