import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

admin.initializeApp();

export const myFunction = functions.firestore
    .document("chat/{message}")
    .onCreate((snap, context) => {
        admin
            .messaging()
            .sendToTopic("chat", {
                notification: {
                    title: snap.data().username,
                    body: snap.data().text,
                    clickAction: "FLUTTER_NOTIFICATION_CLICK"
                }
            });
        return;
    })