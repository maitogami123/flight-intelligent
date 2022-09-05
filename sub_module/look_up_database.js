const { initializeApp, getApps, getApp } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBxBmEuwxQyDn8pgrBsX5jN_-1wB_nBUYQ",
  authDomain: "flight-analysis-d07a5.firebaseapp.com",
  databaseURL: "https://flight-analysis-d07a5-default-rtdb.firebaseio.com",
  projectId: "flight-analysis-d07a5",
  storageBucket: "flight-analysis-d07a5.appspot.com",
  messagingSenderId: "465798936165",
  appId: "1:465798936165:web:cf1fa5ce362c1e097b788c",
  measurementId: "G-YRESC01MPE"
};

async function getData() {
  return new Promise(async (resolve, reject) => {
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const db = getFirestore();
    const doc = await db.collection('database').doc('Lookup').get();
    if (!doc.exists) {
      console.log('No such document!');
    }
    resolve(doc.data())
})
}

module.exports = getData