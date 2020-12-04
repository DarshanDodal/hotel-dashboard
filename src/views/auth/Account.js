import React, { createContext, useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from './cognitoClient';

const AccountContext = createContext();

const Account = props => {
  const [logedIn, setLoggedIn] = useState(false);
  //   const getSession = async () =>
  //     await new Promise((resolve, reject) => {
  //       const user = Pool.getCurrentUser();
  //       if (user) {
  //         user.getSession((err, session) => {
  //           if (err) {
  //             reject();
  //           } else {
  //             setLoggedIn(true);
  //             resolve(session);
  //           }
  //         });
  //       } else {
  //         reject();
  //       }
  //     });

  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            setLoggedIn(true);
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });

  const authenticate = async (Username, Password) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: data => {
          console.log('onSuccess:', data);
          resolve(data);
        },

        onFailure: err => {
          console.error('onFailure:', err);
          reject(err);
        },

        newPasswordRequired: data => {
          console.log('newPasswordRequired:', data);
          resolve(data);
        }
      });
    });

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      return true;
    }
    return false;
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        logedIn
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
