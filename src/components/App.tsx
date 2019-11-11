declare var __GAME_ONLY__: boolean;
import React from "react";
import { useRoutes } from "hookrouter";

import Index from "./Index";
import { TournamentsContainer } from "./TournamentsContainer";
import { TournamentContainer } from "./TournamentContainer";
import { Replay } from "./Replay";
import GameContainer from "./GameContainer";
import { TournamentPhase } from "../Tournament";
import '../styles/menu.css';

const routes = {
    "/": () => <Index />,
    "/play": () => <TournamentsContainer name="Play" me={true} phase={TournamentPhase.commit} />,
    "/join": () => <TournamentsContainer name="Join Tournament"  me={false} phase={TournamentPhase.commit} />,
    "/my": () => <TournamentsContainer name="My Tournaments" me={true} />,
    "/tournaments/:id": ({id}) => <TournamentContainer id={id} />,
    "/tournaments/:tournamentId/scores/:id": ({ tournamentId, id }) => <Replay tournamentId={ tournamentId } id={ id } />
};

export const App = () => {
    // TODO: create <NotFoundPage />
    const match = useRoutes(routes);
    const gameVisible = __GAME_ONLY__ || match.type === TournamentContainer || match.type === Replay ;
    return (
        <div>
            <div className={'menu-container'}>
                {__GAME_ONLY__ ? <div/> : match}
            </div>
            <GameContainer visible={gameVisible} />
        </div>
    );
}
