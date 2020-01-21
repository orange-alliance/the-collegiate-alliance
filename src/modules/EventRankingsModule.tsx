import * as React from "react";
import FRC20RankingTable from "../components/game-specific/FRC20RankingTable";
import AppTheme from "../AppTheme";

import {Ranking} from "@the-orange-alliance/lib-ems";

const styles = {
  container: {
    margin: AppTheme.spacing(1)
  }
};

interface IProps {
  rankings: Ranking[];
}

class EventRankingsModule extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {rankings} = this.props;
    return (
      <div style={styles.container}>
        <FRC20RankingTable rankings={rankings}/>
      </div>
    );
  }
}

export default EventRankingsModule;