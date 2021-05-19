import admin, { ServiceAccount } from "firebase-admin";

import * as serviceAccountKey from "./intern-plus-firebase-adminsdk-local.json";

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as ServiceAccount),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
});

const db = admin.firestore();

export { db };
