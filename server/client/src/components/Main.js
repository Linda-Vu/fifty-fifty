import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateRoom from './create/CreateRoom';
import Survey from './room/Survey';


const Main = () => (
    <main id="body" >
      <Switch>
        <Route exact path='/' component={CreateRoom}/>
        <Route path='/room/:roomId' component={Survey}/>
      </Switch>
    </main>
  )

export default Main;