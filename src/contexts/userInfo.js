import { createContext, useState } from 'react';

const UserContext = createContext({
  userState: { userid: '', userpw: '', sabun: '' },
  userActions: {
    setUserid: () => {},
    setUserpw: () => {},
    setSabun: () => {},
  },
});

const UserProvider = (props) => {
  const [userid, setUserid] = useState('');
  const [userpw, setUserpw] = useState('');
  const [sabun, setSabun] = useState('');

  const value = {
    userState: { userid, userpw, sabun },
    userActions: { setUserid, setUserpw, setSabun },
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserContext;

const { Consumer: UserConsumer } = UserContext;

export { UserProvider, UserConsumer };
