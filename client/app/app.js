import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import HelloWorld from 'Components/HelloWorld'

class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
      <AppContainer>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={HelloWorld}/>
          </Switch>
        </BrowserRouter>
      </AppContainer>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('appContainer'));
