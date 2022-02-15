import * as React from "react";
import {RouteComponentProps} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import CalendarTodayIcon from "@material-ui/icons/CalendarTodayTwoTone";
import CameraIcon from "@material-ui/icons/VideocamRounded";
import ListIcon from '@material-ui/icons/List';

import HomeView from "./views/home/HomeView"
import TeamsView from "./views/teams/TeamsView";
import EventsView from "./views/events/EventsView";
import StreamingView from "./views/streaming/StreamingView";
import MatchView from "./views/match/MatchView";
import TeamView from "./views/team/TeamView";
import RankingsView from "./views/rankings/RankingsView"
import EventsForwarder from "./views/events/EventsForwarder";

// tslint:disable-next-line:interface-name
export interface AppRoute {
  name: string;
  path: string;
  exact?: boolean;
  component: (routeProps: RouteComponentProps) => JSX.Element;
  menuIcon?: any;
}

// @ts-ignore
const appRoutes: AppRoute[] = [
  {
    name: "Home",
    path: '/',
    exact: true,
    component: () => <HomeView/>, // DEBUG view
    menuIcon: <HomeIcon/>
  },
  {
    name: "Streaming",
    path: '/streams',
    exact: true,
    component: () => <StreamingView/>,
    menuIcon: <CameraIcon/>
  },
  {
    name: "Teams",
    path: '/teams',
    exact: true,
    component: () => <TeamsView/>,
    menuIcon: <PeopleIcon/>
  },/* This was really only for FGC
  {
    name: "Rankings",
    path: '/rankings',
    component: () => <RankingsView/>,
    menuIcon: <ListIcon/>
  },*/
  {
    name: "Forwards to Current Season",
    path: '/events',
    exact: false,
    component: (routeProps: RouteComponentProps) => <EventsForwarder routeProps={routeProps}/>,
  },
  {
    name: "Historical Seasons",
    path: '/events/:seasonKey',
    exact: false,
    component: (routeProps: RouteComponentProps) => <EventsView routeProps={routeProps}/>
  },
  {
    name: "Match",
    path: '/match/:matchKey',
    exact: false,
    component: (routeProps: RouteComponentProps) => <MatchView routeProps={routeProps}/>
  },
  {
    name: "Team",
    path: '/team/:teamKey',
    component: (routeProps: RouteComponentProps) => <TeamView routeProps={routeProps}/>
  }
];

export default appRoutes;
