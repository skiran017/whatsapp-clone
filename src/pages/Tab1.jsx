import React, { useContext } from 'react';
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ChatItem from '../components/ChatItem';
import '../App.css';
import { AppContext } from '../State';

const Tab1 = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <IonPage>
      <IonContent className="chat-screen">
        <IonList>
          {state.user.contacts.map((contact) => (
            <ChatItem contact={contact} key={contact.user_id} />
          ))}
          {/* <ChatItem /> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
