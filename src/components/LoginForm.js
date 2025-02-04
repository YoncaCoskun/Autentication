import React , { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button , Card , CardSection, Input , Spinner } from './common';


class LoginForm extends Component{
  state = { email: '' , password: '' , error: '', loading: false};

  onButtonPress(){
    //Butona tıklandığında sig in olabilme özelliği

    const { email, password } = this.state;

    this.setState({ error: '' , loading: true });

    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(this.onLoginSuccess.bind(this))
        .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail(){
    this.setState({ error: 'Authentication Failed.', loading:false});
  }

  onLoginSuccess(){
    this.setState({
        email: '',
        password: '',
        loading: false,
        error: ''
     });
  }

  renderButton(){
    if(this.state.loading === true){
        return <Spinner size = "small"/>
    }
    else{
      return(
        <Button onPress={this.onButtonPress.bind(this)}>
        Log in
        </Button>
      );
    }
  }

  render(){
    return(
      <Card>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label = "Email"
            value={this.state.email}
            onChangeText={text=> this.setState({ email: text })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label = "Password"
            value={this.state.password}
            onChangeText={text=> this.setState({ password: text })}
          />
        </CardSection>

        <Text style = { styles.errorTextSytle }>
        {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}
const styles={
  errorTextSytle:{
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
