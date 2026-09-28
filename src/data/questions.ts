export type ScenarioQuestion = { prompt: string; answers: string[] };

export const questionsByScenario: Record<string, ScenarioQuestion[]> = {
  'iraq-war': [
    { prompt: 'Intelligence reports remain unverified. What is your first move?', answers: ['Request an independent inspection', 'Prepare an immediate strike', 'Build an allied coalition', 'Delay the decision indefinitely'] },
    { prompt: 'Public pressure rises while evidence is still incomplete. How do you proceed?', answers: ['Address the public with the facts', 'Classify all information', 'Delegate the decision to allies', 'Escalate the military posture'] },
    { prompt: 'Your final order will shape regional stability. Which priority leads?', answers: ['Civilian protection and diplomacy', 'Speed and decisive force', 'Political credibility at home', 'Economic leverage'] },
  ],
  'cuban-crisis': [
    { prompt: 'Reconnaissance confirms missiles in Cuba. What is your opening response?', answers: ['Establish a naval quarantine', 'Authorize an air strike', 'Contact Moscow privately', 'Address the United Nations'] },
    { prompt: 'A Soviet ship approaches the blockade line. What is your command?', answers: ['Hold position and signal restraint', 'Force the ship to turn back', 'Allow passage for inspection', 'Move the fleet away'] },
    { prompt: 'A diplomatic offer arrives with conditions. What will you accept?', answers: ['A mutual de-escalation agreement', 'Only unconditional withdrawal', 'A public summit first', 'No deal until Congress approves'] },
  ],
  'cold-war': [
    { prompt: 'An encrypted transmission reaches your desk. What do you do first?', answers: ['Verify the source independently', 'Share it with an ally', 'Broadcast it to the public', 'Ignore it as misinformation'] },
    { prompt: 'The signal points to a possible breach. Which team takes the lead?', answers: ['A joint intelligence task force', 'A military response unit', 'A diplomatic backchannel', 'A public investigation panel'] },
    { prompt: 'The sender requests a private meeting. How do you answer?', answers: ['Meet with safeguards in place', 'Demand proof before meeting', 'Send an intermediary', 'Refuse all contact'] },
  ],
};
