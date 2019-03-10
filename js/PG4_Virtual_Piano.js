// require.config({
//     baseUrl: "Tone",
//     paths: {
//         "Tone" : "Tone/core/Tone.js/Tone"
//     }
// });


/* TEMPLATE DE CONTAINER */
function New_Container() {
    var nameContainer = document.createElement('div');
    nameContainer.style.height = 2 + 'rem';
    nameContainer.style.marginLeft = 1 + '%';
    nameContainer.style.marginRight = 1 + '%';
    nameContainer.style.marginTop = 1 + '%';
    container.insertBefore(nameContainer, container.firstChild);
    return nameContainer;
}

function Style_Button(btn) {
    btn.style.borderRadius = 6 + 'px';
    btn.style.background = 'white';
    btn.style.borderColor = '#888';
    btn.style.color = '#888';
    btn.style.cursor = 'pointer';
    btn.style.fontWeight = 'bold';
    btn.style.outline = 'none';
    btn.style.textTransform = 'uppercase';
    btn.style.padding = 0.3 + '%';
    btn.style.marginLeft = 1 + '%';
    btn.onmouseover = function () {
        btn.style.backgroundColor = '#888';
        btn.style.color = 'white';
    };
    btn.onmouseout = function () {
        btn.style.background = 'white';
        btn.style.color = '#888';
    }
}

function Range_Button() {
    var thisContainer = New_Container();
    let notesRange = document.createElement('input');
    notesRange.setAttribute('type', 'range');
    notesRange.setAttribute('name', 'rangeInput');
    notesRange.setAttribute('min', '1');
    notesRange.setAttribute('max', '4');
    notesRange.setAttribute('value', '2');
    notesRange.style.marginTop = 1 + '%';
    notesRange.style.marginLeft = 1 + '%';
    notesRange.style.cursor = 'pointer';
    thisContainer.innerHTML += 'Number of octaves: ';
    thisContainer.appendChild(notesRange);
    let rangeInput = document.createTextNode(notesRange.value.toString());
    notesRange.onchange = function () {
        rangeInput.nodeValue = notesRange.value.toString();
        thisContainer.appendChild(rangeInput);
        let pianoContainer = document.getElementById("PianoContainer");
        pianoContainer.innerHTML = '';
        let octave = 0;
        if (notesRange.value === '1') octave = 3;
        else if (notesRange.value === '2' || notesRange.value === '3') octave = 2;
        else if (notesRange.value === '4') octave = 2;
        for (let i = 0; i < notesRange.value; ++i) {
            createOctave(pianoContainer, octave++);
        }
    }
}

function NameContainer(name) {
    let old = document.getElementById("SongName");
    if (old !== null) {
        document.body.removeChild(old);
    }
    var nameContainer = document.createElement('div');
    nameContainer.id = "SongName";
    nameContainer.style.textAlign = 'center';
    document.body.appendChild(nameContainer);
    nameContainer.innerHTML = "'" + name + "'";
}

function Text_Button() {
    var thisContainer = New_Container();
    let songName = document.createElement('input');
    songName.style.outline = 'none';
    songName.style.border = 1 + 'px';
    songName.setAttribute('type', 'text');
    songName.placeholder = 'Add Song Name...';
    if (localStorage.getItem('song_name') === '' || localStorage.getItem('song_name') === null) {
        localStorage.setItem('musical_notes', '');
        musical_notes = localStorage.getItem('musical_notes');
    }
    else {
        NameContainer(localStorage.getItem('song_name'));
    }
    thisContainer.appendChild(songName);
    let namingButton = document.createElement('button');
    Style_Button(namingButton);
    namingButton.innerHTML = 'Name Your Song';
    thisContainer.appendChild(namingButton);
    let name = document.createElement('p');
    // var nameContainer = document.createElement('div');
    namingButton.onclick = function () {
        let x = songName.value;
        if (x !== songName.defaultValue) {
            // nameContainer.style.textAlign = 'center';
            // nameContainer.appendChild(name);
            // document.body.appendChild(nameContainer);
            // name.innerHTML = "'" + x + "'";
            NameContainer(x);
            localStorage.setItem('musical_notes', musical_notes);
            localStorage.setItem('song_name', x);
        }
    }
}

let timeoutTimer;
let intervalTimer;

function notesAnimation(notes) {
    timeoutTimer = setTimeout(function() {
        let start = Date.now();
        let i = 0;
        let musicalNotesArr = musical_notes.trim().split(' ');
        intervalTimer = setInterval(function() {
            playNote(musicalNotesArr[i++], false);
            if (i === musicalNotesArr.length) {
                clearInterval(intervalTimer);
                return;
            }
        }, 500);
        let timer = setInterval(function() {
            let timePassed = Date.now() - start;
            if (timePassed >= 15000) {
                clearInterval(timer);
                return;
            }
            let val = -timePassed / 7 + 'px';
            notes.style.transform = 'translate(' + val + ', 0)';
        }, 20);

        let checkBox = document.getElementById('sheet_music_checkbox');
        // if (checkBox.checked === false) {
        // }
    }, 3000);

}

function createSheetMusic(container) {
    let sheetcontainer = document.createElement('div');
    sheetcontainer.className = 'sheet-music';
    container.appendChild(sheetcontainer);
    let staff = document.createElement('ul');
    staff.className = 'sheet-music__staff';
    for (let i = 0; i < 5; ++i) {
        let item = document.createElement('li');
        staff.appendChild(item);
    }
    sheetcontainer.appendChild(staff);

    let items = document.createElement('div');
    items.className = 'sheet-music__items';
    let treblediv = document.createElement('div');
    treblediv.className = 'treble';
    let trebleimg = document.createElement('img');
    trebleimg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/treble.svg";
    treblediv.appendChild(trebleimg);
    items.appendChild(treblediv);

    let notes = document.createElement('div');
    notes.className = 'notes';
    items.appendChild(notes);
    let measure = document.createElement('div');
    measure.className = 'notes__measure';
    notes.appendChild(measure);

    let musicalNotesArr = musical_notes.trim().split(' ');
    if (musicalNotesArr[0] === '') musicalNotesArr.splice(0, 1);
    for (let i = 0; i < musicalNotesArr.length; ++i) {
        let img = document.createElement('img');
        img.className = 'note note--';
        let note = musicalNotesArr[i][0].toLowerCase();
        img.className += note;
        img.src = '../img/musical-note.svg';
        measure.appendChild(img);
    }

    notesAnimation(notes);

    // let i1 = document.createElement('img');
    // i1.className = 'note note--e';
    // i1.src = '../img/musical-note.svg';
    // measure.appendChild(i1);

    sheetcontainer.appendChild(items);
}

function CheckBox() {
    let thisContainer = New_Container();
    let sheetContainer;
    let checkbox = document.createElement('input');
    checkbox.id = "#sheet_music_checkbox"
    checkbox.type = 'checkbox';
    checkbox.name = 'sheetmusic';
    checkbox.value = ' Sheet Music';
    let text = document.createTextNode(checkbox.value);
    thisContainer.appendChild(checkbox);
    thisContainer.appendChild(text);
    checkbox.onchange = function () {
        if (this.checked === true) {
            sheetContainer = New_Container();
            sheetContainer.className = 'sheet-wrapper';
            sheetContainer.style.height = 'auto';
            //Make_Sheet(sheetContainer);
            // let img = document.createElement('img');
            // img.src = '../img/musicsheet.png';
            // img.style.height = 2 + 'rem';
            createSheetMusic(sheetContainer);
            // sheetContainer.appendChild(img);
        }
        else if (this.checked === false) {
            clearTimeout(timeoutTimer);
            clearInterval(intervalTimer);
            container.removeChild(sheetContainer);
        }
        else if (typeof sheetContainer !== 'undefined') {
            container.removeChild(sheetContainer);
        }
    }
}

/*function Make_Sheet(sheet){
}*/
function Radio() {
    let mouse = document.createElement('input');
    let keyboard = document.createElement('input');

    mouse.type = 'radio';
    mouse.name = 'playing options';
    mouse.value = 'mouse';
    mouse.checked = true;
    mouse.addEventListener('change', function() {
        let pianoContainer = document.getElementById("PianoContainer");
        document.onkeypress = null;
        let areas = document.querySelectorAll('#PianoContainer area');
        for (let i = 0; i < areas.length; ++i) {
            area = areas[i];
            // area.onkeypress = null;
            area.onclick = function(ev) {
                ev.preventDefault();
                playNote(area.getAttribute('data-note'));
                // sampler.triggerAttackRelease(area.getAttribute('data-note'));
            }
        }
    });
    let mouseTxt = document.createTextNode('mouse');
    let thisContainer = New_Container();
    thisContainer.appendChild(mouse);
    thisContainer.appendChild(mouseTxt);
    thisContainer.appendChild(linebreak);

    keyboard.type = 'radio';
    keyboard.name = 'playing options';
    keyboard.value = 'keyboard';
    keyboard.checked = false;
    keyboard.addEventListener('change', function() {
        let areas = document.querySelectorAll('#PianoContainer area');
        for (let i = 0; i < areas.length; ++i) {
            area = areas[i];
            area.onclick = function (ev) {
                ev.preventDefault();
            }
        }
        let pianoContainer = document.getElementById("PianoContainer");
        document.onkeypress = function(ev) {
            let keyNoteMap = {'Z' : 'C2', 'X' : 'D2', 'C' : 'E2', 'V' : 'F2', 'B' : 'G2', 'N' : 'A2', 'M' : 'B2', 'A': 'C3', 'S' : 'D3', 'D' : 'E3', 'F' : 'F3', 'G' : 'G3', 'H' : 'A3', 'J' : 'B3', 'Q' : 'C4', 'W' : 'D4', 'E' : 'E4', 'R' : 'F4', 'T' : 'G4', 'Y' : 'A4', 'U' : 'B4', '1' : 'C5', '2' : 'D5', '3' : 'E5', '4' : 'F5', '5' : 'G5', '6' : 'A5', '7' : 'B5'};
            ev.preventDefault();
            playNote(keyNoteMap[ev.key.toUpperCase()])
            // sampler.triggerAttackRelease(keyNoteMap[ev.key.toUpperCase()]);
        }
    })
    let keyboardTxt = document.createTextNode('keyboard');
    thisContainer.appendChild(keyboard);
    thisContainer.appendChild(keyboardTxt);
}

function Simple_Select() {
    let sel = document.createElement('select');

    sel.name = 'colours';

    let basic = document.createElement('option');
    let blue = document.createElement('option');
    let pink = document.createElement('option');
    let yellow = document.createElement('option');

    basic.value = 'basic';
    blue.value = 'blue';
    pink.value = 'pink';
    yellow.value = 'yellow';

    sel.appendChild(basic);
    let basicTxt = document.createTextNode('Default');
    basic.appendChild(basicTxt);

    sel.appendChild(blue);
    let blueTxt = document.createTextNode('Sky');
    blue.appendChild(blueTxt);

    sel.appendChild(pink);
    let pinkTxt = document.createTextNode('Lavender');
    pink.appendChild(pinkTxt);

    sel.appendChild(yellow);
    let yellowTxt = document.createTextNode('Lemon');
    yellow.appendChild(yellowTxt);

    let thisContainer = New_Container();
    thisContainer.appendChild(sel);

    sel.onchange = function () {
        if (sel.value === basic.value)
            container.style.backgroundColor = 'white';
        if (sel.value === blue.value)
            container.style.backgroundColor = 'rgb(135, 206, 250)';
        if (sel.value === pink.value)
            container.style.backgroundColor = 'rgb(255, 240, 245)';
        if (sel.value === yellow.value)
            container.style.backgroundColor = 'rgb(255, 250, 205)';
    }
}

function Text_Area() {
    let txtArea = document.createElement('textarea');
    txtArea.style.border = 1 + 'px' + 'solid' + '#888';
    txtArea.style.width = 100 + '%';
    if (localStorage.getItem('notes') === null) {
        txtArea.placeholder = 'Add Your Notes...';
    }
    else {
        txtArea.value = localStorage.getItem('notes');
    }
    let thisContainer = New_Container();
    thisContainer.appendChild(txtArea);
    let btnSave = document.createElement('button');
    Style_Button(btnSave);
    btnSave.innerHTML = ' Save ';

    btnSave.addEventListener('click', function () {
        localStorage.setItem('notes', txtArea.value);
        alert('Saved Your Notes!');
    });

    thisContainer.appendChild(btnSave);
}

function Button_Generator() {
    Text_Area();
    /* textarea */
    Range_Button();
    /*input range*/
    CheckBox();
    /* input checkbox*/
    Radio();
    /* input radio*/
    Simple_Select();
    /* select_simplu */
    Text_Button();
    /*input text*/
}

let sampler = new Tone.Sampler({
    "C3": "../mp3/c1.mp3",
    "D#3": "../mp3/d1s.mp3",
    "F#3": "../mp3/f1s.mp3",
    "A3": "../mp3/a1.mp3",
    // "C4" : "../mp3/piano_middle_C.mp3",
    "D#4": "../mp3/piano_D_sharp.mp3",
    "F#4": "../mp3/piano_F_sharp.mp3",
    "A4": "../mp3/piano_A.mp3"
});
sampler.attack = new Tone.Time(0);
sampler.release = new Tone.Time('2n');
sampler.curve = "exponential";
sampler.toMaster();

let musical_notes = localStorage.getItem('musical_notes');

function playNote(note, record = true) {
    sampler.triggerAttackRelease(note, new Tone.Time('4n'));
    if (record === false) return;
    if (musical_notes === null) {
        musical_notes = note + ' ';
    }
    else {
        musical_notes += note + ' ';
    }
}

function createKey(container, coordinates, classType, note) {
    let area = document.createElement('area');
    area.class = classType;
    area.shape = 'poly';
    area.coords = coordinates;
    area.href = '';
    area.setAttribute('data-note', note.toString());
    area.onclick = function(ev) {
        ev.preventDefault();
        playNote(note);
    }
    container.appendChild(area);

}

function createOctave(container, octave) {
    let pianoImg = document.createElement('IMG');
    pianoImg.style.backgroundColor = 'white';
    pianoImg.src = '../img/octave.png';
    pianoImg.width = '300';
    pianoImg.height = '300';
    pianoImg.setAttribute('data-octave', octave);
    pianoImg.useMap = '#keymap' + octave;

    let keyMap = document.createElement('map');
    keyMap.name = 'keymap' + octave;
    createKey(keyMap, '0,0,24,0,24,198,42,198,42,300,0,300', 'white', 'C' + octave);
    createKey(keyMap, '54,0,78,0,78,198,87,198,87,300,45,300,45,198,54,198', 'white', 'D'+ octave);
    createKey(keyMap, '108,0,126,0,126,300,84,300,84,198,108,198', 'white', 'E'+ octave);
    createKey(keyMap, '126,0,150,0,150,198,168,198,168,300,126,300', 'white', 'F'+ octave);
    createKey(keyMap, '178,0,195,0,195,198,210,198,210,300,168,300,168,198,178,198', 'white', 'G'+ octave);
    createKey(keyMap, '225,0,245,0,245,198,252,198,252,300,210,300,210,198,225,198', 'white', 'A'+ octave);
    createKey(keyMap, '274,0,296,0,296,300,254,300,254,198,274,198', 'white', 'B'+ octave);
    container.appendChild(pianoImg);
    container.appendChild(keyMap);
}

function OctaveLabel_Container() {
    let label = New_Container();
    label.id = 'OctaveLabel';
    label.style.paddingTop = '30px';
}

function Piano_Generator() {
    let keyboardContainer = New_Container();
    keyboardContainer.id = "PianoContainer";
    // keyboardContainer.style.marginTop = '5rem';
    keyboardContainer.style.display = 'inline-flex';
    keyboardContainer.style.justifyContent = 'center';
    keyboardContainer.style.height = 'auto';
    keyboardContainer.style.width = 'auto';
    keyboardContainer.style.marginLeft = '0px';
    keyboardContainer.style.marginRight = '0px';
    keyboardContainer.onclick = function(ev) {
        let octaves = document.querySelectorAll('#PianoContainer > img');
        let x = ev.clientX;
        let y = ev.clientY;
        // keyboardContainer.style.width = (octaves.length * 300);
        let nrOctave = parseInt((x - 68) / 300);
        let val = octaves[nrOctave].getAttribute('data-octave');
        let octaveLabel = document.getElementById('OctaveLabel');
        octaveLabel.innerText = "Octave: " + val.toString();
    }
    createOctave(keyboardContainer, 2);
    createOctave(keyboardContainer, 3);
}

var container = document.createElement('div');
var linebreak = document.createElement('br');

/* CONTAINER APLICATIE */
function Container() {
    container.style.width = 90 + '%';
    container.style.height = 70 + '%';
    container.style.border = 'solid ' + 'black ' + 5 + 'px';
    container.style.backgroundColor = 'white';
    container.style.position = 'absolute';
    container.style.margin = 'auto';
    container.style.top = 0;
    container.style.bottom = 0;
    container.style.left = 0;
    container.style.right = 0;
    container.style.overflow = 'auto';
    document.body.appendChild(container);
}

window.onload = function Start() {
    Container();
    /*creez container ptr aplicatie*/
    Piano_Generator();

    OctaveLabel_Container();

    Button_Generator();
    /*generez butoane pentru interfata*/
};