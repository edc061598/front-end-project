"use strict";
const $entriesForm = document.querySelector('.entries-form');
if (!$entriesForm)
    throw new Error('$entriesForm does not exist');
const $placeholderPicture = document.getElementById('deck-picture');
if (!$placeholderPicture)
    throw new Error('$placeholderPicture does not exist');
const $newButton = document.querySelector('.new-button');
if (!$newButton)
    throw new Error('$newbutton does not exist');
const $form = document.querySelector('#contact-form');
if (!$form)
    throw new Error('$submit does not exist');
const $viewDeck = document.querySelector('.view-deck');
if (!$viewDeck)
    throw new Error('$viewDeck does not exist');
const $navBar = document.querySelector('.navbar');
if (!$navBar)
    throw new Error('$navbar does not exist');
const $typeOfDeck = document.getElementById('deck-type-menu');
if (!$typeOfDeck)
    throw new Error('$typeOfDeck does not exist');
const $selectButton = document.getElementById('categories');
if (!$selectButton)
    throw new Error('$selectButton does not exist');
const $cardList = document.querySelector('.card-list');
if (!$cardList)
    throw new Error('$cardList does not exist');
const $allCardEntries = document.querySelector('.all-card-entries');
if (!$allCardEntries)
    throw new Error('$allCardEntries does not exist');
const $h2Element = document.getElementById('new-entry');
if (!$h2Element)
    throw new Error('$h2Element does not exist');
const $selectedCardList = document.querySelector('.selected-card-list');
if (!$selectedCardList)
    throw new Error('Does not exist ');
const $updateCardStrategies = document.querySelector('.card-strategies');
if (!$updateCardStrategies)
    throw new Error('$updateCardStrategies does not exist');
function changeCardPicture() {
    const value = $typeOfDeck;
    let imgURL = '';
    if (value?.value === 'Blue Eyes') {
        imgURL =
            'images/blue_eyes_white_dragon__anime__by_holycrapwhitedragon-db48lo4.jpg';
    }
    else if (value.value === 'Dark Magician') {
        imgURL = 'images/dattnu1-7bfd7578-4cb9-4972-bafb-63ac78e518a9.png';
    }
    else if (value.value === 'Red Eyes') {
        imgURL = 'images/apim3vcts__12756.jpg';
    }
    else {
        imgURL = 'images/placeholder-image-square.jpg';
    }
    $placeholderPicture.src = imgURL;
}
$typeOfDeck.addEventListener('input', changeCardPicture);
function updateCardStrategiesFunction(event) {
    event.preventDefault();
    const $eventTarget = event.target;
    console.log($eventTarget);
    const $updateCardStrategies = $eventTarget.getAttribute('data-entry-id');
    if ($h2Element != null) {
        $h2Element.textContent = 'UPDATE YOUR DECK!!!';
    }
    viewSwap('entry-form');
}
if ($updateCardStrategies) {
    $updateCardStrategies.addEventListener('click', updateCardStrategiesFunction);
}
function resetToNewDeckFunction(event) {
    if ($h2Element) {
        $h2Element.textContent = 'NEW DECK';
    }
}
if ($newButton) {
    $newButton.addEventListener('click', resetToNewDeckFunction);
}
let selectedCards = [];
function handleCardSelection(event) {
    const checkbox = event.target;
    const $entry = checkbox.closest('li');
    if (!$entry) {
        return;
    }
    const cardId = $entry.getAttribute('data-entry-id');
    const $image = $entry.querySelector('img');
    const cardImageURL = $image ? $image.getAttribute('src') : '';
    const cardData = {
        id: cardId,
        image_url: cardImageURL,
    };
    if (checkbox.checked) {
        data.selectedCards.push(cardData);
    }
    else {
        data.selectedCards = data.selectedCards.filter(card => card.id !== cardId);
    }
    writeData();
}
function addSelectedCards() {
    if ($selectedCardList) {
        $selectedCardList.innerHTML = '';
    }
    data.selectedCards.forEach(card => {
        const $li = document.createElement('li');
        const $img = document.createElement('img');
        $img.src = card.image_url;
        $li.appendChild($img);
        // if($selectedCardList && $selectedCardList.firstChild){
        //   $selectedCardList.insertBefore($li, $selectedCardList.firstChild);
        // } else if($selectedCardList){
        // $selectedCardList.appendChild($li);
        // }
        $selectedCardList.appendChild($li);
    });
    writeData();
    viewSwap('my-deck');
}
const $addCardButton = document.querySelector('.add-card');
if ($addCardButton) {
    $addCardButton.addEventListener('click', addSelectedCards);
}
function viewSwap(viewName) {
    const allViews = document.querySelectorAll('[data-view]');
    /*
    console.log(allViews);
    allViews.forEach(view => {
      view.classList.add('hidden');
    });*/
    allViews.forEach(view => {
        if (view.tagName === "DIV")
            view.classList.add('hidden');
    });
    const viewShow = document.querySelector(`[data-view = "${viewName}"]`);
    if (viewShow) {
        viewShow.classList.remove('hidden');
        if (viewName === 'my-deck') {
            addSelectedCards(); // Load selected cards when switching to 'my-deck' view
        }
    }
}
function handleNavBarClick(event) {
    const $clickedLink = event.target;
    const viewName = $clickedLink.dataset.view;
    if (viewName) {
        viewSwap('my-deck');
    }
}
if ($navBar) {
    $navBar.addEventListener('click', handleNavBarClick);
}
let viewHistory = [];
function newButtonFunction(event) {
    const $eventTarget = event.target;
    console.log($eventTarget);
    const viewName = $eventTarget.dataset.view;
    console.log(viewName);
    if (viewName) {
        const currentView = document.querySelector('.view-deck:not(.hidden)')?.getAttribute('data-view');
        console.log(currentView);
        if (currentView) {
            viewHistory.push(currentView);
        }
        viewSwap(viewName);
    }
}
if ($newButton) {
    $newButton.addEventListener('click', newButtonFunction);
}
function renderEntry(entry) {
    const $entry = document.createElement('li');
    $entry.setAttribute('data-entry-id', entry.id.toString());
    if (entry.card_images && entry.card_images.length > 0) {
        const $image = document.createElement('img');
        $image.setAttribute('src', entry.card_images[0].image_url);
        $image.classList.add('scaled');
        $entry.appendChild($image);
    }
    else {
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
function renderList(entries) {
    entries.forEach((entry) => {
        const $entry = renderEntry(entry);
        $cardList?.appendChild($entry);
    });
}
async function nameFunction(name) {
    try {
        const nameData = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`);
        if (!nameData.ok) {
            throw new Error(`HTTP ERROR: ${nameData.status}`);
        }
        const { data: dataArray } = await nameData.json();
        renderList(dataArray);
    }
    catch (error) {
        console.log('ERROR: ', error);
    }
}
async function archetypeFunction(archetype) {
    try {
        const archetypeData = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${archetype}`);
        if (!archetypeData.ok) {
            throw new Error(`HTTP ERROR: ${archetype.status}`);
        }
        const { data: dataArray } = await archetypeData.json();
        console.log(dataArray);
        /* let dataObject = {}; */
        // renderList(dataArray);
        renderList(dataArray);
        console.log(renderList(dataArray));
    }
    catch (error) {
        console.log('ERROR: ', error);
    }
}
async function trapFunction(race, type) {
    try {
        const trapData = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${race}&type=${type}`);
        if (!trapData.ok) {
            throw new Error(`HTTP ERROR: ${trapData.status}`);
        }
        const { data: dataArray } = await trapData.json();
        console.log(dataArray);
        renderList(dataArray);
    }
    catch (error) {
        console.log('ERROR: ', error);
    }
}
async function spellFunction(race, type) {
    try {
        const spellData = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${race}&type=${type}`);
        if (!spellData.ok) {
            throw new Error(`HTTP ERROR: ${spellData.status}`);
        }
        const { data: dataArray } = await spellData.json();
        console.log(dataArray);
        renderList(dataArray);
    }
    catch (error) {
        console.log('ERROR: ', error);
    }
}
function submitFunction(event) {
    event.preventDefault();
    const $deckElements = $form?.elements;
    const category = $deckElements.cardCategories.value;
    const deckType = $deckElements.deckType.value;
    if (deckType === 'Dark Magician' && category === 'Archetype') {
        archetypeFunction('dark magician');
    }
    else if (deckType === 'Blue Eyes' && category === 'Archetype') {
        archetypeFunction('blue-eyes');
    }
    else if (deckType === 'Dark Magician' && category === 'Name') {
        nameFunction('dark magician');
    }
    else if (deckType === 'Blue Eyes' && category === 'Name') {
        nameFunction('blue-eyes white dragon');
    }
    else if (deckType === 'Dark Magician' && category === 'Spell') {
        spellFunction('dark magician', 'spell card');
    }
    else if (deckType === 'Blue Eyes' && category === 'Spell') {
        spellFunction('blue-eyes', 'spell card');
    }
    else if (deckType === 'Dark Magician' && category === 'Trap') {
        trapFunction('dark magician', 'trap card');
    }
    else if (deckType === 'Blue Eyes' && category === 'Trap') {
        trapFunction('blue-eyes', 'trap card');
    }
    else if (deckType === 'Red Eyes' && category === 'Archetype') {
        archetypeFunction('red-eyes');
    }
    else if (deckType === 'Red Eyes' && category === 'Name') {
        nameFunction('red-eyes black dragon');
    }
    else if (deckType === 'Red Eyes' && category === 'Spell') {
        spellFunction('red-eyes', 'spell card');
    }
    else if (deckType === 'Red Eyes' && category === 'Trap') {
        trapFunction('red-eyes', 'trap card');
    }
    // writeData();
    resetForm();
}
$form.addEventListener('submit', submitFunction);
function resetForm() {
    $placeholderPicture.src = 'images/placeholder-image-square.jpg';
    $form.reset();
}
