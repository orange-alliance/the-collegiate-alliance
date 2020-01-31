import * as React from "react";
import AppTheme from "./AppTheme";
import AppRouter from "./AppRouter";
import AppRoutes from "./AppRoutes";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import { ThemeProvider } from '@material-ui/styles';

import FACC_LOGO from "./assets/facc_logo_black_horz.png";
// Team logos 2020
import logo1 from "./assets/team-logos/20/dy.jpg";
import logo2 from "./assets/team-logos/20/fs.jpg";
import logo3 from "./assets/team-logos/20/gv.jpg";
import logo4 from "./assets/team-logos/20/il.jpg";
import logo5 from "./assets/team-logos/20/ke.jpg";
import logo6 from "./assets/team-logos/20/mr.jpg";
import logo7 from "./assets/team-logos/20/ms.jpg";
import logo8 from "./assets/team-logos/20/os.jpg";

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <ThemeProvider theme={AppTheme}>
          <ResponsiveDrawer appRoutes={AppRoutes} title={"The Collegiate Alliance"} logo={FACC_LOGO} view={<AppRouter appRoutes={AppRoutes} />}/>
        </ThemeProvider>
      </div>
    );
  }
}
