import React from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from './screens/Home'
import { hot } from 'react-hot-loader/root'
import Layout from './components/Layout'

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/" render={() => <Redirect to="/home" />} />
      </Switch>
    </Layout>
  </Router>
)

export default hot(App)
