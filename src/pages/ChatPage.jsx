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
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react';
import { attachOutline, happyOutline, sendSharp } from 'ionicons/icons';
import { Plugins, CameraResultType } from '@capacitor/core';

import { AppContext } from '../State';
import db from '../Firestore';
import Utility from '../Utility';
import ChatMessage from '../components/ChatMessage';

const { Camera } = Plugins;

function ChatPage() {
  const { state, dispatch } = useContext(AppContext);
  const [message, setMessage] = React.useState();
  const [chatMessages = [], setChatMessages] = React.useState();
  let messageSubscription = React.useRef(null);

  useIonViewWillEnter(async () => {
    //channel 'user1,user2' or 'user2,user1'
    let channel1 = `${state.user.user_id},${state.chattingWith.user_id}`;
    let channel2 = `${state.chattingWith.user_id},${state.user.user_id}`;

    messageSubscription = await db
      .collection('messages')
      .where('channel', 'in', [channel1, channel2])
      .orderBy('time')
      .limit(100)
      .onSnapshot(function (querySnapshot) {
        let messages = [];

        querySnapshot.forEach(function (doc) {
          messages.push(doc.data());
        });
        setChatMessages(messages);
      });
  });

  useIonViewWillLeave(async () => {
    dispatch({
      type: 'setNoTabs',
      payload: false,
    });

    //unsubscribe
    messageSubscription();
  });

  const getImage = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    await sendMessage(null, 'media', image.base64String);
  };

  const sendMessage = async (s = null, type, file = null) => {
    if (message || type === 'media') {
      let messageBody = {
        message_id: Utility.genRandom(),
        sent_by: state.user.user_id,
        channel: `${state.user.user_id},${state.chattingWith.user_id}`,
        type: !type ? 'text' : type,
        message: message || '',
        file_url: file,
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

      <IonContent className="chat-page-content">
        {chatMessages.map((chat) => (
          <ChatMessage key={chat.message_id} chat={chat} />
        ))}
      </IonContent>

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
                        onClick={getImage}
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
