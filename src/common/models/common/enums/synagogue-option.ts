export enum SynagogueOption {
  Mikve,
  Parking,
  DisabledAccess,
  Shtiblach
}

export function CreateSynagogueOptions(){
  let options = {};
  Object.keys(SynagogueOption).filter(opt => isNaN(opt as any)).forEach(k => {
    options[k] = null;
  });
  return options;
}

export type SynagogueOptions = {
  [synagogueOption: string]: boolean
}

export function TranslateSynagogueOption(option: SynagogueOption){
  switch (option){
    case SynagogueOption.DisabledAccess:
      return "נגישות לנכים";
    case SynagogueOption.Mikve:
      return "מקווה";
    case SynagogueOption.Parking:
      return "חנייה";
    case SynagogueOption.Shtiblach:
      return "שטיבלך";
  }
}
