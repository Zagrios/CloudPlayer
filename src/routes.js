import {createRouter, createWebHistory} from 'vue-router';

import Init from "./components/init"
import Home from "./components/home/home"
import tracks from "./components/home/content/tracks"
import favorites from "./components/home/content/favorites"
import playlists from "./components/home/content/playlists"
import playlistTracks from "./components/home/content/playlistTracks"
import artists from "./components/home/content/artists"
import artistTracks from "./components/home/content/artistTracks"
import albums from "./components/home/content/albums"
import albumTracks from "./components/home/content/albumTracks"
import options from "./components/home/content/options"
import profil from "./components/home/content/profil"

const routes = [
    {path: '/', component: Init},
    {path: '/home', component: Home, children:[
        {path: 'tracks', component:tracks},
        {path: 'favorites', component:favorites},
        {path: 'playlists', component:playlists},
        {path: 'playlists/:name', component:playlistTracks},
        {path: 'artists', component:artists},
        {path: 'artists/:name', component:artistTracks},
        {path: 'albums', component:albums},
		{path: 'albums/:name', component:albumTracks},
		{path: 'options', component:options},
		{path: 'profil', component:profil},
    ]}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router;