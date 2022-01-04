import React, { useState, useContext } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
} from '@ionic/react';

import '../App.css';
import db from '../Firestore';
import { AppContext } from '../State';

function Login() {
  const { state, dispatch } = useContext(AppContext);

  const [passCode, setPassCode] = useState();
  const [showLoading, setShowLoading] = useState(false);

  const login = async () => {
    //login progress
    setShowLoading(true);

    //connect to firebase and check for user with passcode
    let user;
    const fetchUser = await db
      .collection('users')
      .where('passcode', '==', passCode)
      .get();

    fetchUser.forEach((doc) => {
      user = doc.data();
      user.id = doc.id;
    });

    //call mutation to set the user data in state
    dispatch({
      type: 'loadUser',
      payload: user,
    });

    //remove the progress widget
    setShowLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="login-bar">
          <IonTitle>Two-step Verification</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="passcode-text">
          Enter a four digit passcode which you'll be asked for when you
          register your phone number with WhatsApp-C:
        </div>
        <div className="passcode-input-section">
          <IonItem className="passcode-input">
            <IonInput
              value={passCode}
              onIonChange={(e) => setPassCode(e.detail.value)}
            ></IonInput>
          </IonItem>
        </div>
        <IonButton
          className="login-button"
          onClick={() => login()}
          disabled={!passCode}
        >
          Login
        </IonButton>
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Please wait...'}
        />
      </IonContent>
    </IonPage>
  );
}

export default Login;
