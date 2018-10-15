export enum EventTypes {
  Prayer = 'תפילה',
  Lesson = 'שיעור תורה'
}

export function pluralized(et: EventTypes){
  switch (et)
  {
    case EventTypes.Lesson:
      return 'שיעורי תורה';
    case EventTypes.Prayer:
      return 'תפילות';
  }
}
