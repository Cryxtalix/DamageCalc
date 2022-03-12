/**
 * 
 * @param {*} name String name of skill to be searched.
 * @returns The index of the skill. Undefined if the skill does not exist.
 */
 function indexFinder(name) {
  for (let i = 0; i < skills.length; i++) {
      if (skills[i].SkillName.toLowerCase() === name.toLowerCase()) {
        return i;
      }
  }
}

/**
* 
* @param {string} skillName 
* @param {number} myAtt 
* @param {number} oppDef 
* @param {boolean} toCrit True for crit, false for no crit
* @param {boolean} realmOrHeretic True for 2.5x crit damage, false for 2x crit damage
* @returns For single strike skills, the average damage. For multi strikes skill, return an array with the average, minimum and maximum damage.
*/
function damageCalculator(skillName, myAtt, oppDef, toCrit, realmOrHeretic) {
  let index = indexFinder(skillName);
  let mySkill = skills[index];
  let m1 = mySkill.M1;
  let minM2 = mySkill.MinM2;
  let maxM2 = mySkill.MaxM2;
  let castTurns = mySkill.Turns;
  let strikes = mySkill.Strikes;
  let critRate = mySkill.CritRate;

  let avgM2 = (((minM2 + maxM2) / 2) * strikes) / castTurns;

  let critAmt;
  if (critRate === 0 || toCrit === false) {
      critAmt = 1;
  } else {
      if (realmOrHeretic === false) {
          critAmt = 2;
      } else {
          critAmt = 2.5;
      }
  }
  
  let avgDamage = ((myAtt * m1) - (oppDef / 2)) * avgM2 * critAmt;

  // Calculate minimum and maximum damage only for skills with multiple strikes.
  if (strikes > 1) {
    let minimumM2 = (minM2 * strikes) / castTurns;
    let maximumM2 = (maxM2 * strikes) / castTurns;
    let maxDamage = ((myAtt * m1) - (oppDef / 2)) * maximumM2 * critAmt;
    let minDamage = ((myAtt * m1) - (oppDef / 2)) * minimumM2 * critAmt;
    return [Math.floor(avgDamage), Math.floor(minDamage), Math.floor(maxDamage)];
  }

  return Math.floor(avgDamage);
}

const form = document.getElementById('form');
const log = document.getElementById('log');
form.addEventListener('submit', logSubmit);

function logSubmit(event) {
const inputSkillName = document.getElementById('skillName').value;
const inputMyAtt = parseInt(document.getElementById('myAtt').value);
const inputOppDef = parseInt(document.getElementById('oppDef').value);
const inputToCrit = document.getElementById('crit').checked;
const inputROrH = document.getElementById('rOrH').checked;

if (indexFinder(inputSkillName) === undefined) {
  log.textContent = "Skill not found.";
}
if (Number.isInteger(inputMyAtt) === false || Number.isInteger(inputOppDef) === false || inputMyAtt < 0 || inputOppDef < 0) {
  log.textContent = "Please enter a valid number.";
}

let answer = damageCalculator(inputSkillName, inputMyAtt, inputOppDef, inputToCrit, inputROrH);
if (answer.length === 3) {
  log.textContent = `The average damage is: ${answer[0]}. Depending on RNG, the minimum damage is ${answer[1]} and the maximum damage is ${answer[2]}.`;
} else {
  log.textContent = `The average damage is: ${answer}.`;
}

event.preventDefault();
}

skills = [
    {
      "SkillName": "Annwn Fury",
      "Type": "mag",
      "Element": "Arcane",
      "Turns": 3,
      "M1": 4.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Arc",
      "Type": "mag",
      "Element": "Arcane",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Arcana",
      "Type": "mag",
      "Element": "Arcane",
      "Turns": 1,
      "M1": 1.1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Arcana II",
      "Type": "mag",
      "Element": "Arcane",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Arcane Strikes",
      "Type": "atk",
      "Element": "Arcane",
      "Turns": 2,
      "M1": 1,
      "MinM2": 0.75,
      "MaxM2": 1.25,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Arcane Strikes II",
      "Type": "atk",
      "Element": "Arcane",
      "Turns": 3,
      "M1": 1,
      "MinM2": 1.5,
      "MaxM2": 2,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Arcane Strikes III",
      "Type": "atk",
      "Element": "Arcane",
      "Turns": 3,
      "M1": 1,
      "MinM2": 1.5,
      "MaxM2": 2,
      "Strikes": 4,
      "CritRate": 0
    },
    {
      "SkillName": "Arcanic Strike",
      "Type": "atk",
      "Element": "Arcane",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Arcanus",
      "Type": "mag",
      "Element": "Arcane",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 2,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Arcanus II",
      "Type": "mag",
      "Element": "Arcane",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 2,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Arrowstorm",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.25,
      "MaxM2": 0.75,
      "Strikes": 5,
      "CritRate": 0
    },
    {
      "SkillName": "Arrowstorm II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.35,
      "MaxM2": 0.85,
      "Strikes": 5,
      "CritRate": 0
    },
    {
      "SkillName": "Beastslayer",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Beastslayer II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Beaststrike",
      "Type": "atk",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Beaststrike II",
      "Type": "atk",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 1.75,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Beaststrike III",
      "Type": "atk",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.15
    },
    {
      "SkillName": "Beaststrikes",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 1.1,
      "Strikes": 3,
      "CritRate": 0.15
    },
    {
      "SkillName": "Blast",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Blast II",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Blast III",
      "Type": "mag",
      "Element": "no",
      "Turns": 2,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Bleed",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.25
    },
    {
      "SkillName": "Blightstrike",
      "Type": "atk",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Blightstrike II",
      "Type": "atk",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 1.75,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Blightstrike III",
      "Type": "atk",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Blizzard",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Blizzard II",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Bolt",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Bolt II",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Bolt III",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Break Power",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Bright Star",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Cataclysm",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 2,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Cataclysm II",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 3,
      "M1": 1,
      "MinM2": 6,
      "MaxM2": 9,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Cataclysm III",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 3,
      "M1": 1,
      "MinM2": 9,
      "MaxM2": 11,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Charge",
      "Type": "atk",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Charge II",
      "Type": "atk",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Chimera's Song",
      "Type": "mag",
      "Element": "no",
      "Turns": 3,
      "M1": 1,
      "MinM2": 6,
      "MaxM2": 8,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Cockatrice Breath",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1.75,
      "MaxM2": 2.25,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Comet",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Coup de Grace",
      "Type": "atk",
      "Element": "no",
      "Turns": 3,
      "M1": 1,
      "MinM2": 5,
      "MaxM2": 7,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Cyclone",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.4,
      "MaxM2": 1,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Darkstrike",
      "Type": "atk",
      "Element": "Dark",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Darkstrike II",
      "Type": "atk",
      "Element": "Dark",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Darkstrike III",
      "Type": "atk",
      "Element": "Dark",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.15
    },
    {
      "SkillName": "Despair",
      "Type": "mag",
      "Element": "Arcane",
      "Turns": 1,
      "M1": 2.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Desperation",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 2,
      "MaxM2": 2,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Double Edge",
      "Type": "atk",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.75,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Doublecut",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 1.1,
      "Strikes": 2,
      "CritRate": 0
    },
    {
      "SkillName": "Doublecut II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.7,
      "MaxM2": 1.2,
      "Strikes": 2,
      "CritRate": 0
    },
    {
      "SkillName": "Dragon Breath",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1.5,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Dragon's Vengeance",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 3,
      "MaxM2": 3,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Dragon's Vengeance II",
      "Type": "atk",
      "Element": "no",
      "Turns": 2,
      "M1": 1.5,
      "MinM2": 4.5,
      "MaxM2": 4.5,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Dragon's Vengeance III",
      "Type": "atk",
      "Element": "no",
      "Turns": 3,
      "M1": 1.5,
      "MinM2": 3,
      "MaxM2": 3,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Dragonslayer",
      "Type": "atk",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 1.75,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Dragonstrike",
      "Type": "atk",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 1.1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Drain",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1.1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Drain II",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1.25,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Drain III",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Earthstrike",
      "Type": "atk",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1.1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Earthstrike II",
      "Type": "atk",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Earthstrike III",
      "Type": "atk",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Emberseal",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Emberseal II",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Emberstrike",
      "Type": "atk",
      "Element": "Fire",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Emberstrike II",
      "Type": "atk",
      "Element": "Fire",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Evasive Strikes",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.9,
      "MaxM2": 1.1,
      "Strikes": 2,
      "CritRate": 0
    },
    {
      "SkillName": "Fey Cataclysm",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 3,
      "M1": 1,
      "MinM2": 9,
      "MaxM2": 11,
      "Strikes": 1,
      "CritRate": 0.15
    },
    {
      "SkillName": "Fey Fulmination",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 3,
      "M1": 1,
      "MinM2": 9,
      "MaxM2": 11,
      "Strikes": 1,
      "CritRate": 0.15
    },
    {
      "SkillName": "Fey Glacier",
      "Type": "mag",
      "Element": "Water",
      "Turns": 3,
      "M1": 1,
      "MinM2": 9,
      "MaxM2": 11,
      "Strikes": 1,
      "CritRate": 0.15
    },
    {
      "SkillName": "Fey Inferno",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 3,
      "M1": 1,
      "MinM2": 9,
      "MaxM2": 11,
      "Strikes": 1,
      "CritRate": 0.15
    },
    {
      "SkillName": "Fey Flame",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.1
    },
    {
      "SkillName": "Fey Flame II",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.1
    },
    {
      "SkillName": "Fey Flame III",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.25
    },
    {
      "SkillName": "Fey Flame IV",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.25
    },
    {
      "SkillName": "Fey Flame V",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.2
    },
    {
      "SkillName": "Fey Frost",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.1
    },
    {
      "SkillName": "Fey Frost II",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.1
    },
    {
      "SkillName": "Fey Frost III",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.25
    },
    {
      "SkillName": "Fey Frost IV",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.25
    },
    {
      "SkillName": "Fey Frost V",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.2
    },
    {
      "SkillName": "Fey Spark",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.1
    },
    {
      "SkillName": "Fey Spark II",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.1
    },
    {
      "SkillName": "Fey Spark III",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.25
    },
    {
      "SkillName": "Fey Spark IV",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.25
    },
    {
      "SkillName": "Fey Spark V",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.2
    },
    {
      "SkillName": "Fey Tremor",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.1
    },
    {
      "SkillName": "Fey Tremor II",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.1
    },
    {
      "SkillName": "Fey Tremor III",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.25
    },
    {
      "SkillName": "Fey Tremor IV",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.25
    },
    {
      "SkillName": "Fey Tremor V",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.2
    },
    {
      "SkillName": "Fire arrow",
      "Type": "atk",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1.1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Firestrike",
      "Type": "atk",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1.1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Firestrike II",
      "Type": "atk",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Firestrike III",
      "Type": "atk",
      "Element": "Fire",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Flame",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Flame II",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Flame III",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Flame IV",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Flame V",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Flame VI",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 2.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Flare",
      "Type": "mag",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Flare II",
      "Type": "mag",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 2,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Flare III",
      "Type": "mag",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Flurry",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.4,
      "MaxM2": 1,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Flurry II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 1.1,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Forbidden Art",
      "Type": "mag",
      "Element": "no",
      "Turns": 2,
      "M1": 1,
      "MinM2": 4,
      "MaxM2": 5,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Frost",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 1.05,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Frost II",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Frost III",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Frost IV",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Frost V",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Frost VI",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 2.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Frostfire",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 2.4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Frostfire II",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 2.7,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Full Bend",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1.75,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Full Bend II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 3,
      "MinM2": 0,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Fulmination",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 2,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Fulmination II",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 3,
      "M1": 1,
      "MinM2": 6,
      "MaxM2": 9,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Fulmination III",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 3,
      "M1": 1,
      "MinM2": 9,
      "MaxM2": 11,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Galeseal",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Galeseal II",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Galestrike",
      "Type": "atk",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Galestrike II",
      "Type": "atk",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Glacier",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 2,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Glacier II",
      "Type": "mag",
      "Element": "Water",
      "Turns": 3,
      "M1": 1,
      "MinM2": 6,
      "MaxM2": 9,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Glacier III",
      "Type": "mag",
      "Element": "Water",
      "Turns": 3,
      "M1": 1,
      "MinM2": 9,
      "MaxM2": 11,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Gloomseal",
      "Type": "mag",
      "Element": "Dark",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Gloomseal II",
      "Type": "mag",
      "Element": "Dark",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Gloomstrike ",
      "Type": "atk",
      "Element": "Dark",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Gloomstrike II",
      "Type": "atk",
      "Element": "Dark",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Guarding Strike",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Guarding Strikes",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.9,
      "MaxM2": 1.1,
      "Strikes": 2,
      "CritRate": 0
    },
    {
      "SkillName": "Guarding Strikes II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1.2,
      "MaxM2": 1.6,
      "Strikes": 2,
      "CritRate": 0
    },
    {
      "SkillName": "Guarding Strikes III",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1.4,
      "MaxM2": 1.8,
      "Strikes": 2,
      "CritRate": 0
    },
    {
      "SkillName": "Guts",
      "Type": "atk",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0,
      "MaxM2": 2,
      "Strikes": 1,
      "CritRate": 1
    },
    {
      "SkillName": "Hack and Slash",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.4,
      "MaxM2": 1,
      "Strikes": 2,
      "CritRate": 0
    },
    {
      "SkillName": "Heat Lightning",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 2.4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Heat Lightning II",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 2.7,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Faith",
      "Type": "mag",
      "Element": "Holy",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Faith II",
      "Type": "mag",
      "Element": "Holy",
      "Turns": 1,
      "M1": 1.8,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Holy Light",
      "Type": "mag",
      "Element": "Holy",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Holystrike",
      "Type": "atk",
      "Element": "Holy",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Holystrike II",
      "Type": "atk",
      "Element": "Holy",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Holystrike III",
      "Type": "atk",
      "Element": "Holy",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Horizontal Slash",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1.4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Ice Arrow",
      "Type": "atk",
      "Element": "Water",
      "Turns": 1,
      "M1": 1.1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Ice Storm",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 2.4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Ice Storm II",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 2.7,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Iced Earth",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 2.4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Iced Earth II",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 2.7,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Icestrike",
      "Type": "atk",
      "Element": "Water",
      "Turns": 1,
      "M1": 1.1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Icestrike II",
      "Type": "atk",
      "Element": "Water",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Icestrike III",
      "Type": "atk",
      "Element": "Water",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Inferno",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 2,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Inferno II",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 3,
      "M1": 1,
      "MinM2": 6,
      "MaxM2": 9,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Inferno III",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 3,
      "M1": 1,
      "MinM2": 9,
      "MaxM2": 11,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Jump",
      "Type": "atk",
      "Element": "no",
      "Turns": 2,
      "M1": 1,
      "MinM2": 2,
      "MaxM2": 4,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Jump II",
      "Type": "atk",
      "Element": "no",
      "Turns": 2,
      "M1": 1,
      "MinM2": 3,
      "MaxM2": 5,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Lightningstrike",
      "Type": "atk",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 1.1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Lightningstrike II",
      "Type": "atk",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Lightningstrike III",
      "Type": "atk",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Lostseal",
      "Type": "mag",
      "Element": "Arcane",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Lostseal II",
      "Type": "mag",
      "Element": "Arcane",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Loststrike",
      "Type": "atk",
      "Element": "Arcane",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Loststrike II",
      "Type": "atk",
      "Element": "Arcane",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Lunge",
      "Type": "atk",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.5
    },
    {
      "SkillName": "Lunge II",
      "Type": "atk",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.25
    },
    {
      "SkillName": "Lunge III",
      "Type": "atk",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.25
    },
    {
      "SkillName": "Lusus Naturae",
      "Type": "mag",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 1.75,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Lusus Naturae II",
      "Type": "mag",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Lusus Naturae III",
      "Type": "mag",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 2.4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Mage's Dance",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 2,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Mage's Pavane",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.1,
      "MaxM2": 3,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Magic Arrow",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Magic Arrow II",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Magic Arrow III",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Magic Arrow IV",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.8,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Magic Dagger",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Magic Dagger II",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Magic Dagger III",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Magic Dagger IV",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.8,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Magic Hammer",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Magic Hammer II",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Magic Hammer III",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Magic Hammer IV",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.8,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Magic Strikes",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 1.1,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Magic Strikes II",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.75,
      "MaxM2": 1.25,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Magic Strikes III",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.9,
      "MaxM2": 1.3,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Magic Strikes IV",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1.5,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Magic Sword",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Magic Sword II",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Magic Sword III",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Magic Sword IV",
      "Type": "mag",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.8,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Meteor",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Meteor II",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Mighty Charge",
      "Type": "atk",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1.75,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Multi-flame",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.7,
      "MaxM2": 1.2,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Multi-flame II",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1.5,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Multi-flame III",
      "Type": "mag",
      "Element": "Fire",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1.25,
      "MaxM2": 1.75,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Multi-flare",
      "Type": "mag",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.7,
      "MaxM2": 1.2,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Multi-frost",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.7,
      "MaxM2": 1.2,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Multi-frost II",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1.5,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Multi-frost III",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1.25,
      "MaxM2": 1.75,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Multi-shadow",
      "Type": "mag",
      "Element": "Dark",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.7,
      "MaxM2": 1.2,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Multi-spark",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.7,
      "MaxM2": 1.2,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Multi-spark II",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1.5,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Multi-spark III",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1.25,
      "MaxM2": 1.75,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Multi-tremor",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.7,
      "MaxM2": 1.2,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Multi-tremor II",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1.5,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Multi-tremor III",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1.25,
      "MaxM2": 1.75,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Nightmare",
      "Type": "mag",
      "Element": "Dark",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Nightmare II",
      "Type": "mag",
      "Element": "Dark",
      "Turns": 1,
      "M1": 1.8,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Omnistrike",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Omnistrike II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Omnistrike III",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Omnistrikes",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 1.1,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Omnistrikes II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.75,
      "MaxM2": 1.25,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Osmostrike",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1.1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Osmostrike II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Osmostrike III",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Osmostrikes",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 1.1,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Osmostrikes II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.75,
      "MaxM2": 1.25,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Perfect Shot",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 0.75,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Pierce",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Poisonstrike",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1.1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Pommel Strike",
      "Type": "atk",
      "Element": "Physical",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.1
    },
    {
      "SkillName": "Purify",
      "Type": "mag",
      "Element": "Holy",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Purify II",
      "Type": "mag",
      "Element": "Holy",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Purifying Strikes",
      "Type": "atk",
      "Element": "Holy",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.9,
      "MaxM2": 1.5,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Quadcut",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 1.1,
      "Strikes": 4,
      "CritRate": 0
    },
    {
      "SkillName": "Quadcut II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 1.3,
      "Strikes": 4,
      "CritRate": 0
    },
    {
      "SkillName": "Quake",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Quake III",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Quakestorm",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 2.4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Quakestorm II",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 2.7,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Quick attack",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 1.5,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Realm Strikes",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.75,
      "MaxM2": 1.25,
      "Strikes": 4,
      "CritRate": 0.2
    },
    {
      "SkillName": "Riposte",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1.4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Sacreseal",
      "Type": "mag",
      "Element": "Holy",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Sacreseal II",
      "Type": "mag",
      "Element": "Holy",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Sacrestrike",
      "Type": "atk",
      "Element": "Holy",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Sacrestrike II",
      "Type": "atk",
      "Element": "Holy",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Sap",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1.05,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Scorched Earth",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 2.4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Scorched Earth II",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 2.7,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Shadow",
      "Type": "mag",
      "Element": "Dark",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Shadow II",
      "Type": "mag",
      "Element": "Dark",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Shooting Star",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Slash",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Smite",
      "Type": "atk",
      "Element": "Holy",
      "Turns": 2,
      "M1": 1,
      "MinM2": 2.5,
      "MaxM2": 3.5,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Sorrow",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 3,
      "MaxM2": 3,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Sorrow II",
      "Type": "mag",
      "Element": "no",
      "Turns": 2,
      "M1": 1.5,
      "MinM2": 4.5,
      "MaxM2": 4.5,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Sorrow III",
      "Type": "mag",
      "Element": "no",
      "Turns": 3,
      "M1": 1.5,
      "MinM2": 3,
      "MaxM2": 3,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Sortie",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1.8,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.15
    },
    {
      "SkillName": "Spark",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 1.05,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Spark II",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Spark III",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Spark IV",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Spark V",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Spark VI",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 2.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Spellbreaker",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": null,
      "MinM2": null,
      "MaxM2": null,
      "Strikes": null,
      "CritRate": 0.05
    },
    {
      "SkillName": "Spiked Shield",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Spiked Shield II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Spiked Shield III",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Storm",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Storm II",
      "Type": "mag",
      "Element": "Lightning",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Summon Dead",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 3,
      "MaxM2": 3,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Summon Dead II",
      "Type": "mag",
      "Element": "no",
      "Turns": 2,
      "M1": 1.5,
      "MinM2": 4.5,
      "MaxM2": 4.5,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Supernova",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 2,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Swordplay",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.75,
      "MaxM2": 1.25,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Swordplay II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 1.25,
      "Strikes": 4,
      "CritRate": 0
    },
    {
      "SkillName": "Swordplay III",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.7,
      "MaxM2": 1.4,
      "Strikes": 4,
      "CritRate": 0
    },
    {
      "SkillName": "Terraseal",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Terraseal II",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Terrastrike",
      "Type": "atk",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Terrastrike II",
      "Type": "atk",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Tiamat's Breath",
      "Type": "mag",
      "Element": "Dragon",
      "Turns": 3,
      "M1": 1,
      "MinM2": 6,
      "MaxM2": 7,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Tidalseal",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Tidalseal II",
      "Type": "mag",
      "Element": "Water",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Tidalstrike",
      "Type": "atk",
      "Element": "Water",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Tidalstrike II",
      "Type": "atk",
      "Element": "Water",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Torchstrike",
      "Type": "atk",
      "Element": "Fire",
      "Turns": 1,
      "M1": 0.9,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Transference",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Transference II",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Transference III",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 2.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Tree Trunk",
      "Type": "atk",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 0.9,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.05
    },
    {
      "SkillName": "Tremor",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1.05,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Tremor II",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Tremor III",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1.3,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Tremor IV",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Tremor V",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Tremor VI",
      "Type": "mag",
      "Element": "Earthen",
      "Turns": 1,
      "M1": 2.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Tricut",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 1.1,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Tricut II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.7,
      "MaxM2": 1.2,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Ultima",
      "Type": "mag",
      "Element": "no",
      "Turns": 2,
      "M1": 4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.25
    },
    {
      "SkillName": "Ultima II",
      "Type": "mag",
      "Element": "no",
      "Turns": 3,
      "M1": 6,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0.25
    },
    {
      "SkillName": "Verse",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 1.6,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Verse II",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Verse III",
      "Type": "mag",
      "Element": "no",
      "Turns": 1,
      "M1": 2.4,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Viperseal",
      "Type": "mag",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Viperseal II",
      "Type": "mag",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Viperstrike",
      "Type": "atk",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Viperstrike II",
      "Type": "atk",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 2.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Volley",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.3,
      "MaxM2": 0.6,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Volley II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.55,
      "MaxM2": 1.1,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Volley III",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.8,
      "MaxM2": 1.6,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Ward of Light",
      "Type": "atk",
      "Element": "Holy",
      "Turns": 1,
      "M1": 1.2,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Ward of Light II",
      "Type": "atk",
      "Element": "Holy",
      "Turns": 1,
      "M1": 1.5,
      "MinM2": 1,
      "MaxM2": 1,
      "Strikes": 1,
      "CritRate": 0
    },
    {
      "SkillName": "Warrior's Dance",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 2,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "Warrior's Pavane",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.75,
      "MaxM2": 2.5,
      "Strikes": 4,
      "CritRate": 0
    },
    {
      "SkillName": "Wyvern Strikes",
      "Type": "atk",
      "Element": "Dragon",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 1.1,
      "Strikes": 4,
      "CritRate": 0
    },
    {
      "SkillName": "Wyvern's Wrath",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 1.1,
      "Strikes": 2,
      "CritRate": 0
    },
    {
      "SkillName": "Wyvern's Wrath II",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.5,
      "MaxM2": 1.1,
      "Strikes": 3,
      "CritRate": 0
    },
    {
      "SkillName": "X Slash",
      "Type": "atk",
      "Element": "no",
      "Turns": 1,
      "M1": 1,
      "MinM2": 0.75,
      "MaxM2": 1.25,
      "Strikes": 2,
      "CritRate": 0
    }
];