export const speechA =
  `<input id="swal-input-title" class="swal2-input" placeholder="Titlul temei" value="Tema A" readonly>
        <div id="duration-container">
            <button id="duration-button-5" class="duration-button duration-button-speechA">5</button>
            <button id="duration-button-7" class="duration-button duration-button-speechA">7</button>
            <button id="duration-button-8" class="duration-button duration-button-speechA">8</button>
            <button id="duration-button-10" class="duration-button duration-button-speechA">10</button>
            <button id="duration-button-15" class="duration-button duration-button-speechA">15</button>
        </div>
        <label for="swal-input-duration">Durata temei</label>
        <input id="swal-input-duration" class="swal2-input" placeholder="min" type="number" value="15" readonly>
        <div id="swal2-main-container">
            <label for="swal-input-hours">Ora finisării</label>
            <input id="swal-input-hours" class="swal2-input" placeholder="ora" type="number"
                value="20" readonly>
            <input id="swal-input-minutes" class="swal2-input" placeholder="min" type="number"
                value="05" readonly>
            <input id="swal-input-seconds" class="swal2-input" placeholder="sec" type="number"
                value="40" readonly>
        </div>
        <div id="line" style="display: none;"></div>
        <div id="speech-B-container" style="display: none;">
            <label for="swal-input-speech-B-title"/>
            <input id="swal-input-speech-B-title" value="Tema B" class="swal2-input" placeholder="Titlul următoarei temei" readonly>
            <label for="swal-input-speech-B-duration">Durata temei</label>
            <input id="swal-input-speech-B-duration" class="swal2-input" placeholder="min" type="number" readonly>
        </div>
        <div id="speech-B-hours-container" style="display: none;">
            <label for="swal-input-hours-speech-B">Ora finisării</label>
            <input id="swal-input-hours-speech-B" class="swal2-input" placeholder="ora" type="number" readonly>
            <input id="swal-input-minutes-speech-B" class="swal2-input" placeholder="min" type="number" readonly>
            <input id="swal-input-seconds-speech-B" class="swal2-input" value="0" placeholder="sec" type="number" readonly>
        </div>
         `;

export const bibleStudy =
  `<div style="width: 90%; margin: 2rem auto">
            <p>Pentru a aloca mai mult timp anunțurilor,</p>
            <p>indică cu câte minute trebuie scurtat Studiul Bibliei</p>
         </div>
         <div id="duration-container-for-BStudy">
            <button id="duration-button-0" class="duration-button duration">0</button>
            <button id="duration-button-2" class="duration-button duration">2</button>
            <button id="duration-button-3" class="duration-button duration">3</button>
            <button id="duration-button-5" class="duration-button duration">5</button>
            <button id="duration-button-7" class="duration-button duration">7</button>
            <button id="duration-button-10" class="duration-button duration">10</button>
         </div>
         <div>
            <label for="swal-input-duration-s-bible">Durata de scurtare a temei</label>
            <input id="swal-input-duration-s-bible" class="swal2-input" placeholder="min" type="number" readonly>
         </div>
         <div id="swal2-main-container-forBStudy">
            <label for="swal-input-hours-s-bible">Ora finisării</label>
            <input id="swal-input-hours-s-bible" class="swal2-input" placeholder="ora" type="number"
                value="20" readonly>
            <input id="swal-input-minutes-s-bible" class="swal2-input" placeholder="min" type="number"
                value="36" readonly>
            <input id="swal-input-seconds-s-bible" class="swal2-input" placeholder="sec" type="number"
                value="30" readonly>
         </div>
         `;

export const addNewSpeech =
  `<input id="swal-input-title" class="swal2-input" placeholder="Titlul temei" type="text">
        <label for="swal-input-duration">Durata temei</label>
        <input id="swal-input-duration" class="swal2-input" placeholder="min." type="number">
        <div id="duration-container">
            <button id="duration-button-1" class="duration-button">1</button>
            <button id="duration-button-2" class="duration-button">2</button>
            <button id="duration-button-3" class="duration-button">3</button>
            <button id="duration-button-4" class="duration-button">4</button>
            <button id="duration-button-5" class="duration-button">5</button>
            <button id="duration-button-7" class="duration-button">7</button>
            <button id="duration-button-8" class="duration-button">8</button>
        </div>
        <div id="swal2-main-container">
            <label for="swal-input-hours">Ora finisării</label>
            <input id="swal-input-hours" class="swal2-input" placeholder="ora" type="number" min="2">
            <input id="swal-input-minutes" class="swal2-input" placeholder="min." type="number" min="0" max="59">
        </div>
      `;
