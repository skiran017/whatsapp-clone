import React from 'react';
import { IonItem, IonAvatar, IonLabel } from '@ionic/react';

function ChatItem({ contact }) {
  // let profile_photo = contact.avatar
  //   ? contact.avatar
  //   : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
  let profile_photo =
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
  return (
    <IonItem>
      <IonAvatar slot="start">
        <img src={profile_photo} alt="icon" />
      </IonAvatar>
      <IonLabel>
        <h2>{contact.name}</h2>
        <p>
          Hi Everyone, Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Repudiandae, ipsa!
        </p>
      </IonLabel>
    </IonItem>
  );
}

export default ChatItem;
