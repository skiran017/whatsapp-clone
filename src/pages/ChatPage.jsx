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
import db from '../Firestore';
import Utility from '../Utility';

function ChatPage() {
  const { state, dispatch } = useContext(AppContext);
  const [message, setMessage] = React.useState();

  useIonViewWillLeave(() => {
    dispatch({
      type: 'setNoTabs',
      payload: false,
    });
  });

  const sendMessage = async () => {
    if (message) {
      let messageBody = {
        message_id: Utility.genRandom(),
        sent_by: state.user.user_id,
        channel: `${state.user.user_id},${state.chattingWith.user_id}`,
        type: 'text',
        message: message,
        file_url: null,
        time: +Date.now(),
      };

      const send_response = await db.collection('messages').add(messageBody);

      setMessage(null);
    }
  };

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
                      <IonInput
                        placeholder="Type a message"
                        value={message}
                        onIonChange={(e) => setMessage(e.detail.value)}
                      ></IonInput>
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
                <IonButton onClick={sendMessage} className="chat-send-button">
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
