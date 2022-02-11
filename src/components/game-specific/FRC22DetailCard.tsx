import * as React from "react";
import {Card, Grid, Typography} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";
import AppTheme from "../../AppTheme";

import {Match, RapidReactMatchDetails} from "@the-orange-alliance/lib-ems";

const styles = {
  headerHeaderItem: {
    backgroundColor: '#e6e6e6',
    padding: AppTheme.spacing(1)
  },
  redHeaderItem: {
    backgroundColor: '#ffdddd',
    padding: AppTheme.spacing(1)
  },
  blueHeaderItem: {
    backgroundColor: '#ddddff',
    padding: AppTheme.spacing(1)
  },
  headerItem: {
    backgroundColor: '#ffffff',
    padding: AppTheme.spacing(1)
  },
  redItem: {
    backgroundColor: 'rgba(255,82,82,.07)',
    padding: AppTheme.spacing(1)
  },
  blueItem: {
    backgroundColor: 'rgba(68,138,255,.07)',
    padding: AppTheme.spacing(1)
  }
};

interface IProps {
  match: Match;
}

interface IState {
  loading: boolean;
}

class FRC20DetailCard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      loading: true
    };
  }

  public componentWillMount(): void {
    const {match} = this.props;
    const {loading} = this.state;
    console.log(match.matchDetails);
    if (typeof match.matchDetails !== "undefined" && loading) {
      this.setState({loading: false});
    }
  }

  public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
    const {match} = this.props;
    const {loading} = this.state;
    if (typeof match.matchDetails !== "undefined" && loading) {
      this.setState({loading: false});
    }
  }

  public render() {
    const {match} = this.props;
    const {loading} = this.state;
    const details = match.matchDetails as RapidReactMatchDetails;
    const loadingView = (
      <Grid container={true} spacing={0}>
        <Grid item={true} xs={3} style={styles.redHeaderItem}>
          <Skeleton variant={'rect'} width={'100%'} height={'40px'}/>
        </Grid>
        <Grid item={true} xs={6} style={styles.headerHeaderItem}>
          <Skeleton variant={'rect'} width={'100%'} height={'40px'}/>
        </Grid>
        <Grid item={true} xs={3} style={styles.blueHeaderItem}>
          <Skeleton variant={'rect'} width={'100%'} height={'40px'}/>
        </Grid>
        <Grid item={true} xs={3} style={styles.redItem}>
          <Skeleton variant={'rect'} width={'100%'} height={'40px'}/>
        </Grid>
        <Grid item={true} xs={6} style={styles.headerItem}>
          <Skeleton variant={'rect'} width={'100%'} height={'40px'}/>
        </Grid>
        <Grid item={true} xs={3} style={styles.blueItem}>
          <Skeleton variant={'rect'} width={'100%'} height={'40px'}/>
        </Grid>
      </Grid>
    );
    return loading ? loadingView : (
      <Card>
        <Grid container={true} spacing={0}>
          {/* AUTO HEADERS */}
          <Grid item={true} xs={3} style={styles.redHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getRedAutoScore()} Points</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerHeaderItem}>
            <Typography align={'center'} variant={'body1'}>Autonomous</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getBlueAutoScore()} Points</Typography>
          </Grid>

          {/* Robot1 Taxi */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{(details.redAutoTaxiRobot1) ? "✔": "✖"} (+{(details.redAutoTaxiRobot1) ? 2 : 0})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Robot 1 Taxied</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{(details.blueAutoTaxiRobot1) ? "✔": "✖"} (+{(details.blueAutoTaxiRobot1) ? 2 : 0})</Typography>
          </Grid>

          {/* Robot2 Taxi */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{(details.redAutoTaxiRobot2) ? "✔": "✖"} (+{(details.redAutoTaxiRobot2) ? 2 : 0})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Robot 2 Taxied</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{(details.blueAutoTaxiRobot2) ? "✔": "✖"} (+{(details.blueAutoTaxiRobot2) ? 2 : 0})</Typography>
          </Grid>

          {/* Robot3 Taxi */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{(details.redAutoTaxiRobot3) ? "✔": "✖"} (+{(details.redAutoTaxiRobot3) ? 2 : 0})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Robot 3 Taxied</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{(details.blueAutoTaxiRobot3) ? "✔": "✖"} (+{(details.blueAutoTaxiRobot3) ? 2 : 0})</Typography>
          </Grid>

          {/* Auto Bottom Cargo */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{details.redAutoCargoLow} (+{details.redAutoCargoLow * 2})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Lower Cargo</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{details.blueAutoCargoLow} (+{details.blueAutoCargoLow * 2})</Typography>
          </Grid>

          {/* Auto Upper Cargo */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{details.redAutoCargoHigh} (+{details.redAutoCargoHigh * 4})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Upper Cargo</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{details.blueAutoCargoHigh} (+{details.blueAutoCargoHigh * 4})</Typography>
          </Grid>

          {/* TELEOP HEADERS */}
          <Grid item={true} xs={3} style={styles.redHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getRedTeleScore()} Points</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerHeaderItem}>
            <Typography align={'center'} variant={'body1'}>Driver-Controlled</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getBlueTeleScore()} Points</Typography>
          </Grid>

          {/* Tele Bottom Fuel */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{details.redTeleCargoLow} (+{details.redTeleCargoLow})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Lower Cargo</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{details.blueTeleCargoLow} (+{details.blueTeleCargoLow})</Typography>
          </Grid>

          {/* Tele Outer Fuel */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{details.redTeleCargoHigh} (+{details.redTeleCargoHigh * 2})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Upper Cargo</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{details.blueTeleCargoHigh} (+{details.blueTeleCargoHigh * 2})</Typography>
          </Grid>

          {/* END GAME HEADERS */}
          <Grid item={true} xs={3} style={styles.redHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getRedEndScore()} Points</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerHeaderItem}>
            <Typography align={'center'} variant={'body1'}>End Game</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getBlueEndScore()} Points</Typography>
          </Grid>

          {/* Robot 1 Status */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{this.getEndText(details.redHangerRobot1)} (+{details.redHangerRobot1})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Robot 1 Hangar</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{this.getEndText(details.blueHangerRobot1)} (+{details.blueHangerRobot1})</Typography>
          </Grid>

          {/* Robot 2 Status */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{this.getEndText(details.redHangerRobot2)} (+{details.redHangerRobot2})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Robot 2 Hangar</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{this.getEndText(details.blueHangerRobot2)} (+{details.blueHangerRobot2})</Typography>
          </Grid>

          {/* Robot 3 Status */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{this.getEndText(details.redHangerRobot3)} (+{details.redHangerRobot3})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Robot 3 Hangar</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{this.getEndText(details.blueHangerRobot3)} (+{details.blueHangerRobot3})</Typography>
          </Grid>

          {/* Cargo Bonus */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{(details.redCargoBonus) ? "✔": "✖"} (+{(details.redCargoBonus) ? 1 : 0} RP)</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Cargo Bonus</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{(details.blueCargoBonus) ? "✔": "✖"} (+{(details.blueCargoBonus) ? 1 : 0} RP)</Typography>
          </Grid>

          {/* Hangar Bonus */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{(details.redHangarBonus) ? "✔": "✖"} (+{(details.redHangarBonus) ? 1 : 0} RP)</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Hangar Bonus</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{(details.blueHangarBonus) ? "✔": "✖"} (+{(details.blueHangarBonus) ? 1 : 0} RP)</Typography>
          </Grid>

          {/* Penalty Points */}
          <Grid item={true} xs={3} style={styles.redHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getRedPenalty(match.blueMinPen, match.blueMajPen)} Points</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerHeaderItem}>
            <Typography align={'center'} variant={'body1'}>Penalty Points</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getBluePenalty(match.redMinPen, match.redMajPen)} Points</Typography>
          </Grid>

          {/* Fouls */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{match.blueMinPen} (+{match.blueMinPen * 4})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Fouls</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{match.redMinPen} (+{match.redMinPen * 4})</Typography>
          </Grid>

          {/* Tech Fouls */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{match.blueMajPen} (+{match.blueMajPen * 8})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Tech Fouls</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{match.redMajPen} (+{match.redMajPen * 8})</Typography>
          </Grid>
        </Grid>
      </Card>
    );
  }

  private getEndText(state: number): string {
    switch (state) {
      case 0:
        return "None";
      case 4:
        return "Low Rung";
      case 6:
        return "Mid Rung";
      case 10:
        return "High Rung";
      case 15:
        return "Traversal Rung";
      default:
        return "None";
    }
  }

  private getEndPoints(state: number): number {
    switch (state) {
      case 0:
        return 0;
      case 1:
        return 5;
      case 2:
        return 25;
      default:
        return 0;
    }
  }
}

export default FRC20DetailCard;
