const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"; // URL of the API endpoint
const result = document.getElementById("result"); // Reference to the HTML element where we'll display the search results
const sound = document.getElementById("sound"); // Reference to the HTML audio element used to play the word's pronunciation sound
const btn = document.getElementById("search-btn"); // Reference to the HTML button element that triggers the search

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value; // Get the value of the input field
  fetch(`${url}${inpWord}`) // Send a GET request to the API endpoint, passing the search term as a URL parameter
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
      console.log(data); // Log the response data to the console for debugging purposes
      result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`; // Update the HTML result element with the search results
      sound.setAttribute("src", `${data[0].phonetics[0]?.audio}`); // Set the audio source URL to the word's pronunciation, if available
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`; // If an error occurs, display an error message in the result element
    });
});

function playSound() {
  sound.play(); // Play the audio element
  console.log("playSound()"); // Log a message to the console for debugging purposes
}
