//internal app functions - placeholder
//import { add } from "../functions.js"
//firebase app building functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//app initialization and database set up
const appSettings = {
    databaseURL: "https://collections-d0f5c-default-rtdb.firebaseio.com/" 
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const gamesInDB = ref(database, "Games")

//input functionality
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const gameListEl = document.getElementById("game-list")

//add entry to database & clear input field
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if (inputValue) {
        //TODO: later include check for duplicate entry
        push(gamesInDB, inputValue)
        clearInputFieldEl()
    } else {
        console.log("No value entered.")
        alert("Please type a name.")
    }
})

//call data array to loop, clear list, & append live entry list to display
onValue(gamesInDB, function(snapshot) {
    let gamesArray = Object.entries(snapshot.val())
    console.log(gamesArray)
    //let gameListArray = Object.values(snapshot.val())
    clearGameListEl()
    for (let i = 0; i < gamesArray.length; i++) {
        let currentGameKey = gamesArray[i][0]
        let currentGameName = gamesArray[i][1]
        appendGameToGameListEl(currentGameKey,currentGameName)
    }
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearGameListEl() {
    gameListEl.innerHTML = ""
}

function appendGameToGameListEl(gameKey,gameValue) {
    gameListEl.innerHTML += '<div id="'+gameKey+'" class="game-list-entry">'+gameValue+'</div>'
}

//pending build
function viewGameFromGameListEl(gameKey) {
    console.log("pending build")
}