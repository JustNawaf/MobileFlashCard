import * as Notifications from 'expo-notifications';
import { DeckInterface } from '../interfaces';

export async function schedulePushNotificationForDeck(deck:DeckInterface) {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: `Deck ${deck.title}`,
      body: "Do You'r Quiz Before It's Too Late 📬",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 60 * 60 * 24, repeats:true },
  });

  return id;
}

export async function scheduleAndCancel(DeckNotification:any) {
  await Notifications.cancelScheduledNotificationAsync(DeckNotification.id);
}