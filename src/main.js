

// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
 
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
 
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
 
// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
    
let track_list = [
 {name:"סנופקין",artist:"הנודד",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2MTJf/01%20%D7%A1%D7%A0%D7%95%D7%A4%D7%A7%D7%99%D7%9F%20%D7%94%D7%A0%D7%95%D7%93%D7%93.mp3"},
{name:"מערכת תוכניות",artist:"הילדים והנוער",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2MTZf/02%20%D7%9E%D7%A2%D7%A8%D7%9B%D7%AA%20%D7%AA%D7%9B%D7%A0%D7%99%D7%95%D7%AA%20%D7%94%D7%99%D7%9C%D7%93%D7%99%D7%9D%20%D7%95%D7%94%D7%A0%D7%95%D7%A2%D7%A8.mp3"},
{name:"הקוסם",artist:"מארץ עוץ",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2NDdf/03%20%D7%94%D7%A7%D7%95%D7%A1%D7%9D%20%D7%9E%D7%90%D7%A8%D7%A5%20%D7%A2%D7%95%D7%A5.mp3"},
{name:"בבית של",artist:"פיסטוק",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY1Nzlf/04%20%D7%91%D7%91%D7%99%D7%AA%20%D7%A9%D7%9C%20%D7%A4%D7%99%D7%A1%D7%98%D7%95%D7%A7.mp3"},
{name:"שאלתיאל",artist:"קוואק",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2NjBf/05%20%D7%A9%D7%90%D7%9C%D7%AA%D7%99%D7%90%D7%9C%20%D7%A7%D7%95%D7%95%D7%90%D7%A7.mp3"},
{name:"בלי סודות",artist:"בלי סודות",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2NjJf/06%20%D7%91%D7%9C%D7%99%20%D7%A1%D7%95%D7%93%D7%95%D7%AA.mp3"},
{name:"פרפר נחמד",artist:"מאוד",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2Njlf/07%20%D7%A4%D7%A8%D7%A4%D7%A8%20%D7%A0%D7%97%D7%9E%D7%93.mp3"},
{name:"גברת פלפלת",artist:"עם חני נחמיאס",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2ODVf/08%20%D7%92%D7%91%D7%A8%D7%AA%20%D7%A4%D7%9C%D7%A4%D7%9C%D7%AA.mp3"},
{name:"רחוב סומסום",artist:"רחוב קסומסום",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2ODZf/09%20%D7%A8%D7%97%D7%95%D7%91%20%D7%A1%D7%95%D7%9E%D7%A1%D7%95%D7%9D.mp3"},
{name:"היי!",artist:"בינבה!",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2ODdf/10%20%D7%94%D7%99%D7%99%2C%20%D7%91%D7%99%D7%A0%D7%91%D7%94%21.mp3"},
{name:"מסיפורי אבא בונה",artist:"עם חני נחמיאס",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2ODlf/11%20%D7%9E%D7%A1%D7%99%D7%A4%D7%95%D7%A8%D7%99%20%D7%90%D7%91%D7%90%20%D7%91%D7%95%D7%A0%D7%94.mp3"},
{name:"נילס",artist:"הולגרסון",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2OTFf/12%20%D7%A0%D7%99%D7%9C%D7%A1%20%D7%94%D7%95%D7%9C%D7%92%D7%A8%D7%A1%D7%95%D7%9F.mp3"},
{name:"פינוקיו",artist:"שמי",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2OTJf/13%20%D7%A4%D7%99%D7%A0%D7%95%D7%A7%D7%99%D7%95.mp3"},
{name:"אוטובוס הקסמים",artist:"של גברת פריסל",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2OTNf/14%20%D7%90%D7%95%D7%98%D7%95%D7%91%D7%95%D7%A1%20%D7%94%D7%A7%D7%A1%D7%9E%D7%99%D7%9D.mp3"},
{name:"ארתור",artist:"איזה יום נפלא!",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2OTVf/15%20%D7%90%D7%A8%D7%AA%D7%95%D7%A8.mp3"},
{name:"המסיבה",artist:"של הפיג'מות",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2OTZf/16%20%D7%94%D7%9E%D7%A1%D7%99%D7%91%D7%94%20%D7%A9%D7%9C%20%D7%94%D7%A4%D7%99%D7%92_%D7%9E%D7%95%D7%AA.mp3"},
{name:"הסיח הכסוף (טאורה)",artist:"עם ששי קשת",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2OTdf/17%20%D7%94%D7%A1%D7%99%D7%97%20%D7%94%D7%9B%D7%A1%D7%95%D7%A3%20%28%D7%98%D7%90%D7%95%D7%A8%D7%94%29.mp3"},
{name:"צבי הנינג'ה",artist:"קוואבנגה",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2OTlf/18%20%D7%A6%D7%91%D7%99%20%D7%94%D7%A0%D7%99%D7%A0%D7%92_%D7%94.mp3"},
{name:"החתולים הסמוראים",artist:"עם תומש",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY3MDBf/19%20%D7%94%D7%97%D7%AA%D7%95%D7%9C%D7%99%D7%9D%20%D7%94%D7%A1%D7%9E%D7%95%D7%A8%D7%90%D7%99%D7%9D.mp3"},
{name:"אלף ואחת אמריקות",artist:"וזהו",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY3MDFf/20%20%D7%90%D7%9C%D7%A3%20%D7%95%D7%90%D7%97%D7%AA%20%D7%90%D7%9E%D7%A8%D7%99%D7%A7%D7%95%D7%AA.mp3"},
{name:"המומינים",artist:"המופלאים",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY3MDNf/21%20%D7%94%D7%9E%D7%95%D7%9E%D7%99%D7%A0%D7%99%D7%9D.mp3"},
{name:"הדוב",artist:"בבית הכחול",image:"src/icon.png",path:"https://od.lk/s/NzZfOTIwNzY2MDdf/22%20%D7%94%D7%93%D7%95%D7%91%20%D7%91%D7%91%D7%99%D7%AA%20%D7%94%D7%9B%D7%97%D7%95%D7%9C%20%28%D7%A9%D7%9C%D7%95%D7%9D%20%D7%A9%D7%9C%D7%95%D7%9D%20%D7%9C%D7%94%D7%AA%D7%A8%D7%90%D7%95%D7%AA%29.mp3"},

];

function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();
 
  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();
 
  // Update details of the track
  track_art.style.backgroundImage =
     "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent =
     `מנגן ${track_index + 1} מתוך ${track_list.length}`;
 
  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);
 
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
  }
 


 
// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
// Switch between playing and pausing
// depending on the current state
if (!isPlaying) playTrack();
else pauseTrack();
}

function playTrack() {
// Play the loaded track
curr_track.play();
isPlaying = true;

// Replace icon with the pause icon
playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
// Pause the loaded track
curr_track.pause();
isPlaying = false;

// Replace icon with the play icon
playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
// Go back to the first track if the
// current one is the last in the track list
if (track_index < track_list.length - 1)
	track_index += 1;
else track_index = 0;

// Load and play the new track
loadTrack(track_index);
playTrack();
}

function prevTrack() {
// Go back to the last track if the
// current one is the first in the track list
if (track_index > 0)
	track_index -= 1;
else track_index = track_list.length - 1;

// Load and play the new track
loadTrack(track_index);
playTrack();
}

function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  seekto = curr_track.duration * (seek_slider.value / 100);
 
  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}
 
function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}
 
function seekUpdate() {
  let seekPosition = 0;
 
  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
 
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
 
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
 
    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Load the first track in the tracklist
loadTrack(track_index);

