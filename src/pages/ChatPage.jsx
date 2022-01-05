import React, { useContext } from 'react';
import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewWillLeave,
} from '@ionic/react';
import { attachOutline, happyOutline, sendSharp } from 'ionicons/icons';
import { AppContext } from '../State';

function ChatPage() {
  const { state, dispatch } = useContext(AppContext);

  useIonViewWillLeave(() => {
    dispatch({
      type: 'setNoTabs',
      payload: false,
    });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="menu-bar">
          <IonAvatar
            slot="start"
            style={{ width: '40px', height: '40px', marginLeft: '10px' }}
          >
            {/* <img src={state.chattingWith.avatar} alt="icon" /> */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              alt="icon"
            />
          </IonAvatar>
          <IonTitle>{state.chattingWith.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>Hi, this is Chat Page</IonContent>

      <IonFooter>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonGrid>
                  <IonRow>
                    <IonCol size="2">
                      <IonIcon size="large" icon={happyOutline}></IonIcon>
                    </IonCol>

                    <IonCol>
                      <IonInput placeholder="Type a message"></IonInput>
                    </IonCol>

                    <IonCol size="2">
                      <IonIcon
                        className="attach-icon"
                        size="large"
                        icon={attachOutline}
                      ></IonIcon>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>

              <IonCol size="2">
                <IonButton className="chat-send-button">
                  <IonIcon icon={sendSharp}></IonIcon>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}

export default ChatPage;
