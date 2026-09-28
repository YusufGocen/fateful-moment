import { ImageSourcePropType } from 'react-native';

export type Choice = { id: string; text: string; impact: [number, number, number, number, number, number] };
export type Scenario = { id: string; title: string; duration: string; teaser: string; briefing: string; image: ImageSourcePropType; choices: Choice[] };

export const scenarios: Scenario[] = [
  {
    id: 'iraq-war', title: 'Iraq War', duration: '1:37 min', image: require('../../assets/video-page.png'),
    teaser: '2003. The Chemical Weapon Allegations Are On Your Desk. Your Decision Will Determine The Fate Of Millions.',
    briefing: '2003. The Chemical Weapon Allegations Are On Your Desk. Your Decision Will Determine The Fate Of Millions.',
    choices: [
      { id: 'blockade', text: 'Deniz Karantinası: Küba’yı kuşatıp Sovyet gemilerini engelleyerek gizli pazarlık yürütmek.', impact: [6, 4, 2, 5, 7, 9] },
      { id: 'wait', text: 'Wait for Signal from Moscow', impact: [4, 6, 1, 6, 8, 8] },
      { id: 'timeline', text: 'Zaman Baskısına Uyum: Siyasi ve medya baskısı nedeniyle risklere rağmen belirlenen takvimde fırsatmayı başlat.', impact: [8, 7, 8, 4, 3, 3] },
      { id: 'sonar', text: 'Signal US Ships with Sonar', impact: [5, 5, 4, 7, 6, 6] },
    ],
  },
  {
    id: 'cuban-crisis', title: 'Cuban Missile Crisis (1962)', duration: '1:25 min', image: require('../../assets/video-page.png'),
    teaser: 'A World On The Brink Of Nuclear Annihilation. You Are In Kennedy’s Seat.',
    briefing: 'The world is watching. Your next order may decide whether diplomacy survives.',
    choices: [
      { id: 'blockade', text: 'Establish a naval quarantine and open a diplomatic channel.', impact: [6, 4, 2, 5, 7, 9] },
      { id: 'airstrike', text: 'Authorize a limited air strike before the missiles are ready.', impact: [8, 7, 9, 5, 2, 3] },
      { id: 'summit', text: 'Propose a direct summit and accept a slower response.', impact: [5, 4, 2, 6, 9, 8] },
      { id: 'signal', text: 'Signal US ships to verify the approaching vessels.', impact: [5, 6, 4, 7, 6, 6] },
    ],
  },
  {
    id: 'cold-war', title: 'Cold War Signal', duration: '1:20 min', image: require('../../assets/video-page.png'),
    teaser: 'An encrypted transmission changes the balance of power overnight.',
    briefing: 'A signal arrives from an unknown source. Decide which ally to trust.',
    choices: [
      { id: 'ally', text: 'Share the encrypted transmission with your closest ally.', impact: [4, 4, 2, 6, 8, 8] },
      { id: 'hold', text: 'Keep the intelligence contained until its source is confirmed.', impact: [6, 5, 3, 8, 4, 7] },
      { id: 'broadcast', text: 'Make the signal public to change the political balance.', impact: [9, 7, 9, 3, 5, 4] },
      { id: 'counter', text: 'Launch a counter-signal to expose the sender’s position.', impact: [7, 8, 7, 5, 3, 5] },
    ],
  },
];

export const matrixLabels = ['Vision', 'Courage', 'Risk', 'Control', 'Empathy', 'Ethics'];
