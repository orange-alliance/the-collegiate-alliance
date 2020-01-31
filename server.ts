import express, { Application } from 'express';
import * as fs from 'fs';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import * as AxiosHooks from "axios-hooks";
import * as path from "path";

// App imports
import App from "./src/App";
import https from "https"
import * as constants from "constants";
import {CURRENT_SEASON} from "./src/AppTheme";
import {getEventTypeFromKey} from "./src/views/events/EventsView";
import {
  Event,
  FGCProvider,
  ICompleteTeamResponse,
  Match,
  MatchParticipant,
  Ranking,
  Team
} from "@the-orange-alliance/lib-ems";

// Redux imports
import {createStore} from "redux";
import {Provider} from "react-redux";
import {IApplicationState} from "./src/store/Models";
import appReducer, {initialState} from "./src/store/Reducer";
import * as http from "http";
import proxy from "express-http-proxy";

const app: Application = express();
const apiIp = "35.222.228.136";

FGCProvider.initialize(apiIp, 8443);
// FGCProvider.initialize("127.0.0.1", 8088);

// app.use('/api/*', (req: any, res: any) => {
//   req.pipe()
// });

// The client needs this first line to find the actual index.js file.
app.use('/build/client', express.static(path.resolve("build/client")));
app.use(express.static(path.resolve("build/client")));
app.use('/static', express.static(path.resolve("static")));

// Serve requests with our render function
app.get("/", render);
app.get("/teams", render);
app.get("/team/:teamKey", render);
app.get("/events", render);
app.get("/events/:seasonKey", render);
app.get("/match/:matchKey", render);
app.get("/rankings", render);
app.get("/streams", render);

app.use('/api', proxy('https://' + apiIp + ':8443/api'));

async function render(req: any, res: any, next: any) {
  // Create application store.
  const initialState: IApplicationState = await loadPageData(req);
  const store = createStore(appReducer, initialState);

  const context: any = {};

  const index = fs.readFileSync("index.html", 'utf8');
  const cache = await (AxiosHooks as any).serializeCache();
  const appElement = React.createElement(App, {store: store});
  const routerElement = React.createElement(StaticRouter, {location: req.url, context: context}, appElement);
  const appProvider = React.createElement(Provider, {store: store}, routerElement);
  const html = renderToString(appProvider);

  const state = store.getState();

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.send(
      index
        .replace("href=\"static/css/flag-icon.min.css", `href="${req.protocol}://${req.headers.host}/static/css/flag-icon.min.css`)
        .replace("href=\"static/css/index.css", `href="${req.protocol}://${req.headers.host}/static/css/index.css`)
        .replace('{{{body}}}', html)
        .replace('["__AXIOS__"]', JSON.stringify(cache).replace(/</g, '\\u003c'))
        .replace('["__REDUX__"]', JSON.stringify(prepareState(state)).replace(/</g, '\\u003c'))
        .replace("build/client/index.js", `${req.protocol}://${req.headers.host}/build/client/index.js`)
    );
  }
}

async function loadPageData(req: any, params?: any): Promise<IApplicationState> {
  if(req.protocol === 'http') FGCProvider.initialize(apiIp, 8080);
  switch (req.path) {
    case "/":
      const homeTeams: Team[] = await FGCProvider.getTeamsBySeason(CURRENT_SEASON);
      const upcomingMatches: Match[] = await FGCProvider.getUpcomingMatches(CURRENT_SEASON, 10);
      const highestScoringMatch: Match = await FGCProvider.getHighestScoringMatch(CURRENT_SEASON, "quals", false);
      const matchSize: number = await FGCProvider.getPlayedMatchCount(CURRENT_SEASON);
      return {...initialState, teams: homeTeams, matches: upcomingMatches, completeMatch: highestScoringMatch, matchSize: matchSize};
    case "/teams":
      const teams: Team[] = await FGCProvider.getTeamsBySeason(CURRENT_SEASON);
      return {...initialState, teams: teams};
    case "/events":
      const event: Event = await FGCProvider.getEventBySeason(CURRENT_SEASON);
      const eventMatches: Match[] = await FGCProvider.getAllEventMatches(event.eventKey);
      const eventTeams: Team[] = await FGCProvider.getTeams(event.eventKey);
      const eventRanks: Ranking[] = await FGCProvider.getRankingTeams(event.eventKey, getEventTypeFromKey(event.season.seasonKey.toString()));
      return {...initialState, event: event, matches: eventMatches.filter((m: Match) => m.tournamentLevel > Match.PRACTICE_LEVEL), teams: eventTeams, rankings: eventRanks};
    case `/team/${req.params.teamKey}`:
      const completeTeam: ICompleteTeamResponse = await FGCProvider.getCompleteTeam(req.params.teamKey, CURRENT_SEASON);
      return {...initialState, completeTeam: {
        rankings: completeTeam.rankings,
        matches: completeTeam.matches.filter((m: Match) => m.tournamentLevel > Match.PRACTICE_LEVEL),
        team: completeTeam.team
      }};
    case `/match/${req.params.matchKey}`:
      const completeMatch: Match = await FGCProvider.getCompleteMatch(req.params.matchKey);
      return {...initialState, completeMatch: completeMatch};
    case "/rankings":
      const rankings: Ranking[] = await FGCProvider.getRankingTeams("2019-FGC-DUB", getEventTypeFromKey("2019"));
      return {...initialState, rankings: rankings};
      default:
      return initialState;
  }
}

function prepareState(state: IApplicationState): any {
  return {
    completeMatch: prepareCompleteMatch(state.completeMatch),
    completeTeam: prepareCompleteTeam(state.completeTeam),
    seasons: [],
    matchSize: state.matchSize,
    event: state.event.toJSON(),
    matches: state.matches.map((m: Match) => prepareCompleteMatch(m)),
    rankings: state.rankings.map((r: Ranking) => r.toJSON()),
    teams: state.teams.map((t: Team) => t.toJSON())
  };
}

function prepareCompleteMatch(match: Match): any {
  const matchJSON: any = match.toJSON();
  matchJSON.participants = typeof match.participants !== "undefined" ? match.participants.map((p: MatchParticipant) => p.toJSON()) : [];
  matchJSON.details = typeof match.matchDetails !== "undefined" ? match.matchDetails.toJSON() : undefined;
  return matchJSON;
}

function prepareCompleteTeam(cTeam: ICompleteTeamResponse) {
  let cTeamJSON: any = {};
  cTeamJSON.team = cTeam.team.toJSON();
  cTeamJSON.matches = cTeam.matches.map((m: Match) => {
    const matchJSON: any = m.toJSON();
    matchJSON.participants = m.participants.map((p: MatchParticipant) => p.toJSON());
    return matchJSON;
  });
  cTeamJSON.rankings = cTeam.rankings.map((r: Ranking) => r.toJSON());
  return cTeamJSON;
}

// Start HTTP server
http.createServer(app).listen({
  port: 80,
  host: '0.0.0.0'
}, () => console.log("HTTP server listening on port 80"));

// Check for a HTTPS Cert on User's computer. If it's there, we'll serve HTTPS.
if (fs.existsSync('/etc/letsencrypt/live/live.firstalumnicollegiatecomp.org/cert.pem')) {
  // We see a cert, lets open https server
  https.createServer({
    cert: fs.readFileSync('/etc/letsencrypt/live/live.firstalumnicollegiatecomp.org/cert.pem', 'utf8'),
    key: fs.readFileSync('/etc/letsencrypt/live/live.firstalumnicollegiatecomp.org/privkey.pem', 'utf8'),
    ca: fs.readFileSync('/etc/letsencrypt/live/live.firstalumnicollegiatecomp.org/fullchain.pem', 'utf8'),
    secureOptions: constants.SSL_OP_NO_TLSv1
  }, app).listen(443, function () {
    console.log('HTTPS server listening on port 443')
  });
}
