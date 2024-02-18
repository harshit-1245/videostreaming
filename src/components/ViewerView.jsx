import React, { useEffect, useRef, useState } from "react";
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import Hls from "hls.js";

export function ViewerView() {
  const [participants, setParticipants] = useState([]);
  const { hlsUrls, hlsState, participants: allParticipants } = useMeeting();

  useEffect(() => {
    setParticipants(Array.from(allParticipants.values()));
  }, [allParticipants]);

  useEffect(() => {
    participants.forEach((participant) => {
      if (participant.hlsUrls.downstreamUrl && hlsState === Constants.hlsStates.HLS_PLAYABLE) {
        const player = createVideoPlayer(participant.hlsUrls.downstreamUrl);
        participant.videoPlayer = player;
      }
    });

    return () => {
      participants.forEach((participant) => {
        if (participant.videoPlayer) {
          participant.videoPlayer.destroy();
        }
      });
    };
  }, [participants, hlsState]);

  const createVideoPlayer = (url) => {
    const player = document.createElement("video");
    player.src = url;
    player.autoplay = true;
    player.controls = true;
    player.style.width = "50%";
    player.style.height = "50%";
    player.playsInline = true;
    player.muted = true;
    document.body.appendChild(player);
    return player;
  };

  return (
    <div>
      {hlsState !== Constants.hlsStates.HLS_PLAYABLE ? (
        <p>Please Click Go Live Button to start HLS</p>
      ) : (
        participants.map((participant) => (
          <div key={participant.id}>
            <p>Participant: {participant.id}</p>
            {participant.hlsUrls.downstreamUrl && (
              <video
                ref={participant.videoPlayerRef}
                autoPlay
                controls
                style={{ width: "50%", height: "50%" }}
                playsInline
                muted
                onError={(err) => {
                  console.log(err, "hls video error");
                }}
              ></video>
            )}
          </div>
        ))
      )}
    </div>
  );
}
