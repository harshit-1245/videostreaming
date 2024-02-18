import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  Constants,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import Hls from "hls.js";

function ParticipantView({ participantId }) {
  // Render participant UI here
  return <div>Participant View for {participantId}</div>;
}

function Controls() {
  // Render controls UI here
  return <div>Controls</div>;
}

function SpeakerView() {
  const [joined, setJoined] = useState(null);
  const { participants } = useMeeting();
  const mMeeting = useMeeting();

  const mMeetingRef = useRef(mMeeting);
  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  useEffect(() => {
    const handleMeetingJoined = () => {
      setJoined("JOINED");
      if (mMeetingRef.current.localParticipant.mode === Constants.modes.CONFERENCE) {
        mMeetingRef.current.localParticipant.pin();
      }
    };

    mMeetingRef.current.onMeetingJoined(handleMeetingJoined);

    return () => {
      mMeetingRef.current.offMeetingJoined(handleMeetingJoined);
    };
  }, []);

  const speakers = useMemo(() => {
    return [...participants.values()].filter(participant => participant.mode === Constants.modes.CONFERENCE);
  }, [participants]);

  return (
    <div className="container">
      {joined === "JOINED" ? (
        <div>
          {speakers.map(participant => (
            <ParticipantView key={participant.id} participantId={participant.id} />
          ))}
          <Controls />
        </div>
      ) : (
        <p>Joining the meeting...</p>
      )}
    </div>
  );
}

export default SpeakerView;
