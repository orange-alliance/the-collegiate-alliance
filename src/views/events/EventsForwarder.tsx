import * as React from "react";
import {RouteComponentProps} from "react-router-dom";
import AppTheme, {CURRENT_SEASON} from "../../AppTheme";

interface IProps {
  routeProps: RouteComponentProps;
}

class EventsView extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public componentWillMount() {
    const seasonKey = (this.props.routeProps.match.params as any).seasonKey;
    if(!seasonKey || (seasonKey && seasonKey.length < 1)) {
      this.props.routeProps.history.push(`/events/${CURRENT_SEASON}`)
    }
  }

  public render() {
    return null;
  }
}

export default EventsView;
