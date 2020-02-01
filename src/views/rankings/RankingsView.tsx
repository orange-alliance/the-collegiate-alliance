import * as React from 'react';

import {FGCProvider, Ranking} from "@the-orange-alliance/lib-ems";
import {ApplicationActions, ISetRankings, setRankings} from "../../store/Actions";
import {Dispatch} from "redux";
import {IApplicationState} from "../../store/Models";
import {getEventTypeFromKey} from "../events/EventsView";
import {connect} from "react-redux";
import EventRankingsModule from "../../modules/EventRankingsModule";
import {CURRENT_SEASON, CURRENT_SEASON_EVENT_ID} from "../../AppTheme";

const TIME = 10000;

interface IProps {
  rankings: Ranking[];
  setRankings: (rankings: Ranking[]) => ISetRankings;
}

interface IState {
  index: number
}

class RankingsView extends React.Component<IProps, IState> {
  private _itemsPerCycle: number;
  private _start: number;

  constructor(props: IProps) {
    super(props);

    this._itemsPerCycle = 20;
    this._start = 0;
    this.state = {
      index: 0
    };
  }

  public componentDidMount() {
    const {setRankings} = this.props;
    console.log(CURRENT_SEASON_EVENT_ID, getEventTypeFromKey(CURRENT_SEASON));
    FGCProvider.getRankingTeams(CURRENT_SEASON_EVENT_ID, getEventTypeFromKey(CURRENT_SEASON)).then((rankings: Ranking[]) => {
      setRankings(rankings);
      global.setInterval(() => {
        if (this._start + this._itemsPerCycle <= rankings.length) {
          this._start += this._itemsPerCycle;
          this.setState({index: this._start});
          this.forceUpdate();
        } else {
          FGCProvider.getRankingTeams(CURRENT_SEASON_EVENT_ID, getEventTypeFromKey(CURRENT_SEASON)).then((rankings: Ranking[]) => {
            setRankings(rankings);
            this._start = 0;
            this.setState({index: this._start});
            this.forceUpdate();
          });
        }
      }, TIME);
    });
  }

  public render() {
    const {rankings} = this.props;
    let rankingsView = [];
    let count: number = 0;
    for (let i = 0; i < rankings.length; i++) {
      if (i >= this._start && count <= this._itemsPerCycle) {
        count++;
        rankingsView.push(rankings[i]);
      }
    }
    return (
      <EventRankingsModule rankings={rankingsView}/>
    );
  }
}

export function mapStateToProps(state: IApplicationState) {
  return {
    rankings: state.rankings
  };
}

export function mapDispatchToProps(dispatch: Dispatch<ApplicationActions>) {
  return {
    setRankings: (rankings: Ranking[]) => dispatch(setRankings(rankings))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(RankingsView);
