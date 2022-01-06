import React, { useContext } from 'react';
import { IonItem, IonAvatar, IonLabel, useIonViewDidEnter } from '@ionic/react';
import { useHistory } from 'react-router';
import { AppContext } from '../State';
import db from '../Firestore';

function ChatItem({ contact }) {
  let history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const [lastMessage = {}, setLastMessage] = React.useState();

  // let profile_photo = contact.avatar
  //   ? contact.avatar
  //   : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
  let profile_photo =
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

  let messageSubscription = React.useRef(null);

  useIonViewDidEnter(async () => {
    let channel1 = `${state.user.user_id},${contact.user_id}`;
    let channel2 = `${contact.user_id},${state.user.user_id}`;

    messageSubscription = await db
      .collection('messages')
      .where('channel', 'in', [channel1, channel2])
      .orderBy('time', 'desc')
      .limit(1)
      .onSnapshot(function (querySnapshot) {
        let messages = [];

        querySnapshot.forEach((doc) => {
          messages.push(doc.data());
        });
        if (messages.length > 0) {
          setLastMessage(messages[0]);
        }
      });
  });

  const goToChat = () => {
    dispatch({
      type: 'setNoTabs',
      payload: true,
    });

    dispatch({
      type: 'setChattingWith',
      payload: contact,
    });
    history.push('/chatpage');
  };

  return (
    <IonItem onClick={goToChat}>
      <IonAvatar slot="start">
        <img src={profile_photo} alt="icon" />
      </IonAvatar>
      <IonLabel>
        <h2>{contact.name}</h2>
        <p>{lastMessage.message || '...'}</p>
      </IonLabel>
    </IonItem>
  );
}

export default ChatItem;
