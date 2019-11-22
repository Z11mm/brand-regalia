/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from '../pages/homepage/Homepage';
import ShopPage from '../pages/shop/ShopPage';
import Header from '../header/Header';
import SignInAndSignUpPage from '../pages/sign-in-and-sign-up/SignInAndSignUp';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { setCurrentUser } from '../../redux/user/user.actions';
import './App.css';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount = () => {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);