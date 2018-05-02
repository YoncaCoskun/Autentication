import React , { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header ,Button, Spinner, Card , CardSection} from './src/components/common';
import LoginForm from './src/components/LoginForm';



class App extends Component {
  state = { loggedIn:null };

  componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyCc4vlvkgTqfyNGqQ1v0X1yDBrNm6Fv9Ns",
      authDomain: "authentication-1fc12.firebaseapp.com",
      databaseURL: "https://authentication-1fc12.firebaseio.com",
      projectId: "authentication-1fc12",
      storageBucket: "",
      messagingSenderId: "913846924371"
    });


    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({ loggedIn: true });
      }else{
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent(){
    switch (this.state.loggedIn) {
      case true:
        return (<Card>
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log out
            </Button>
          </CardSection>
        </Card>);
      case false:
        return <LoginForm/>;
        break;
      default:
        return <Spinner size="large"/>;

    }
  }

  render(){
    return(
        <View>
          <Header headerText = "Authentication"/>
          {this.renderContent()}
        </View>




    );
  }
};


export default  App;
