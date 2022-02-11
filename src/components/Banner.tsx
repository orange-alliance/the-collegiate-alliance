import * as React from "react";

import BANNER_IMG from "../assets/frc-22-banner.png";

const styles = {
  container: {
    height: '25vh',
    overflow: 'hidden'
  },
  bg: {
    width: '100%'
  }
};

class Banner extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div style={styles.container}>
        <img style={styles.bg} src={BANNER_IMG}/>
      </div>
    );
  }
}

export default Banner;
