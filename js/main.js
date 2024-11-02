"use strict";
const $entriesForm = document.querySelector('.entries-form');
if (!$entriesForm)
    throw new Error('$entriesForm does not exist');
const $placeholderPicture = document.getElementById('deck-picture');
if (!$placeholderPicture)
    throw new Error('$placeholderPicture does not exist');
const $form = document.querySelector('#contact-form');
if (!$form)
    throw new Error('$submit does not exist');
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
const $blueEyes = $typeOfDeck.querySelector('option[value = blue-eyes]');
const $darkMagician = $typeOfDeck.querySelector('option[value = dark-magician]');
const $blueMagician = $typeOfDeck.querySelector('option[all]');
function changeCardPicture() {
    const value = $typeOfDeck;
    let imgURL = "";
    if (value?.value === 'Blue Eyes') {
        imgURL = 'images/blue_eyes_white_dragon__anime__by_holycrapwhitedragon-db48lo4.jpg';
    }
    else if (value.value === 'Dark Magician') {
        imgURL = 'images/dattnu1-7bfd7578-4cb9-4972-bafb-63ac78e518a9.png';
    }
    else if (value.value === 'all') {
        imgURL = 'images/blue eyes vs dark magician.jpg';
    }
    else {
        imgURL = 'images/placeholder-image-square.jpg';
    }
    $placeholderPicture.src = imgURL;
}
$typeOfDeck.addEventListener('input', changeCardPicture);
function renderEntry(entry) {
    const $entry = document.createElement('li');
    console.log(entry);
    $entry.setAttribute('data-entry-id', entry.toString());
    const $image = document.createElement('img');
    $image.setAttribute('src', entry.card_images[0].image_url);
    $entry.append($image);
    return $entry;
}
function renderList(entries) {
    for (let i = 0; i < entries.length; i++) {
        let dataObject = entries[i];
        console.log('Data array: ', entries[i].card_images[0].image_url);
        $cardList?.append(renderEntry(dataObject));
        //console.log(renderEntry(dataObject));
        //console.log(i);
    }
}
function domContentLoaded() {
    if (!$cardList) {
        throw new Error('$cardList is null');
    }
    for (let i = 0; i < data.archetype.length; i++) {
        const entry = data.archetype[i];
        $cardList.append(renderEntry(entry));
    }
    const currentView = data.view;
    viewSwap(currentView);
}
async function nameFunction(name) {
    try {
        const nameData = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`);
        if (!nameData.ok) {
            throw new Error(`HTTP ERROR: ${nameData.status}`);
        }
        const nameUser = (await nameData.json());
        data.name.push(nameUser.data[0]);
        console.log(data.name.push(nameUser.data[0]));
        nameImageFunction(nameUser.data[0]);
    }
    catch (error) {
        console.log('ERROR: ', error);
    }
}
function nameLoopFunction(name) {
}
async function archetypeFunction(archetype) {
    try {
        const archetypeData = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${archetype}`);
        if (!archetypeData.ok) {
            throw new Error(`HTTP ERROR: ${archetype.status}`);
        }
        const { data: dataArray } = (await archetypeData.json());
        console.log(dataArray);
        let dataObject = {};
        // renderList(dataArray);
        renderList(dataArray);
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
        const trapUser = (await trapData.json());
        data.trap.push(trapUser.data[0]);
        nameImageFunction(trapUser.data[0]);
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
        const spellUser = (await spellData.json());
        data.spell.push(spellUser.data[0]);
        nameImageFunction(spellUser.data[0]);
    }
    catch (error) {
        console.log('ERROR: ', error);
    }
}
function submitFunction(event) {
    event.preventDefault();
    const $deckElements = $form?.elements;
    /*console.dir($deckElements);
    console.log($deckElements.deckType)
    console.dir($deckElements[1])*/
    /*updateEntries(cardObject);*/
    const category = $deckElements.cardCategories.value;
    const deck_Type = $deckElements.deckType.value;
    if (deck_Type === 'Dark Magician' && category === 'Archetype') {
        archetypeFunction('dark magician');
    }
    else if (deck_Type === 'Blue Eyes' && category === 'Archetype') {
        archetypeFunction('blue-eyes');
    }
    else if (deck_Type === 'Dark Magician' && category === 'Name') {
        nameFunction('dark magician');
    }
    else if (deck_Type === 'Blue Eyes' && category === 'Name') {
        nameFunction('blue-eyes white dragon');
    }
    else if (deck_Type === 'Dark Magician' && category === 'Spell') {
        spellFunction('dark magician', 'spell card');
    }
    else if (deck_Type === 'Blue Eyes' && category === 'Spell') {
        spellFunction('blue-eyes', 'spell card');
    }
    else if (deck_Type === 'Dark Magician' && category === 'Trap') {
        trapFunction('dark magician', 'trap card');
    }
    else if (deck_Type === 'Blue Eyes' && category === 'Trap') {
        trapFunction('blue-eyes', 'trap card');
    }
    writeData();
    resetForm();
    /* viewSwap('card-entries');*/
}
$form.addEventListener('submit', submitFunction);
function resetForm() {
    $placeholderPicture.src = 'images/placeholder-image-square.jpg';
    $form.reset();
}
function viewSwap(viewName) {
    if (viewName === 'card-entries') {
        $entriesForm.classList.add('hidden');
        $allCardEntries?.classList.remove('hidden');
    }
    else if (viewName === 'entry-form') {
        $entriesForm.classList.remove('hidden');
        $allCardEntries?.classList.add('hidden');
    }
    data.view = viewName;
}
function ulFunction(event) {
    const $eventTarget = event.target;
}
function nameImageFunction(name) {
    for (let i = 0; i < data.name.length; i++) {
        if (data.name[i].name === 'Blue Eyes') {
            console.log(data.name[i].card_images[i].image_url);
        }
        else if (data.name[i].name === 'Dark Magician') {
            console.log(data.name[i].card_images[i].image_url);
        }
    }
}
function archetypeImageFunction(archetype) {
    for (let i = 0; i < data.archetype.length; i++) {
        /* console.log(data.archetype[i].card_images[i].image_url);*/
        console.log(data.archetype[i].image_url);
    }
}