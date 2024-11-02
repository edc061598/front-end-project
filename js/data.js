"use strict";
const localStorageDataKey = 'Entry-form';
const data = readData();
function readData() {
    let data;
    const localStorageData = localStorage.getItem(localStorageDataKey);
    if (localStorageData) {
        data = JSON.parse(localStorageData);
    }
    else {
        data = {
            view: 'entry-form',
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
function writeData() {
    const localDataJSON = JSON.stringify(data);
    localStorage.setItem(localStorageDataKey, localDataJSON);
}
console.log(data.archetype[3]);