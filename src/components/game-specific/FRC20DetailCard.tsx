import * as React from "react";
import {Card, Grid, Typography} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";
import AppTheme from "../../AppTheme";

import {Match, InfiniteRechargeMatchDetails} from "@the-orange-alliance/lib-ems";

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
    const details = match.matchDetails as InfiniteRechargeMatchDetails;
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
          {/* Robot1 Cross */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{(details.redAutoRobotTwoCrossed) ? "✔": "✖"} (+{(details.redAutoRobotTwoCrossed) ? 5 : 0})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Robot 1 Crossed</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{(details.blueAutoRobotTwoCrossed) ? "✔": "✖"} (+{(details.blueAutoRobotTwoCrossed) ? 5 : 0})</Typography>
          </Grid>
          {/* Robot2 Cross */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{(details.redAutoRobotOneCrossed) ? "✔": "✖"} (+{(details.redAutoRobotOneCrossed) ? 5 : 0})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Robot 2 Crossed</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{(details.blueAutoRobotOneCrossed) ? "✔": "✖"} (+{(details.blueAutoRobotOneCrossed) ? 5 : 0})</Typography>
          </Grid>
          {/* Robot3 Cross */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{(details.redAutoRobotThreeCrossed) ? "✔": "✖"} (+{(details.redAutoRobotThreeCrossed) ? 5 : 0})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Robot 3 Crossed</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{(details.blueAutoRobotThreeCrossed) ? "✔": "✖"} (+{(details.blueAutoRobotThreeCrossed) ? 5 : 0})</Typography>
          </Grid>
          {/* Auto Bottom Fuel */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{details.redAutoBottomCells} (+{details.redAutoBottomCells * 2})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Bottom Cells</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{details.blueAutoBottomCells} (+{details.blueAutoBottomCells * 2})</Typography>
          </Grid>
          {/* Auto Outer Fuel */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{details.redAutoOuterCells} (+{details.redAutoOuterCells * 4})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Outer Cells</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{details.blueAutoOuterCells} (+{details.blueAutoOuterCells * 4})</Typography>
          </Grid>
          {/* Auto Inner Fuel */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{details.redAutoInnerCells} (+{details.redAutoInnerCells * 6})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Inner Cells</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{details.blueAutoInnerCells} (+{details.blueAutoInnerCells * 6})</Typography>
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
            <Typography align={'center'} variant={'body1'}>{details.redTeleBottomCells} (+{details.redTeleBottomCells})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Bottom Cells</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{details.blueTeleBottomCells} (+{details.blueTeleBottomCells})</Typography>
          </Grid>
          {/* Tele Outer Fuel */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{details.redTeleOuterCells} (+{details.redTeleOuterCells * 2})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Outer Cells</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{details.blueTeleOuterCells} (+{details.blueTeleOuterCells * 2})</Typography>
          </Grid>
          {/* Tele Inner Fuel */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{details.redTeleInnerCells} (+{details.redTeleInnerCells * 3})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Inner Cells</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{details.blueTeleInnerCells} (+{details.blueTeleInnerCells * 3})</Typography>
          </Grid>
          {/* Rotation Control */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{(details.redRotationControl) ? "✔": "✖"} (+{(details.redRotationControl) ? 10 : 0})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Rotation Control</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{(details.blueRotationControl) ? "✔": "✖"} (+{(details.blueRotationControl) ? 10 : 0})</Typography>
          </Grid>
          {/* Position Control */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{(details.redPositionControl) ? "✔": "✖"} (+{(details.redPositionControl) ? 20 : 0})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Position Control</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{(details.bluePositionControl) ? "✔": "✖"} (+{(details.bluePositionControl) ? 20 : 0})</Typography>
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
            <Typography align={'center'} variant={'body1'}>{this.getEndText(details.redEndRobotOneStatus)} (+{this.getEndPoints(details.redEndRobotOneStatus)})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Robot 1 End Status</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{this.getEndText(details.blueEndRobotOneStatus)} (+{this.getEndPoints(details.blueEndRobotOneStatus)})</Typography>
          </Grid>
          {/* Robot 2 Status */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{this.getEndText(details.redEndRobotTwoStatus)} (+{this.getEndPoints(details.redEndRobotTwoStatus)})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Robot 2 End Status</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{this.getEndText(details.blueEndRobotTwoStatus)} (+{this.getEndPoints(details.blueEndRobotTwoStatus)})</Typography>
          </Grid>
          {/* Robot 3 Status */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{this.getEndText(details.redEndRobotThreeStatus)} (+{this.getEndPoints(details.redEndRobotThreeStatus)})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Robot 3 End Status</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{this.getEndText(details.blueEndRobotThreeStatus)} (+{this.getEndPoints(details.blueEndRobotThreeStatus)})</Typography>
          </Grid>
          {/* Level */}
          <Grid item={true} xs={3} style={styles.redItem}>
            <Typography align={'center'} variant={'body1'}>{(details.redEndEqualized) ? "✔": "✖"} (+{(details.redEndEqualized) ? 15 : 0})</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerItem}>
            <Typography align={'center'} variant={'body1'}>Position Control</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueItem}>
            <Typography align={'center'} variant={'body1'}>{(details.blueEndEqualized) ? "✔": "✖"} (+{(details.blueEndEqualized) ? 15 : 0})</Typography>
          </Grid>
          {/* PENALTY HEADERS */}
          <Grid item={true} xs={3} style={styles.redHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getRedPenalty(match.blueMinPen, 0)} Points</Typography>
          </Grid>
          <Grid item={true} xs={6} style={styles.headerHeaderItem}>
            <Typography align={'center'} variant={'body1'}>Penalty Points</Typography>
          </Grid>
          <Grid item={true} xs={3} style={styles.blueHeaderItem}>
            <Typography align={'center'} variant={'body1'}>{details.getBluePenalty(match.redMinPen, 0)} Points</Typography>
          </Grid>
        </Grid>
      </Card>
    );
  }

  private getEndText(state: number): string {
    switch (state) {
      case 0:
        return "None";
      case 1:
        return "Parked";
      case 2:
        return "Hanging";
      default:
        return "Not Parked";
    }
  }

  private getEndPoints(state: number): number {
    switch (state) {
      case 0:
        return 0;
      case 1:
        return 25;
      default:
        return 0;
    }
  }
}

export default FRC20DetailCard;
