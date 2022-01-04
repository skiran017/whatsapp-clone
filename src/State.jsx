import React, { createContext, useReducer } from 'react';

let AppContext = createContext({});

const initialState = {
  appName: 'WhatsApp',
  user: JSON.parse(localStorage.getItem('whatsapp-clone-user')),
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'setAppName': {
      return {
        ...state,
        appName: action.payload.appName,
      };
    }
    case 'loadUser': {
      const user = action.payload;
      localStorage.setItem('whatsapp-clone-user', JSON.stringify(user));

      return { ...state, user: user };
    }

    default:
      break;
  }
};

const AppContextProvider = (props) => {
  const appState = {
    ...initialState,
  };
  let [state, dispatch] = useReducer(reducer, appState);
  let value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
