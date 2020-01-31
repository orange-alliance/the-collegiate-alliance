import * as React from "react";
import AppTheme, {CURRENT_SEASON} from "../AppTheme";

// Team logos 2020
import dy20 from "./assets/team-logos/20/dy.jpg";
import fs20 from "./assets/team-logos/20/fs.jpg";
import gv20 from "./assets/team-logos/20/gv.jpg";
import il20 from "./assets/team-logos/20/il.jpg";
import ke20 from "./assets/team-logos/20/ke.jpg";
import mr20 from "./assets/team-logos/20/mr.jpg";
import ms20 from "./assets/team-logos/20/ms.jpg";
import os20 from "./assets/team-logos/20/os.jpg";
import {Team} from "@the-orange-alliance/lib-ems";


const styles = {
  logos: {
    width: '110%'
  }
};

interface IProps {
  team: Team;
}

interface IState {
  loading: boolean;
}

class TeamImage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      loading: true
    };
  }

  public componentWillMount(): void {

  }

  public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {

  }

  public render() {
    const {team} = this.props;

    function getImg(imgCode: string) {
      switch (imgCode){
        case "dy": return dy20;
        case "fs": return fs20;
        case "gv": return gv20;
        case "il": return il20;
        case "ke": return ke20;
        case "mr": return mr20;
        case "ms": return ms20;
        case "os": return os20;
      }
    }

    return (
      <img src={getImg(team.countryCode)} style={styles.logos}/>
    );
  }
}

export default TeamImage;
