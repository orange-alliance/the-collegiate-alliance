import * as React from "react";
import Grid from "@material-ui/core/Grid";
import StreamCard from "../components/StreamCard";

import {LiveStream} from "@the-orange-alliance/lib-ems";

const mainStream: LiveStream = new LiveStream();
mainStream.channelName = "firstupdatesnow";
mainStream.streamName = "FACC - Main Stream";
mainStream.streamURL = "https://player.twitch.tv/?channel=firstupdatesnow";


const streams: LiveStream[] = [mainStream];

class StreamsModule extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {

    const streamsView = streams.map((stream: LiveStream) => {
      return (
        <Grid item={true} xs={12} sm={12} md={6}>
          <StreamCard stream={stream} subtitle={stream.channelName}/>
        </Grid>
      );
    });
    return (
      <Grid container={true} spacing={3}>
        {streamsView}
      </Grid>
    );
  }
}

export default StreamsModule;
