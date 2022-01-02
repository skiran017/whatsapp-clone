import React, { useContext } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { AppContext } from '../State';

const Tab1 = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <IonPage>
      <IonContent fullscreen>Tab1</IonContent>
    </IonPage>
  );
};

export default Tab1;
