import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

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
            <Route exact path='/' render={() => {
              return (<div>Hello World!</div>);
            }}/>
          </Switch>
        </BrowserRouter>
      </AppContainer>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('appContainer'));
