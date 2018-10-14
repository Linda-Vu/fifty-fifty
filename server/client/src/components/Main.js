import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateRoom from './create/CreateRoom';
import Survey from './room/Survey';
import ResponseRoom from './room/ResponseRoom';

const Main = () => (
    <main id="body" >
      <Switch>
        <Route exact path='/' component={CreateRoom}/>
        <Route exact path='/room/:roomId' component={Survey}/>
        <Route exact path='/room/:roomId/responses' component={ResponseRoom}/>
      </Switch>
    </main>
  )

export default Main;