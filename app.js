typeCache = [];

typeCacheRO = [];

pokemonCache = [];

pokemonCacheRO = [];

altFormsCache = [];

altFormsFinal = [];

evoCache = [];

fullEvolvedOnly = false;

selectedTypes = [0,0,0,0];

genNumsNorm = [151, 251, 386, 493, 493, 649, 649, 721, 721, 802, 807];

genNumsAlt = [0, 0, 0, 0, 11, 18, 23, 63, 84, 111, 115];

totalPokemon = 151;

totalAlts = 0;

activeGen = 0;

immuneMons = [];

doubleresMons = [];

resMons = [];

neutralMons = [];

weakMons = [];

doubleweakMons = [];

displayingMons = [false, false, false, false, false, false];

displayingCombosArray = [];

tempArray1 = [];

isLearningMove = false;

typeLearning = null;

checkingOptions = false;

activeState = 0;

bstWeightedOn = false;

lightModeOn = true;

movesLocked = [false, false, false, false];

eeveeCounter = 0;

unownQimage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png`;

calcLogo = `https://raw.githubusercontent.com/NJKMath/njkmath.github.io/main/Ironmon-Coverage-Calculator-8-8-2023.png`

faqModeOn = false;

avgBSTArray = [407.64, 407.46, 406.15, 414.75, 417.30, 420.21, 421.78, 430.68, 435.78, 436.70, 438.19];

avgBSTArrayFE = [484.59, 481.62, 481.73, 495.06, 496.53, 499.97, 501.76, 511.58, 516.76, 515.90, 517.29];

const colors = [
	'#A8A77A',
    '#C22E28',
    '#A98FF3',
    '#A33EA1',
    '#E2BF65',
    '#B6A136',
    '#A6B91A',
    '#735797',
    '#B7B7CE',
	'#EE8130',
	'#6390F0',
    '#7AC74C',
	'#F7D02C',
	'#F95587',
	'#96D9D6',
	'#6F35FC',
	'#705746',
	'#D685AD',
];

const loadMode = () => {

    tempString = ``;

    tempString += `<div class = "modeContainer"><div class = "modeCard" onClick = "changeMode(${true})" style="${checkMode(0)};">
    <img class = "card-image" src="${pokemonCacheRO[337].image}"/>
    <h2 class = "modeFont" style = "color: white";>Light Mode</h2>
   </div>`;

   tempString += `<div class = "modeCard" onClick = "changeMode(${false})" style="${checkMode(1)};">
   <img class = "card-image" src="${pokemonCacheRO[336].image}"/>
   <h2 class = "modeFont">Dark Mode</h2>
  </div></div>`;

    tempString += `<div class = "evoBSTContainer"><div class="evoButtonCard" style = "border: ${checkColorFont(true)};"onClick = "evoButton()">
    <h2 class="evoButtonFont">Fully Evolved Only ${returnFullEvoText()}</h2>
    <img class = "card-image" style = "position: absolute; top: -60px; right: 10px;" src="${returnEeveeImage()}"/>
</div>`;

    tempString += `<div class="evoButtonCard" style = "border: ${checkColorFont(true)};" onClick = "toggleBSTMode()">
    <h2 class="evoButtonFont">BST-Weighted ${returnBSTWeightText()}</h2>
</div></div>`;

  tempString += `<h1 style = "margin: auto;"><img class = "card-image" src="${calcLogo}"/></h1>`;

  tempString += `<div class = "unownQContainer"><div class="unownQCard" onClick = "explainCalc()" style = "background-color: ${checkColorCombos()};">
  <img class = "card-image" style = "scale: 1.5;" src="${unownQimage}"/>
  </div>`;

  tempString += `<div class="unownQCard" onClick = "explainCalc()" style = "left: 20px; background-color: transparent;">
  <img class = "card-image" style = "scale: 1.5;" src="${unownQimage}"/>
  </div>`;

  tempString += `<div class="unownQCard" onClick = "explainCalc()" style = "left: 40px; background-color: transparent;">
  <img class = "card-image" style = "scale: 1.5;" src="${unownQimage}"/>
  </div></div>`;
  
   brightmode.innerHTML = tempString;
}

const returnFullEvoText = () => {
    if(fullEvolvedOnly){
        return `(On)`;
    } else {
        return `(Off)`;
    }
}

const returnBSTWeightText = () => {
    if(bstWeightedOn){
        return `(On)`;
    } else {
        return `(Off)`;
    }
}

const returnEeveeImage = () => {

    if(!fullEvolvedOnly){
        eeveeCounter += 1;
        return pokemonCacheRO[132].image;
    }

    if(eeveeCounter >= 9){
        eeveeCounter = 1;
    }
    
    switch (eeveeCounter) {
        case 1:
            return pokemonCacheRO[133].image; 
            break;
        case 2:
            return pokemonCacheRO[134].image; 
            break;
        case 3:
            return pokemonCacheRO[135].image; 
            break;
        case 4:
            return pokemonCacheRO[195].image; 
            break;
        case 5:
            return pokemonCacheRO[196].image; 
            break;
        case 6:
            return pokemonCacheRO[469].image; 
            break;
        case 7:
            return pokemonCacheRO[470].image; 
            break;
        case 8:
            return pokemonCacheRO[699].image; 
            break;
        default:
            return unownQimage;
            break;
    }
}

const changeMode = (bool) => {

    lightModeOn = bool;

    if(lightModeOn){
        document.body.style.backgroundColor = "azure";
        document.getElementsByTagName('H1')[0].style.color = "black";
    } else {
        document.body.style.backgroundColor = "#121212";
        document.getElementsByTagName('H1')[0].style.color = "white";
    }

    loadMode();
    reloadCalc();
}

const checkMode = (num) => {

    if(num == 0){
        if(!lightModeOn){
            return `opacity: .4`;
        } else {
            return `opacity: 1`;
        }
    }

    if(num == 1){
        if(lightModeOn){
            return `opacity: .4`;
        } else {
            return `opacity: 1`;
        }
    }
}

const checkColorFont = (yellow) => {
    if(faqModeOn && yellow){
        return "5px solid blue;";
    }

    if(lightModeOn){
        return "1px solid #000000;";
    } else {
        return "1px solid #FFFFFF;";
    }
}

const checkColorTypeSel = () => {
    if(lightModeOn){
        return "black";
    } else {
        return "white";
    }
}

const checkColorCombos = () => {
    if(lightModeOn){
        return "azure";
    } else {
        return "#121212";
    }
}

const loadPokemon = async () => {

    evoCache = await cacheEvos();
    pokemonCache = await cachePokemon();
    altFormsFinal = await cacheAltForms();
    
};

const cachePokemon = () => {

    return fetch(`/pokemoncache.json`)
    .then((response) => {return response.json().then((data) => {return data.pokemonCache;})});

}

const cacheAltForms = () => {

    return fetch(`/pokemoncache.json`)
    .then((response) => {return response.json().then((data) => {return data.altFormsFinal;})});
    
}

const cacheEvos = () => {

    return fetch(`/pokemoncache.json`)
    .then((response) => {return response.json().then((data) => {return data.evoCache;})});
     
    console.log(evoCache);
}

const typeToID = (type) => {
    for(let i = 1; i < 19; i++){
        if(type == typeCache[i-1].name){
            return i;
        }
    }
}

const loadCalc = async () => {

    await loadPokemon();

    pokemonCacheRO = {...pokemonCache};

    const promises = [];
    
    for(let i = 1; i < 19; i++){
    const url = 'https://pokeapi.co/api/v2/type/' + i;
    promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then((results) =>{
        const type = results.map( (data) => ({
            name: data.name,
            id: data.id,
            isweakto: data.damage_relations.double_damage_from,
            resists: data.damage_relations.half_damage_from,
            immunes: data.damage_relations.no_damage_from,
            pastinteractions: data.past_damage_relations
        }));
        loadTypes(type);
    });

    for(let i = 0; i < 5; i++){
        displayingCombosArray[i] = [];
        for(let j = 0; j < 6; j++){
            displayingCombosArray[i][j] = false;
        }
    }

    loadSelectedTypes();
    displayGenSelect();
    loadMode();
};

const displayGenSelect = () => {

    genSelString = '';

    genTexts = ['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4 - D/P', 'Gen 4 - Plat/HGSS', 'Gen 5 - B/W', 'Gen 5 - BW2', 'Gen 6 - X/Y', 'Gen 6 - ORAS', 'Gen 7 - S/M', 'Gen 7 - USUM'];

    for(let i = 0; i < 11; i++){
        if(activeGen == i){
            genSelString += `<div class="genSelCard active" style = "padding: 0px; border: 2px solid red";>
        <h2 class="genSelFont">${genTexts[i]}</h2>
    </div>`;
        } else {
        genSelString += `<div class="genSelCard" onclick="selectGen(${i})" style = "opacity: .7;">
        <h2 class="genSelFont">${genTexts[i]}</h2>
    </div>`;
        }
    }

    genSelect.innerHTML = genSelString;
}

const selectGen = (i) => {
    activeGen = i;
    totalPokemon = genNumsNorm[i];
    totalAlts = genNumsAlt[i];

    displayGenSelect();

    reloadCalc();
}

const reloadCalc = () => {

    loadMode();
    displayTypes();
    loadSelectedTypes();

    if(activeState == 1){
        runCalc();
        return;
    }

    if(activeState == 2){
        checkCombos();
        return;
    }

    results.innerHTML = ``;
    
}

const adjustPokemon = (pokemon) => {
    
    if(pokemon.id > 10000 && pokemon.id < 10008){
        return pokemon;
    }

    if(pokemon.id > 10012){
        return pokemon;
    }

    //rotom-heat, id 478 is base rotom
    if(pokemon.id == 10008){
        if(activeGen === 4){
            pokemon.type = pokemonCacheRO[478].type;
        } else {
            pokemon.type = ['electric', 'fire'];
        }
        return pokemon;
    }

    //rotom-wash
    if(pokemon.id == 10009){
        if(activeGen === 4){
            pokemon.type = pokemonCacheRO[478].type;
        } else {
            pokemon.type = ['electric', 'water'];
        }
        return pokemon;
    }

    //rotom-fridge
    if(pokemon.id == 10010){
        if(activeGen === 4){
            pokemon.type = pokemonCacheRO[478].type;
        } else {
            pokemon.type = ['electric', 'ice'];
        }
        return pokemon;
    }

    //rotom-fan
    if(pokemon.id == 10011){
        if(activeGen === 4){
            pokemon.type = pokemonCacheRO[478].type;
        } else {
            pokemon.type = ['electric', 'flying'];
        }
        return pokemon;
    }

    //rotom-mow
    if(pokemon.id == 10012){
        if(activeGen === 4){
            pokemon.type = pokemonCacheRO[478].type;
        } else {
            pokemon.type = ['electric', 'grass'];
        }
        return pokemon;
    }

    pokemonCache[pokemon.id-1] = JSON.parse(JSON.stringify(pokemonCacheRO[pokemon.id-1]));
    
    if(pokemon.pasttype.length == 0){
        return pokemonCache[pokemon.id-1];
    }

    trueGen = findTrueGen(activeGen);

    genNumerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

    for(let i = 0; i < 7; i++){
    if(pokemon.pasttype[0].generation.name === `generation-${genNumerals[i]}` && trueGen <= i){

        pokemonCache[pokemon.id-1].type = [];

        for(let j = 0; j < pokemon.pasttype[0].types.length; j++){
            pokemonCache[pokemon.id-1].type[j] = `${pokemonCacheRO[pokemon.id-1].pasttype[0].types[j].type.name}`;
        }

        return pokemonCache[pokemon.id-1];
    }

    }

    pokemonCache[pokemon.id-1].type = JSON.parse(JSON.stringify(pokemonCacheRO[pokemon.id-1].type));

    return pokemonCache[pokemon.id-1];
}

const findTrueGen = (activeGen) => {
    if(activeGen < 4){
        trueGen = activeGen;
    } else if (activeGen == 4){
        trueGen = 3;
    } else if (activeGen == 5 || activeGen == 6){
        trueGen = 4;
    } else if (activeGen == 7 || activeGen == 8){
        trueGen = 5;
    } else if (activeGen == 9 || activeGen == 10){
        trueGen = 6;
    }

    return trueGen;
}

const loadTypes = (type) => {

    typeCache = [];

    for(let i = 1; i < 19; i++){
        typeCache[type[i-1].id-1] = type[i-1];
        typeCacheRO[type[i-1].id-1] = {...type[i-1]};
    }

    displayTypes();
    
};

const displayTypes = () => {

    typeHTMLString = ``;

    console.log(typeCacheRO);

    for(let i = 0; i < 18; i++){
    tempNum = selectedTypes.indexOf(typeCacheRO[i].id);

    if(tempNum < 0 && typeLearning != (i+1)){
    typeHTMLString += `<li class = "typeSelCard" onclick = "cacheType(${typeCacheRO[i].id})" style = "background-color: ${colors[typeCacheRO[i].id-1]};">
     <h2 class = "selTypeFont">${typeCacheRO[i].name}</h2>
    </li>`;
    } else if(typeLearning == (i+1)) {
        typeHTMLString += `<li class ="typeSelCard learning" onclick = "cacheType(${typeCacheRO[i].id})" style = "background-color: ${colors[typeCacheRO[i].id-1]};">
     <h2 class = "selTypeFont">${typeCacheRO[i].name}</h2>
    </li>`;
    } else {
        typeHTMLString += `<li class ="typeSelCard active" onclick = "cacheType(${typeCacheRO[i].id})" style = "background-color: ${colors[typeCacheRO[i].id-1]}; border: 5px solid ${checkColorTypeSel()};">
     <h2 class = "selTypeFont">${typeCacheRO[i].name}</h2>
    </li>`;
    }
    }
    
    pokecalc.innerHTML = typeHTMLString;

}

const cacheType = (id) => {

    if(!typeCache[id]){

    const url = 'https://pokeapi.co/api/v2/type/' + id;
    fetch(url)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        const typeSelected = {};
        typeSelected['name'] = data.name;
        typeSelected['id'] = data.id;
        typeSelected['isweakto'] = data.damage_relations.double_damage_from;
        typeSelected['isstrongagainst'] = data.damage_relations.double_damage_to;
        typeCache[id] = typeSelected;
    });
    }

    if(isLearningMove && typeLearning!=id){
        typeLearning = id;
        reloadCalc();
        return;
    }

    if(typeLearning == id){
        typeLearning = 0;
        reloadCalc();
        return;
    }

    for (let i = 0; i < 4; i++) {
        if(selectedTypes[i] == id){
            removeSlot(id);
            return;
        }
    }

    for (let i = 0; i < 4; i++) {
        if(selectedTypes[i] == 0 && !movesLocked[i]){
            selectedTypes[i] = id;
            reloadCalc();
            return;
        }
    }
    
};

const loadSelectedTypes = () => {

    selTypString = '';

    selTypString += `<div class = "movesetContainer">`

    for (let i = 0; i < 4; i++) {
        selTypString += loadOneType(i);
    }

    selTypString += `</div><div class="calcCard" onClick="overrideCalc()" style = "background: ${displayCalcColor()}; border: ${checkColorFont(true)};">
    <h2 class="calcFont">Calculate Coverage</h2>
</div>`;

    if(isLearningMove){
        if(typeLearning){
            selTypString += `<div class="learningMoveCard active" onClick = "learningMove()" style = "background-color: ${colors[typeCache[typeLearning-1].id-1]};">
    <h2 class="learningMoveFont">Learning Move: \n ${(typeCache[typeLearning-1].name).toUpperCase()}</h2>
</div>`;
        } else {
            selTypString += `<div class="learningMoveCard active" onClick = "learningMove()">
    <h2 class="learningMoveFont">Learning Move: \n (Click a type)</h2>
</div>`;
        }
        
    } else if (!typeLearning) {
    selTypString += `<div class="learningMoveCard" onClick = "learningMove()" style = "border: ${checkColorFont(true)};">
    <h2 class="learningMoveFont">Learning Move: \n (Click to select)</h2>
</div>`;
    } else {
        selTypString += `<div class="learningMoveCard" onClick = "learningMove()" style = "background-color: ${colors[typeCache[typeLearning-1].id-1]};">
    <h2 class="learningMoveFont">Learning Move: \n ${(typeCache[typeLearning-1].name).toUpperCase()}</h2>
</div>`;
    }

    selTypString += `<div class="checkOptionsCard" onClick = "checkCombos()" style = "background: ${displayCheckOptionsColor()}; border: ${checkColorFont(true)};">
    <h2 class="checkOptionsFont">Check Options</h2>
</div>`;

selTypString += `<div class="sketchCard" onClick = "sketchPrioCalc()" style = "border: ${checkColorFont(true)};">
<h2 class="sketchFont">Sketch Priority</h2>
<img class = "topImage" src="${pokemonCacheRO[234].image}"/>
</div>`;

    selectedtypes.innerHTML = selTypString;
};

const loadOneType = (i) => {

    if(selectedTypes[i] == 0){
        oneTypeCard = `<div class="selectedTypeCard" onclick="lockMove(${i})" style = "opacity: ${movesLockedOpacity(i)}; border: ${checkColorFont(true)}";>
            <h2 class="movesetFont" style = "${checkMarginLocked(i)}">${displayIfLocked(i)} Move ${i+1}</h2>
            <img class = "klefkiImage" style = "scale: .6;" src="${pokemonCache[706].image}"/>
    </div>`
    }else{
    oneTypeCard = `<div class="selectedTypeCard" onclick="lockMove(${i})" style="background-color: ${colors[selectedTypes[i]-1]}; border: ${checkColorFont(true)};">
            <h2 class="movesetFont" style = "${checkMarginLocked(i)}">${displayIfLocked(i)} ${typeCache[selectedTypes[i]-1].name}</h2>
            <img class = "klefkiImage" style = "scale: .6; opacity: ${movesLockedOpacity(i)};" src="${pokemonCache[706].image}"/>
    </div>`
    }

    return oneTypeCard;
};

const sketchPrioCalc = () => {

    if(faqModeOn){
        results.innerHTML = `<div class = explainCard><h2 class = explainCardFont>
        Will calculate the top 5 types to add to your moveset with Sketch, along with which type they should replace.

        <br><br>

        This feature is not currently available, but will be coming soon!
        
        </h2></div>`;
        return;
    }

    results.innerHTML = `<div class = explainCard><h2 class = explainCardFont>
        Will calculate the top 5 types to add to your moveset with Sketch, along with which type they should replace.

        <br><br>

        This feature is not currently available, but will be coming soon!
        
        </h2></div>`;
        return;
}

const explainCalc = () => {

    results.innerHTML = ``;

    faqModeOn = !faqModeOn;

    reloadCalc();

    if(!faqModeOn){
        runCalc();
        return;
    }

    tempString = ``;

    tempString += `<div class = explainCard><h2 class = explainCardFont>Click any of the buttons highlighted in blue to learn more about their functions. <br>
    <br>
    To return to normal calculator functions, click this button again. 
    <br><br>
    If any explanations are unclear, or for any other comments, complaints, or suggestions, contact King Jebus (kingjebus) on Discord, or 
    KingJebusTheWise on Twitch.
    </h2></div>`;

    results.innerHTML = tempString;
    
}

const evoButton = () => {

    if(faqModeOn){
        results.innerHTML = `<div class = explainCard><h2 class = explainCardFont>When toggled off, every single Pokémon will be counted in the calculator. <br>
        <br>
        When toggled on, only fully evolved Pokémon will be counted. <br>
        <br>
        Note that the default Kaizo and Survival rules have enemy Pokémon fully evolved after Level 30, so this should be toggled on once you reach that point.</h2></div>`;
        return;
    }

    fullEvolvedOnly = !fullEvolvedOnly;
    loadSelectedTypes();
    reloadCalc();
}

const displayCheckOptionsColor = () => {

    if(typeLearning){
        return `repeating-linear-gradient(-45deg,
            ${colors[typeLearning-1]},
            ${colors[typeLearning-1]} 3px,
            #00000000 3px,
            #00000000 10px), ${displayCalcColor()}`
    } 
}

const toggleBSTMode = () => {

    if(faqModeOn){
        results.innerHTML = `<div class = explainCard><h2 class = explainCardFont>Weights mons by BST, instead of only counting the number of mons. <br>
        <br>
        For example, normally Spinda and Arceus would both count for one Pokémon in the coverage calculator. 
        However, in BST-Weighted Mode, since Arceus has twice Spinda's BST, it will be weighted twice as much. <br>
        <br>
        The formula depends on the generation and whether or not fully evolved is toggled on. In Plat/HGSS, the average fully evolved
        BST is 496.53. This means that Spinda would count as 360/496.53 = .73, whereas Arceus would count as 720/496.53 = 1.45.

        </h2></div>`;
        return;
    }

    bstWeightedOn = !bstWeightedOn;
    loadSelectedTypes();
    reloadCalc();
}

const learningMove = () => {

    if(faqModeOn){
        results.innerHTML = `<div class = explainCard><h2 class = explainCardFont>When highlighted red, you may select a type. <br>
        <br>
        Once a type is selected, the "Check Options" button can be used to see the coverage of all possible movesets formed with this new move.
        For more details, click on the "Check Options" button. <br>
        <br>
        To stop selecting a move, click this button again. This will preserve the current move you have selected. To deselect a learned move, click the appropriate
        type in the main type selection area.
        
        </h2></div>`;
        return;
    }

    if(typeLearning && !isLearningMove){
        typeLearning = false;
    }

    isLearningMove = !isLearningMove;

    displayTypes();
    loadSelectedTypes();

}

const checkCombos = () => {

    if(faqModeOn){
        results.innerHTML = `<div class = explainCard><h2 class = explainCardFont>If "Learning Move:" has a type selected, calculates the coverage of all possible choices. <br>
        <br>
        For example, if your current moveset is Fire/Water/Grass/Electric, and you are learning an Ice-type move, your current coverage along with
        the coverage of all four possible new movesets will be shown. If any moves are locked, that option will not be shown.
        <br><br>
        Each of the numbers can be clicked to see the specific Pokémon. The options on the left can be clicked once the decision of which move to drop is made.
        </h2></div>`;
        return;
    }

    if(!typeLearning){
        return;
    }

    tempCount = 0;
    for(let i = 0; i < 4; i++){
        if(selectedTypes[i] == 0){
            tempCount += 1;
        }
    }
    if(tempCount == 4){
        return;
    }

    checkingOptions = true;

    selTypesRO = [...selectedTypes];

    comboArrays = [];

    tempBSTArrays = [];

    tempVar2 = [];

    for(let i = 0; i < 4; i++){
        if(selectedTypes[i] != 0 && !movesLocked[i]){
            selectedTypes[i] = typeLearning;
            tempVar2 = runCalc();
            comboArrays[i] = tempVar2[0];
            tempBSTArrays[i] = tempVar2[1];
        } 

        selectedTypes = [...selTypesRO];
        
    }

    tempMod = 0;

    for(let i = 0; i < 4; i++){
        if(selectedTypes[i] == 0 && !movesLocked[i]){
            tempMod = 1;
        }
    }

    tempStringArray = [];

    if(tempMod == 1){
        for(let i = 0; i < 4; i++){
            if(selectedTypes[i] == 0 && !movesLocked[i]){
            selectedTypes[i] = typeLearning;
            }
        }
        
        tempVar2 = runCalc();
        comboArrays[comboArrays.length] = tempVar2[0];
        tempBSTArrays[tempBSTArrays.length] = tempVar2[1];
        selectedTypes = [...selTypesRO];
    }

    tempVar2 = runCalc();
    comboArrays[comboArrays.length] = tempVar2[0];
    tempBSTArrays[tempBSTArrays.length] = tempVar2[1];

    for(let i = 0; i < 5; i++){
        displayingCombosArray[i] = [];
        for(let j = 0; j < 6; j++){
            displayingCombosArray[i][j] = false;
        }
    }

    comboArrays = comboArrays.filter(function (el) {
        return el != null;
      });

      tempBSTArrays = tempBSTArrays.filter(function (el) {
        return el != null;
      });  
    
    loadCombos();

}

const loadCombos = () => {

    storeSelTypes = [...selectedTypes];

    selectedTypes.sort(function(a,b){

        if(!movesLocked[selectedTypes.indexOf(b)] && b == 0){
            return -1;
        }

        if(movesLocked[selectedTypes.indexOf(a)]&&movesLocked[selectedTypes.indexOf(b)]){
            return 0;
        } else if (movesLocked[selectedTypes.indexOf(a)]&&!movesLocked[selectedTypes.indexOf(b)]){
            return 1;
        } else if (!movesLocked[selectedTypes.indexOf(a)]&&movesLocked[selectedTypes.indexOf(b)]){
            return -1;
        } else {
            return 0;
        }
    });

    activeState = 2;

    results.innerHTML = "";

    for(let i = 0; i < comboArrays.length; i++){
        tempStringArray[i] = [];
        for(let j = 0; j < 8; j++){
            tempStringArray[i][j] = "";
        }
    }

    if(bstWeightedOn){
        for(let i = 0; i < tempBSTArrays.length; i++){
            for(let j = 0; j < 6; j++){
                tempBSTArrays[i][j] = Number(tempBSTArrays[i][j]).toFixed(2);
            }
        }
    }

    for(let i = 0; i < comboArrays.length; i++){

        for(let j = 1; j < 7; j++){           
        
        tempStringArray[i][7] = `<div id="wrapper><div class="numResultsBlankCard"><h2>${showCombos(i)}</h2></div></div>`;

    if(i < (comboArrays.length - 1 - tempMod)){
    tempStringArray[i][0] = `<div class = "comboRowContainer"><li class="comboResultsCard" onClick = "updateMoveset(${selectedTypes[i]})" style="background-color: ${colors[typeCache[selectedTypes[i]-1].id-1]}; border: ${checkColorFont(false)};">
    <h2 class="resultsFont">Drop ${(typeCache[selectedTypes[i]-1].name).toUpperCase()}:` + `&emsp;&emsp;`;
    
    tempStringArray[i][j] += `<li class="comboResultsCard" onclick = "displayingCombos(${i},${j-1})" style = "background-color: ${styleCleanup((typeCache[selectedTypes[i]-1].id-1), i, j-1)};">
    <h2 class="resultsFont">`;
        tempStringArray[i][j] += `${insertText(j-1)}${tempBSTArrays[i][j-1]}` + `&emsp;&emsp;`;
    } 
    
    if(i == (comboArrays.length - 2) && tempMod != 0){
        tempStringArray[i][0] = `<div class = "comboRowContainer"><li class="comboResultsCard" onClick = "updateMoveset(${0})" style="background-color: ${colors[typeCache[typeLearning-1].id-1]}; border: ${checkColorFont(false)};">
        <h2 class="resultsFont">Add ${(typeCache[typeLearning-1].name).toUpperCase()}:` + `&emsp;&emsp;`;

        tempStringArray[i][j] += `<li class="comboResultsCard" onclick = "displayingCombos(${i},${j-1})" style = "background-color: ${styleCleanup(typeCache[typeLearning-1].id-1, i, j-1)};">
        <h2 class="resultsFont">`;
            tempStringArray[i][j] += `${insertText(j-1)}${tempBSTArrays[i][j-1]}` + `&emsp;&emsp;`;
    
    }

    if(i == (comboArrays.length-1)){
        tempStringArray[i][0] = `<div class = "comboRowContainer"><li class="comboResultsCard" onClick = "updateMoveset(${-1})" style = "border: ${checkColorFont(false)};">
        <h2 class="resultsFont">Current Moves:` + `&emsp;&emsp;`;

        tempStringArray[i][j] += `<li class="comboResultsCard" onclick = "displayingCombos(${i},${j-1})" style = "background-color: ${styleCleanup(-1, i, j-1)};">
        <h2 class="resultsFont">`;
            tempStringArray[i][j] += `${insertText(j-1)}${tempBSTArrays[i][j-1]}` + `&emsp;&emsp;`;
    }

    tempStringArray[i][j] += `</h2></li>`;
}  

    tempStringArray[i][0] += `</h2></li>`;

    tempStringArray[i][6] += `</div>`;

    }

    tempStringArray.sort(function(a,b){
        
        for(let i = 0; i < 5; i++){  
        if(tempBSTArrays[tempStringArray.indexOf(a)][i]-tempBSTArrays[tempStringArray.indexOf(b)][i] != 0){
            return tempBSTArrays[tempStringArray.indexOf(a)][i]-tempBSTArrays[tempStringArray.indexOf(b)][i];
        }
    }
    
    console.log("error?");

    return a-b;
    
    });
    
    for(let i = 0; i < comboArrays.length; i++){
        results.innerHTML += tempStringArray[i].join(` `) + `\n`;
    }

    selectedTypes = [...storeSelTypes];
}

const styleCleanup = (num, i, j) => {

    if(num == -2){
        if(tempArray1[i] == 0){
            return `${checkColorCombos()}`;
        } else {
            return `#8F867B`;
        }
    }

    if(num == -1){
        if(tempBSTArrays[i][j] == 0){
            return `${checkColorCombos()}`;
        } else {
            return `#8F867B`;
        }
    }

    if(tempBSTArrays[i][j] == 0){
        return `${checkColorCombos()}`;
    } else{
        return colors[num];
    }
}

const displayingCombos = (row, col) => {

    displayingCombosArray[row][col] = !displayingCombosArray[row][col];

    loadCombos();
}

const showCombos = (row) => {

    tempString = ``;

    for(i = 0; i < 6; i++){
        if(displayingCombosArray[row][i]){
        tempString += `<br></br>` + `<h2  style="color: ${checkColorFontBW()}";>${insertText(i)}</h2>` + `${showMons(comboArrays[row][i])}` ;
        }
    }
    
    return tempString;
}

const checkColorFontBW = () => {
    if(lightModeOn){
        return "#000000";
    } else {
        return '#FFFFFF';
    }
}

const updateMoveset = (num) => {

    if(num == -1){
        typeLearning = 0;
        activeState = 0;
        reloadCalc();
        return;
    }

    for(let i = 0; i < 4; i++){
        if(selectedTypes[i] == num){
            selectedTypes[i] = typeLearning;
            typeLearning = 0;
            activeState = 0;
            reloadCalc();
            return;
            }
        }
    
}

const removeSlot = (id) => {

    for (let i = 0; i < 4; i++) {
        if (selectedTypes[i] === id && !movesLocked[i]) {
            selectedTypes[i] = 0;
            reloadCalc();
        }
    }
    
    reloadCalc();
}

const displayIfLocked = (i) => {
    if(movesLocked[i]){
        return `&#x1f512;`;
    } else {
        return ``;
    }
}

const checkMarginLocked = (i) => {
    if(movesLocked[i]){
        return `margin-top: 11px;`;
    } else {
        return;
    }

}

const movesLockedOpacity = (i) => {
    if(movesLocked[i]){
        return 1;
    } else {
        return .5;
    }
}

const lockMove = (i) => {

    if(faqModeOn){
        results.innerHTML = `<div class = explainCard><h2 class = explainCardFont>Displays current move types. <br>
        <br>
        Clicking on the Klefki allows you to "lock" the moves, which means that the "Check Options" button will not show options that result in dropping these moves. <br>
        <br>
        For example, if you have Earthquake on a Ground type physical attacker, you would never consider dropping it. This allows you to ignore that option when learning a new move. <br>
        <br>
        Note that if you have a status move you do not wish to drop, you may also lock the empty "N/A" moveslots.
        
        
        </h2></div>`;
        return;
    }

    movesLocked[i] = !movesLocked[i];
    reloadCalc();
}

const overrideCalc = () => {

    if(faqModeOn){
        results.innerHTML = `<div class = explainCard><h2 class = explainCardFont>Calculates coverage based on current move types, generation, and
        evolution setting.<br>
        <br>
        The results are displayed horizontally in numerical form. Each box can be clicked on to show the specific Pokémon that are
        at each level of coverage. <br><br>
        Pokémon are displayed in order of BST (Base Stat Total), from highest to lowest.
        </h2></div>`;
        return;
    }

    checkingOptions = false;
    isLearningMove = false;
    loadSelectedTypes();
    runCalc();
}

const runCalc = () => {

    if(!pokemonCache){
        console.log("error");
    }

    results.innerHTML = "";

    num0 = 0;

    num25 = 0;

    num5 = 0;

    num1 = 0;

    num2 = 0;

    num4 = 0;

    immuneMons = [];
    doubleresMons = [];
    resMons = [];
    neutralMons = [];
    weakMons = [];
    doubleweakMons = [];
   
    currentMults = [0, 0, 0, 0];

    displayingMons = [false, false, false, false, false, false];

    for(let i = 0; i < totalPokemon; i++){
        adjustedMon = adjustPokemon(pokemonCache[i]);
        for(let j = 0; j < 4; j++){
            currentMults[j] = findMultiplier(adjustedMon, selectedTypes[j]);
        }
        switch(Math.max(currentMults[0], currentMults[1], currentMults[2], currentMults[3])){
            case 0:
              immuneMons[immuneMons.length] = adjustedMon;
              num0 += returnNum(adjustedMon);
              break;
            case .25:
              doubleresMons[doubleresMons.length] = adjustedMon;
              num25+=returnNum(adjustedMon);
              break;
            case .5:
                resMons[resMons.length] = adjustedMon;
                num5+=returnNum(adjustedMon);
                break;
            case 1:
                neutralMons[neutralMons.length] = adjustedMon;
                num1+=returnNum(adjustedMon);
                break;
            case 2:
                weakMons[weakMons.length] = adjustedMon;
                num2+=returnNum(adjustedMon);
                break;
            case 4:
                doubleweakMons[doubleweakMons.length] = adjustedMon;
                num4+=returnNum(adjustedMon);
                break;
            case 5:
                break;
            default:
              console.log("error in findmult");
              console.log(adjustedMon);
          }
    }

    for(i = 0; i < totalAlts; i++){
        adjustedMon = adjustPokemon(altFormsFinal[i]);
        for(let j = 0; j < 4; j++){
            currentMults[j] = findMultiplier(adjustedMon, selectedTypes[j]);
        }
        switch(Math.max(currentMults[0], currentMults[1], currentMults[2], currentMults[3])){
            case 0:
              immuneMons[immuneMons.length] = adjustedMon;
              num0 += returnNum(adjustedMon);
              break;
            case .25:
              doubleresMons[doubleresMons.length] = adjustedMon;
              num25+=returnNum(adjustedMon);
              break;
            case .5:
                resMons[resMons.length] = adjustedMon;
                num5+=returnNum(adjustedMon);
                break;
            case 1:
                neutralMons[neutralMons.length] = adjustedMon;
                num1+=returnNum(adjustedMon);
                break;
            case 2:
                weakMons[weakMons.length] = adjustedMon;
                num2+=returnNum(adjustedMon);
                break;
            case 4:
                doubleweakMons[doubleweakMons.length] = adjustedMon;
                num4+=returnNum(adjustedMon);
                break;
            case 5:
                break;
            default:
              console.log("error in findmult");
              console.log(adjustedMon);
          }
    }

    tempArray = [immuneMons, doubleresMons, resMons, neutralMons, weakMons, doubleweakMons];

    tempArray1 = [num0, num25, num5, num1, num2, num4];

    if(checkingOptions){
        return [tempArray, tempArray1];
    }

    tempCount = 0;
    for(let i = 0; i < 4; i++){
        if(selectedTypes[i] == 0){
            tempCount += 1;
        }
    }
    if(tempCount == 4){
        return;
    }

    activeState = 1;

    displayResults(tempArray1);

}

const returnNum = (mon) => {

    numToUse = 1;

    if(fullEvolvedOnly){
        numToUse = avgBSTArrayFE[activeGen];
    } else {
        numToUse = avgBSTArray[activeGen];
    }

    tempBST = 0;

    if(bstWeightedOn){
        tempBST = calcBST(mon);
        
        return (tempBST/numToUse);
    } else {
        return 1;
    }
}

const calcBST = (mon) => {

    tempVar = 0;

    for(let i = 0; i < 6; i++){
        tempVar += mon.basestats[i].base_stat;
    }

    return tempVar;
}

const displayCalcColor = () => {
    trueColors = [];
    trueLen = 0;

    for(let i = 0; i < 4; i++){
        if(selectedTypes[i] != 0){
            trueColors[trueLen] = selectedTypes[i];
            trueLen+=1;
        }
    }

    switch (trueLen) {
        case 0:
            return `${checkColorCombos()}`;
            break;
        case 1:
            return `${colors[trueColors[0]-1]};`;
        case 2:
            return `linear-gradient(to right, ${colors[trueColors[0]-1]} 50%, ${colors[trueColors[1]-1]} 50% 100%);`
        case 3:
            return `linear-gradient(to right, ${colors[trueColors[0]-1]} 31%, ${colors[trueColors[1]-1]} 31% 69%, ${colors[trueColors[2]-1]} 69% 100%);`
        case 4:
            return `linear-gradient(to right, ${colors[trueColors[0]-1]} 23%, ${colors[trueColors[1]-1]} 23% 50%, ${colors[trueColors[2]-1]} 50% 77%, ${colors[trueColors[3]-1]} 77% 100%);`
        default:
            break;
    }
}

const displayResults = (array) => {

    if(bstWeightedOn){
        for(let i = 0; i < 6; i++){
        array[i] = Number(array[i]).toFixed(2);
        }
    }

    console.log(array);

    resultsHTMLString = "";

    resultsHTMLString += `<div class = "comboRowContainer"><li class="comboResultsCard">
    <h2 class="resultsFont">Coverage:&emsp;&emsp;</h2></li>`;

    for(let i = 0; i < 6; i++){
        resultsHTMLString += `<li class="comboResultsCard" onclick = "toggleDisplay(${i})" style = "background-color: ${styleCleanup(-2, i, 0)};">
        <h2 class="resultsFont">${insertText(i)}${array[i]}&emsp;&emsp;</h2>
    </li>`;
    }

    resultsHTMLString += `</div><div id="wrapper><div class="numResultsBlankCard"><h2>${displayMons()}</h2></div></div>`;
    
    results.innerHTML = resultsHTMLString;

}

const toggleDisplay = (num) => {

    displayingMons[num] = !displayingMons[num];

    displayResults(tempArray1);
}

const displayMons = () => {

    tempString = ``;

    for(i = 0; i < 6; i++){
        if(displayingMons[i]){
        tempString += `<br></br>` + `<h2  style="color: ${checkColorFontBW()}";>${insertText(i)}</h2>` + `${showMons(tempArray[i])}`;
        }
    }
    
    return tempString;

}

const showMons = (array) => {

    stringHTML = "";

    tempMonArray = [...array];

    tempMonArray.sort(function(a,b){
        return (calcBST(b) - calcBST(a));
    });

    for(let i = 0; i < tempMonArray.length; i++){
        stringHTML += `<div class = "displayMonsCard">
        <img class = "card-image" src="${tempMonArray[i].image}"/>
       </div>
       `
    }

    return stringHTML;
    
}

const insertText = (num) => {
    switch(num){
        case 0:
          return "Immune: ";
        case 1:
          return "4x Resist: ";
        case 2:
          return "2x Resist: ";
        case 3:
          return "Neutral: ";
        case 4:
          return "2x Weak: ";
        case 5:
          return "4x Weak: ";
        default:
          return "error";
      }
}

const findMultiplier = (pokemon, type) => {

    if(!CheckFullyEvo(pokemon) && fullEvolvedOnly){
        return 5;
    }

    if(type == 0){
        return -1;
    }

    multiplier1 = findOneTypeMult(pokemon.type[0], type);

    if(pokemon.type[1]){
        multiplier2 = findOneTypeMult(pokemon.type[1], type);
    } else {
        multiplier2 = 1;
    }

    if(pokemon.name === 'shedinja' && multiplier1*multiplier2 < 2){
        return 0;
    }

    return multiplier1 * multiplier2;
}

const findOneTypeMult = (montype, type) => {

    montypeA = typeToID(adjustType(typeToID(montype)));
    typeA = typeToID(adjustType(type));

    for(let i = 0; i < typeCache[montypeA-1].isweakto.length; i++){
        if(typeCache[montypeA-1].isweakto[i].name == `${typeCache[typeA-1].name}`){
            multiplier = 2;
            return multiplier;
        }
    }

    for(let i = 0; i < typeCache[montypeA-1].resists.length; i++){
        if(typeCache[montypeA-1].resists[i].name == `${typeCache[typeA-1].name}`){
            multiplier = .5;
            return multiplier;
        }
    }

    for(let i = 0; i < typeCache[montypeA-1].immunes.length; i++){
        if(typeCache[montypeA-1].immunes[i].name == `${typeCache[typeA-1].name}`){
            multiplier = 0;
            return multiplier;
        }
    }

    return 1;

}

const CheckFullyEvo = (pokemon) => {

    if(CheckExceptions(pokemon)){
        return false;
    }

    if(evoCache[pokemon.id] == null){
        return true;
    }

    if(evoCache[pokemon.id].evosfrom == null){
        return true;
    }  
    
    if(evoCache[pokemon.id].evosfrom.name === evoCache[pokemon.id-1].name){
            return false;
        } 

    return true;
}

const CheckExceptions = (pokemon) => {

    babies = ['pichu', 'cleffa', 'igglybuff', 'happiny', 'mime-jr','smoochum', 'elekid', 'magby','munchlax', 'azurill', 'bonsly','wynaut', 'mantyke', 'budew', 'chingling'];

    for(let i = 0; i < babies.length; i++){
        if(pokemon.name === babies[i]){
            return true;
        }
    }

    gen2evos = ['golbat', 'onix', 'chansey', 'seadra', 'scyther', 'porygon'];

    for(let i = 0; i < gen2evos.length; i++){
        if(pokemon.name === gen2evos[i] && activeGen > 0){
            return true;
        }
    }

    gen4evos = ['magneton', 'lickitung', 'rhydon', 'tangela', 'electabuzz', 'magmar', 'porygon2', 'togetic', 'aipom', 'yanma', 'murkrow', 'misdreavus', 'gligar', 'sneasel', 'piloswine', 'nosepass', 'roselia', 'dusclops'];

    for(let i = 0; i < gen4evos.length; i++){
        if(pokemon.name === gen4evos[i] && activeGen > 2){
            return true;
        }
    }
   
    altFormIDs = [27,28,29,91,101,103,105,107,109,110,112];

    for(let i = 0; i < altFormIDs.length; i++){
        if(pokemon.id - 10000 === altFormIDs[i]){
            return true;
        }
    }
   
    return false;

}

const adjustType = (type) => {

    typeCache[type-1].isweakto = JSON.parse(JSON.stringify(typeCacheRO[type-1].isweakto));
    typeCache[type-1].resists = JSON.parse(JSON.stringify(typeCacheRO[type-1].resists));
    typeCache[type-1].immunes = JSON.parse(JSON.stringify(typeCacheRO[type-1].immunes));

    if(typeCacheRO[type-1].pastinteractions.length == 0){
        return typeCacheRO[type-1].name;
    }

    genNumerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

    trueGen = findTrueGen(activeGen);

    if(typeCacheRO[type-1].name === 'ghost'){
        
        if(trueGen == 0){
            typeCache[type-1].isweakto = JSON.parse(JSON.stringify(typeCacheRO[type-1].pastinteractions[0].damage_relations.double_damage_from));
            typeCache[type-1].resists = JSON.parse(JSON.stringify(typeCacheRO[type-1].pastinteractions[0].damage_relations.half_damage_from));
            typeCache[type-1].immunes = JSON.parse(JSON.stringify(typeCacheRO[type-1].pastinteractions[0].damage_relations.no_damage_from));

            return typeCache[type-1].name;
        } else if (trueGen > 4){
            return typeCacheRO[type-1].name;
        } else {
            typeCache[type-1].isweakto = JSON.parse(JSON.stringify(typeCacheRO[type-1].pastinteractions[1].damage_relations.double_damage_from));
            typeCache[type-1].resists = JSON.parse(JSON.stringify(typeCacheRO[type-1].pastinteractions[1].damage_relations.half_damage_from));
            typeCache[type-1].immunes = JSON.parse(JSON.stringify(typeCacheRO[type-1].pastinteractions[1].damage_relations.no_damage_from));
            return typeCache[type-1].name;
        }
    }

    for(let i = 0; i < 7; i++){
        if(typeCacheRO[type-1].pastinteractions[0].generation.name === `generation-${genNumerals[i]}` && trueGen < i+1){
            typeCache[type-1].isweakto = JSON.parse(JSON.stringify(typeCacheRO[type-1].pastinteractions[0].damage_relations.double_damage_from));
            typeCache[type-1].resists = JSON.parse(JSON.stringify(typeCacheRO[type-1].pastinteractions[0].damage_relations.half_damage_from));
            typeCache[type-1].immunes = JSON.parse(JSON.stringify(typeCacheRO[type-1].pastinteractions[0].damage_relations.no_damage_from));

        return typeCache[type-1].name;
        }
    }


    typeCache[type-1].isweakto = JSON.parse(JSON.stringify(typeCacheRO[type-1].isweakto));
    typeCache[type-1].resists = JSON.parse(JSON.stringify(typeCacheRO[type-1].resists));
    typeCache[type-1].immunes = JSON.parse(JSON.stringify(typeCacheRO[type-1].immunes));

    return typeCacheRO[type-1].name;

}


loadCalc();