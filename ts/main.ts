const $entriesForm = document.querySelector('.entries-form') as HTMLFormElement;
if (!$entriesForm) throw new Error('$entriesForm does not exist');

const $placeholderPicture = document.getElementById(
  'deck-picture',
) as HTMLImageElement;
if (!$placeholderPicture) throw new Error('$placeholderPicture does not exist');

const $form = document.querySelector('#contact-form') as HTMLFormElement;
if (!$form) throw new Error('$submit does not exist');

const $typeOfDeck = document.getElementById(
  'deck-type-menu',
) as HTMLInputElement;
if (!$typeOfDeck) throw new Error('$typeOfDeck does not exist');

const $selectButton = document.getElementById('categories') as HTMLInputElement;
if (!$selectButton) throw new Error('$selectButton does not exist');

const $cardList = document.querySelector('.card-list');
if (!$cardList) throw new Error('$cardList does not exist');

const $allCardEntries = document.querySelector('.all-card-entries');
if (!$allCardEntries) throw new Error('$allCardEntries does not exist');

const $h2Element = document.getElementById('new-entry');
if (!$h2Element) throw new Error('$h2Element does not exist');

interface CardEntry extends HTMLFormControlsCollection {
  deckType: HTMLInputElement;
  cardCategories: HTMLInputElement;
  archetype: HTMLInputElement;
  name: HTMLInputElement;
  spell: HTMLInputElement;
  trap: HTMLInputElement;
  entryId: number;
  title: string;
  image_url: string;
  notes: string;
}

/*
interface APIData{
archetype: string;
atk: number;
attribute: string;
card_images: string;
image_url: string;
def:number;
desc: string;
humanReadableCardType: string;
id: number;
level:number;
name:string;
race: string;
type: string;
}
*/
/*
interface CardCategories {
  archetype: string;
  name: any;
  spell: string;
  trap: string;
  entryId: number;
  title: string;
  notes: string;
  photo: string;
} */

function changeCardPicture(): void {
  const value = $typeOfDeck;
  let imgURL: string = '';
  if (value?.value === 'Blue Eyes') {
    imgURL =
      'images/blue_eyes_white_dragon__anime__by_holycrapwhitedragon-db48lo4.jpg';
  } else if (value.value === 'Dark Magician') {
    imgURL = 'images/dattnu1-7bfd7578-4cb9-4972-bafb-63ac78e518a9.png';
  } else if (value.value === 'Red Eyes') {
    imgURL = 'images/apim3vcts__12756.jpg';
  } else {
    imgURL = 'images/placeholder-image-square.jpg';
  }
  $placeholderPicture.src = imgURL;
}
$typeOfDeck.addEventListener('input', changeCardPicture);

function renderEntry(entry: any): HTMLLIElement {
  const $entry = document.createElement('li');
  $entry.setAttribute('data-entry-id', entry.toString());
  const $image = document.createElement('img');
  $image.setAttribute('src', entry.card_images[0].image_url);
  $image.classList.add('scaled');

  $entry.append($image);
  $cardList?.append($entry);
  return $entry;
}

function renderList(entries: any): void {
  for (let i: number = 0; i < entries.length; i++) {
    const dataObject = entries[i];
    console.log('Data array: ', entries[i].card_images[0].image_url);
    $cardList?.append(renderEntry(dataObject));
    // console.log(renderEntry(dataObject));
    // console.log(i);
  }
}

/*
function domContentLoaded(): void{
  if(!$cardList){
    throw new Error('$cardList is null');
  }
  for (let i:number = 0; i < data.archetype.length; i++){
    const entry = data.archetype[i];
    $cardList.append(renderEntry(entry));
  }
  const currentView = data.view;
  viewSwap(currentView);
}
*/

// Example usage: scale the card with entry ID 2

async function nameFunction(name: string): Promise<void> {
  try {
    const nameData = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`,
    );
    if (!nameData.ok) {
      throw new Error(`HTTP ERROR: ${nameData.status}`);
    }
    const { data: dataArray } = await nameData.json();
    console.log(dataArray);
    renderList(dataArray);
  } catch (error) {
    console.log('ERROR: ', error);
  }
}

async function archetypeFunction(archetype: any): Promise<void> {
  try {
    const archetypeData = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${archetype}`,
    );
    if (!archetypeData.ok) {
      throw new Error(`HTTP ERROR: ${archetype.status}`);
    }
    const { data: dataArray } = await archetypeData.json();
    console.log(dataArray);
    /* let dataObject = {}; */
    // renderList(dataArray);
    renderList(dataArray);
  } catch (error) {
    console.log('ERROR: ', error);
  }
}

async function trapFunction(race: any, type: any): Promise<void> {
  try {
    const trapData = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${race}&type=${type}`,
    );
    if (!trapData.ok) {
      throw new Error(`HTTP ERROR: ${trapData.status}`);
    }
    const { data: dataArray } = await trapData.json();
    console.log(dataArray);
    renderList(dataArray);
  } catch (error) {
    console.log('ERROR: ', error);
  }
}

async function spellFunction(race: any, type: any): Promise<void> {
  try {
    const spellData = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${race}&type=${type}`,
    );
    if (!spellData.ok) {
      throw new Error(`HTTP ERROR: ${spellData.status}`);
    }
    const { data: dataArray } = await spellData.json();
    console.log(dataArray);
    renderList(dataArray);
  } catch (error) {
    console.log('ERROR: ', error);
  }
}

function submitFunction(event: Event): void {
  event.preventDefault();
  const $deckElements = $form?.elements as CardEntry;
  /* console.dir($deckElements);
console.log($deckElements.deckType)
console.dir($deckElements[1]) */
  /* updateEntries(cardObject); */
  const category = $deckElements.cardCategories.value;
  const deckType = $deckElements.deckType.value;
  if (deckType === 'Dark Magician' && category === 'Archetype') {
    archetypeFunction('dark magician');
  } else if (deckType === 'Blue Eyes' && category === 'Archetype') {
    archetypeFunction('blue-eyes');
  } else if (deckType === 'Dark Magician' && category === 'Name') {
    nameFunction('dark magician');
  } else if (deckType === 'Blue Eyes' && category === 'Name') {
    nameFunction('blue-eyes white dragon');
  } else if (deckType === 'Dark Magician' && category === 'Spell') {
    spellFunction('dark magician', 'spell card');
  } else if (deckType === 'Blue Eyes' && category === 'Spell') {
    spellFunction('blue-eyes', 'spell card');
  } else if (deckType === 'Dark Magician' && category === 'Trap') {
    trapFunction('dark magician', 'trap card');
  } else if (deckType === 'Blue Eyes' && category === 'Trap') {
    trapFunction('blue-eyes', 'trap card');
  } else if (deckType === 'Red Eyes' && category === 'Archetype') {
    archetypeFunction('red-eyes');
  } else if (deckType === 'Red Eyes' && category === 'Name') {
    nameFunction('red-eyes black dragon');
  } else if (deckType === 'Red Eyes' && category === 'Spell') {
    spellFunction('red-eyes', 'spell card');
  } else if (deckType === 'Red Eyes' && category === 'Trap') {
    trapFunction('red-eyes', 'trap card');
  }
  writeData();
  resetForm();
  /* viewSwap('card-entries'); */
}
$form.addEventListener('submit', submitFunction);

function resetForm(): void {
  $placeholderPicture.src = 'images/placeholder-image-square.jpg';
  $form.reset();
}

/*
function viewSwap(viewName: 'card-entries' | 'entry-form'): void{
  if(viewName === 'card-entries'){
    $entriesForm.classList.add('hidden');
    $allCardEntries?.classList.remove('hidden');
  } else if(viewName === 'entry-form'){
    $entriesForm.classList.remove('hidden');
    $allCardEntries?.classList.add('hidden');
  }
  data.view = viewName;
} */
