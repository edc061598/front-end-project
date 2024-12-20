/* exported data */
interface CardData{
  view: 'entry-form' | 'card-entries';
  spell: any[];
  trap: any[];
  name: any[];
  archetype: any[];
  nextEntryId:number;
  entryId: number;
  selectedCards: any[];

}

const localStorageDataKey = 'Entry-form';
const data = readData();

function readData(): CardData {
  let data: CardData;
  const localStorageData = localStorage.getItem(localStorageDataKey);

  if(localStorageData){
    data = JSON.parse(localStorageData) as CardData;
  } else {
    data = {
      view:'entry-form',
      spell: [],
      trap: [],
      name: [],
      archetype: [],
      nextEntryId: 1,
      entryId: 0,
      selectedCards:[],
    };
  }
  return data;
}

function writeData(): void {
  const localDataJSON = JSON.stringify(data);
localStorage.setItem(localStorageDataKey, localDataJSON);
}
