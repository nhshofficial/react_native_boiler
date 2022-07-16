import React from 'react';
import SQLite from 'react-native-sqlite-storage';

// SQLite db for user data
export const db = SQLite.openDatabase(
  {
    name: 'mainBD',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

// Create table for user data
export const createTable = () => {
  db.transaction(trx => {
    trx.executeSql(
      'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, theme TEXT)',
      [],
      () => {
        console.log('user Table created');
      },
    );
    // trx.executeSql(
    //   'CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, catName TEXT, catId INT NOT NULL UNIQUE )',
    //   [],
    //   () => {
    //     console.log('favorites Table created');
    //   },
    // );
  });
};
