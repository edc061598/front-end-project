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
            entryId: 0,
        };
    }
    return data;
}
function writeData() {
    const localDataJSON = JSON.stringify(data);
    localStorage.setItem(localStorageDataKey, localDataJSON);
}
