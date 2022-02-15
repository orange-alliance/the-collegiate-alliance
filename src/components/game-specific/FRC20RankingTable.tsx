import * as React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import {Ranking, InfiniteRechargeRank} from "@the-orange-alliance/lib-ems";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

const styles = {
  header: {
    backgroundColor: '#e9ecef',
  },
  headerCell: {
    color: '#495057'
  },
  buttonLink: {
    justifyContent: 'flex-start',
    height: '20px'
  }
};

interface IProps {
  rankings: Ranking[];
}

class FRC20RankingTable extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const {rankings} = this.props;
    const rankingsView = rankings.map((ranking: Ranking) => {
      const name = typeof ranking.team !== "undefined" ? ranking.team.teamNameShort : ranking.teamKey;
      const rank: InfiniteRechargeRank = ranking as InfiniteRechargeRank;
      return (
        <TableRow key={rank.rankKey}>
          <TableCell>#{rank.rank}</TableCell>
          <TableCell><Link to={`/team/${rank.teamKey}`}><Button focusRipple={true} style={styles.buttonLink}>{name}</Button></Link></TableCell>
          <TableCell>{rank.rankingPoints}</TableCell>
          <TableCell>{rank.rankingScore}</TableCell>
          <TableCell>{rank.autoPoints}</TableCell>
          <TableCell>{rank.telePoints}</TableCell>
          <TableCell>{rank.endPoints}</TableCell>
          <TableCell>{rank.played}</TableCell>
          <TableCell>{rank.wins}-{rank.losses}-{rank.ties}</TableCell>
        </TableRow>
      );
    });
    return (
      <Table size={'small'}>
        <TableHead style={styles.header}>
          <TableRow>
            <TableCell style={styles.headerCell}>Rank</TableCell>
            <TableCell style={styles.headerCell}>Team</TableCell>
            <TableCell style={styles.headerCell}>Ranking Points</TableCell>
            <TableCell style={styles.headerCell}>Ranking Score</TableCell>
            <TableCell style={styles.headerCell}>Auto</TableCell>
            <TableCell style={styles.headerCell}>Tele</TableCell>
            <TableCell style={styles.headerCell}>End</TableCell>
            <TableCell style={styles.headerCell}>Matches Played</TableCell>
            <TableCell style={styles.headerCell}>Record (W-L-T)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rankingsView}
        </TableBody>
      </Table>
    );
  }
}

export default FRC20RankingTable;
