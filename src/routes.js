import {createRouter, createWebHistory} from 'vue-router';

import Init from "./components/init"
import Home from "./components/home/home"
import tracks from "./components/home/content/tracks"
import favorites from "./components/home/content/favorites"
import playlists from "./components/home/content/playlists"
import playlistTracks from "./components/home/content/playlistTracks"

const routes = [
    {path: '/', component: Init},
    {path: '/home', component: Home, children:[
        {path: 'tracks', component:tracks},
        {path: 'favorites', component:favorites},
        {path: 'playlists', component:playlists},
        {path: 'playlists/:name', component:playlistTracks},
    ]}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router;