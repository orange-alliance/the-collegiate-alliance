import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import CalendarIcon from "@material-ui/icons/CalendarToday";
import PlaceIcon from "@material-ui/icons/Place";
import VideoGameController from "@material-ui/icons/VideogameAsset";
import AppTheme, {CURRENT_SEASON_NAME} from "../AppTheme";

import {Event} from "@the-orange-alliance/lib-ems";

const styles = {
  card: {
    padding: AppTheme.spacing(1)
  },
  icon: {
    color: AppTheme.palette.primary.main
  }
};

interface IProps {
  event: Event
}

class EventHeaderCard extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
  }

  public render() {
    const {event} = this.props;
    const {startDate: start, endDate: end} = event;

    const oneDayEvent = start.getDate() === end.getDate() && start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

    return (
      <Card style={styles.card}>
        <CardContent>
          <Typography variant={'h5'}>{event.eventName}</Typography>
        </CardContent>
        <Divider/>
        <CardContent>
          <Grid container={true} spacing={1}>
            {/* Event Date */}
            <Grid item={true} xs={1}>
              <CalendarIcon style={styles.icon}/>
            </Grid>
            <Grid item={true} xs={11}>
              { oneDayEvent && this.formatDate(start) }
              { !oneDayEvent && `${this.formatDate(start)} to ${this.formatDate(end)}` }
            </Grid>
            {/* Event Location/Venue */}
            <Grid item={true} xs={1}>
              <PlaceIcon style={styles.icon}/>
            </Grid>
            <Grid item={true} xs={11}>
              {event.venue}, {event.country}
            </Grid>
            {/* Event Game */}
            <Grid item={true} xs={1}>
              <VideoGameController style={styles.icon}/>
            </Grid>
            <Grid item={true} xs={11}>
              {event.season.seasonDesc}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  private getGameName(seasonKey: number): string {
    switch (seasonKey) {
      case 20:
        return CURRENT_SEASON_NAME;
      default:
        return "";
    }
  }
}

export default EventHeaderCard;
