/* exported data */
interface CardData{
  view: 'entry-form' | 'card-entries';
  spell: any[];
  trap: any[];
  name: any[];
  archetype: any[];
  nextEntryId:number;
  editing: null | CardCategories;
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
      editing: null,
    };
  }
  return data;
}

function writeData(): void {
  const localDataJSON = JSON.stringify(data);
localStorage.setItem(localStorageDataKey, localDataJSON);
}
