import {Event, EventDate} from "./event";
import {Location} from "../common/location";

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

export class PrayerEvent implements Event {
  date: EventDate;
  location: Location;
  title: string;
  styles: PrayerVersion[];
  types: PrayerEvent;
}
