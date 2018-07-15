import moment = require("moment");

export const CardEvents = [
  {
    relativeDistance: 530,
    type: "prayer",
    title: "תפילה",
    shortDescription: "תפילת מנחה",
    friendlyAddress: "המשקיף 9 אשדוד",
    verifiedRecentlyAt: new Date().toLocaleDateString(),
    occursBetween: {start: new Date().toLocaleTimeString(), end: moment().add(1,"hour").toDate().toLocaleTimeString()}
  }
];
