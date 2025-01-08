const $entriesForm = document.querySelector('.entries-form') as HTMLFormElement;
if (!$entriesForm) throw new Error('$entriesForm does not exist');

const $placeholderPicture = document.getElementById('deck-picture',) as HTMLImageElement;
if (!$placeholderPicture) throw new Error('$placeholderPicture does not exist');

const $newButton = document.querySelector('.new-button');
if(!$newButton) throw new Error('$newbutton does not exist');

const $form = document.querySelector('#contact-form') as HTMLFormElement;
if (!$form) throw new Error('$submit does not exist');

const $viewDeck = document.querySelector('.view-deck');
if(!$viewDeck) throw new Error ('$viewDeck does not exist');

const $navBar = document.querySelector('.navbar');
if (!$navBar) throw new Error('$navbar does not exist');

const $typeOfDeck = document.getElementById('deck-type-menu') as HTMLInputElement;
if (!$typeOfDeck) throw new Error('$typeOfDeck does not exist');

const $selectButton = document.getElementById('categories') as HTMLInputElement;
if (!$selectButton) throw new Error('$selectButton does not exist');

const $cardList = document.querySelector('.card-list');
if (!$cardList) throw new Error('$cardList does not exist');

const $allCardEntries = document.querySelector('.all-card-entries');
if (!$allCardEntries) throw new Error('$allCardEntries does not exist');

const $h2Element = document.getElementById('new-entry');
if (!$h2Element) throw new Error('$h2Element does not exist');

const $selectedCardList = document.querySelector('.selected-card-list') as HTMLUListElement;
if (!$selectedCardList) throw new Error('Does not exist ');

const $updateCardStrategies = document.querySelector('.card-strategies');
if(!$updateCardStrategies) throw new Error('$updateCardStrategies does not exist');

const $modal = document.getElementById('delete-modal') as HTMLElement;
if (!$modal) throw new Error ('$modal does not exist');

const $confirmDeleteButton = document.getElementById('confirm-delete') as HTMLElement;
if (!$confirmDeleteButton) throw new Error ('$confirmDeleteButton does not exist');

const $cancelDeleteButton = document.getElementById('cancel-delete') as HTMLElement;
if(!$cancelDeleteButton) throw new Error('$cancelDeleteButton does not exist');

const $deleteButton = document.querySelector('.delete-cards');
if(!$deleteButton) throw new Error('$deleteButton does not exist');

let selectedCardIdsToDelete: string[] = [];

function showDeleteModal(): void {
    $modal.classList.remove('hidden');
}



function confirmDelete(): void {

    // Retrieve current data from localStorage
    const data = {selectedCards: []};

    // Save the updated data back to localStorage
    localStorage.setItem('data', JSON.stringify(data));

    // Update the UI (refresh selected cards list)
    loadAddedCardsFunction();

  // Hide the modal
  $modal.classList.add('hidden');
}



function cancelDeleteFunction(): void {
  $modal.classList.add('hidden');
}

$deleteButton.addEventListener('click', showDeleteModal);
$confirmDeleteButton.addEventListener('click', confirmDelete);
$cancelDeleteButton.addEventListener('click', cancelDeleteFunction);

function selectCardsToDelete(): void {
  const checkboxes = document.querySelectorAll('.delete-checkbox:checked') as NodeListOf<HTMLInputElement>;


  selectedCardIdsToDelete = Array.from(checkboxes).map((checkbox) => checkbox.value);


  if (selectedCardIdsToDelete.length > 0) {
    $deleteButton?.classList.remove('hidden');
  } else {
    $deleteButton?.classList.add('hidden'); // Hide the delete button if no cards are selected
  }
}


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

interface Card {
  id: string;
  image_url: string;
  selected?: boolean;
}


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

function updateCardStrategiesFunction(event: Event):void {
  event.preventDefault();
  const $eventTarget = event.target as HTMLElement;
  console.log($eventTarget);
  const $updateCardStrategies = $eventTarget.getAttribute('data-entry-id');

  if($h2Element != null){
    $h2Element.textContent = 'UPDATE YOUR DECK!!!';
  }
  viewSwap('entry-form');
  writeData();
}

if($updateCardStrategies) {
  $updateCardStrategies.addEventListener('click', updateCardStrategiesFunction);
}

function resetToNewDeckFunction(event: Event) {
  if($h2Element){
    $h2Element.textContent = 'NEW DECK';
  }
}
if($newButton){
  $newButton.addEventListener('click', resetToNewDeckFunction);
}

let selectedCards: any[] = [];
function handleCardSelection(event: Event): void {
  const checkbox = event.target as HTMLInputElement;
    const data = JSON.parse(localStorage.getItem('data') || '{"selectedCards": []}');
  const $entry = checkbox.closest('li');
  if(!$entry) {
    return;
  }
  const cardId = $entry.getAttribute('data-entry-id');
  const $image = $entry.querySelector('img');
  const cardImageURL = $image ? $image.getAttribute('src'): '';

  const cardData:Card = {
    id: cardId as string,
    image_url: cardImageURL || '',
    selected: checkbox.checked,
  };
  const existingCard = data.selectedCards.find((card:Card) => card.id === cardData.id);

  if(checkbox.checked){
    // if(!data.selectedCards.some(card => card.id === cardId)){
    //   data.selectedCards.push(cardData);
    // }
    if(!existingCard){
      data.selectedCards.push(cardData);
    }

  } else {
    // data.selectedCards = data.selectedCards.filter((card) => card.id !== cardId);
    if(existingCard){
      data.selectedCards = data.selectedCards.filter((card: Card) => card.id !== cardData.id);
    }
  }
  localStorage.setItem('data', JSON.stringify(data));
  loadAddedCardsFunction();
  selectCardsToDelete();
  writeData();
}

function addSelectedCards(): void {
  if($selectedCardList){
    $selectedCardList.innerHTML = '';
  }
  loadAddedCardsFunction();
  writeData();
  viewSwap('my-deck');

}

function loadAddedCardsFunction():void {
  const data = JSON.parse(localStorage.getItem('data') || '{"selectedCards": []}');
  const selectedCards: Card[] = data.selectedCards;
  $selectedCardList.innerHTML = '';


  selectedCards.forEach((card) => {
    const $li = document.createElement('li');
    $li.setAttribute('data-entry-id', card.id);

    const $img = document.createElement('img');
    $img.src = card.image_url;

    if(document.querySelector('[data-view="my-deck"]:not(.hidden)')){
      $li.appendChild($img);
    }else {
    const $checkbox = document.createElement('input');
    $checkbox.type = 'checkbox';
    $checkbox.value = card.id;
    $checkbox.classList.add('delete-checkbox');
    $checkbox.checked = card.selected || false;

    $li.appendChild($img);
    $li.appendChild($checkbox);
    $selectedCardList.appendChild($li);

    $checkbox.addEventListener('change', (e) => {
      handleCardSelection(e);
    });
  }
  $selectedCardList.appendChild($li);
  });
}


const $addCardButton = document.querySelector('.add-card');
if($addCardButton) {
  $addCardButton.addEventListener('click', addSelectedCards);
}


function viewSwap(viewName:string): void {
  const allViews = document.querySelectorAll('[data-view]') as NodeListOf<HTMLElement>;


  allViews.forEach(view => {
    if (view.tagName === "DIV")
      view.classList.add('hidden');
  });

  const viewShow = document.querySelector(`[data-view = "${viewName}"]`) as HTMLElement;
  if(viewShow) {
    viewShow.classList.remove('hidden');
    if (viewName === 'my-deck') {
      loadAddedCardsFunction();
   //   addSelectedCards();  // Load selected cards when switching to 'my-deck' view
    }
  }
}



function handleNavBarClick(event: Event): void {
  const $clickedLink = event.target as HTMLElement;
  console.log('clickedlink', $clickedLink);
  const viewName = $clickedLink.dataset.view;
  if (viewName) {
    // loadAddedCardsFunction();
    addSelectedCards();
    viewSwap('my-deck');
  }
}
if ($navBar) {
  $navBar.addEventListener('click', handleNavBarClick);
}


let viewHistory:string[] = [];
function newButtonFunction(event: Event): void {
  const $eventTarget = event.target as HTMLElement;
  console.log($eventTarget);
  const viewName = $eventTarget.dataset.view;
  console.log(viewName);

  if(viewName) {
    const currentView = document.querySelector('.view-deck:not(.hidden)')?.getAttribute('data-view');
    console.log(currentView);
    if(currentView){
      viewHistory.push(currentView);

    }
    viewSwap(viewName);
  }
}

if($newButton){
  $newButton.addEventListener('click', newButtonFunction);
}


function renderEntry(entry: any): HTMLLIElement {
  const $entry = document.createElement('li');
  $entry.setAttribute('data-entry-id', entry.id.toString());
  if (entry.card_images && entry.card_images.length > 0) {
    const $image = document.createElement('img');
    $image.setAttribute('src', entry.card_images[0].image_url);
    $image.classList.add('scaled');

    $entry.appendChild($image);
  } else {
    console.warn('No images available for this entry:', entry);
  }

  const $checkbox = document.createElement('input');
  $checkbox.type = 'checkbox';
  $checkbox.classList.add('card-checkbox');
  $checkbox.setAttribute('data-entry-id', entry.id.toString());

  $entry.appendChild($checkbox);
  $checkbox.addEventListener('change', handleCardSelection);
  return $entry;
}


function renderList(entries: any): void {
  entries.forEach((entry:any) => {
    const $entry = renderEntry(entry);
    $cardList?.appendChild($entry);
  });
}

async function nameFunction(name: string): Promise<void> {
  try {
    const nameData = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`,
    );
    if (!nameData.ok) {
      throw new Error(`HTTP ERROR: ${nameData.status}`);
    }
    const { data: dataArray } = await nameData.json();

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

    renderList(dataArray);
    console.log(renderList(dataArray))
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
  resetForm();

}
$form.addEventListener('submit', submitFunction);

  function resetForm(): void {
    $placeholderPicture.src = 'images/placeholder-image-square.jpg';
    $form.reset();
  }
