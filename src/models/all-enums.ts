export function enumValues(enumType: any){
  return Object.keys(enumType).map(key => enumType[key]);
}

export enum Events {
  Prayer = 'תפילה',
}

export enum Accessibility {
  HandicappedParking = "חניית נכים",
  FreeParking = "חניה בחינם",
  PaidParking = "חניה בתשלום"
}

export enum PrayerVersion {
  SefaradiMorocco = "ספרדי - מרוקאי",
  SefaradiHaChida = "ספרדי - החידא",
  Sefaradi = "ספרדי - עדות המזרח",
  TeimanBaladi = "תימני - בלדי",
  TeimanShami = "תימני - שאמי",
  Ashkenaz = "אשכנז",
  Sefard = "ספרד",
  Ari = "ארי",
  Chasidic = "חסידי",
  EretzhYisrael = "ארץ ישראל",
  AccordingChazan = "לפי החזן",
}

export enum PrayerTypes {
  Sacharit = "שחרית",
  Minha = "מנחה",
  Arvit = "ערבית",
}

export enum RepeatedPeriod {
  Day,
  Week,
  Month,
  Year
}
