const base_url = "https://www.9thbuilder.com";
let armies = null
let army_icon = ""
let army_organization = []
let text_shuffler
let main_list

export function cardGenerator() {
  main_list = document.querySelector('.army-list')
  document.documentElement.style.setProperty('--army-color', "#2F394C")
  main_list.setAttribute('data-theme', lightOrDark('#2F394C'))

  // Add listeners to main select-elements
  setupVersionSelectListener()
  setupArmySelectListener()
  setupSubversionListener()
  // Global options
  colorListener()
  imageUploadListener()
  mixBlendListener()
  globalImagePosListener()
  globalTransparencyListener()
  globalToggleListener()
  // Option overrides per card
  cardOptionListeners()
}

async function setupVersionSelectListener() {
  const versionSelect = document.querySelector('#version-select');
  versionSelect.addEventListener('change', async (ev) => {
    main_list
    try {
      armies = null
      armies = await get_armies_by_version(ev.target.value);
      armies = sortBySource(armies)
      populateArmySelect(armies);
    } catch (error) {
      console.error("Error fetching armies:", error);
    }
  });
}
// When selected, will populate army-rules dropdown with data
function setupArmySelectListener() {
  const armySelect = document.querySelector('#army-select')
  const subVersionSelect = document.querySelector('#army-sub-version-select')

  armySelect.addEventListener('change', () => {
    main_list.innerHTML = ""
    const styleSettings = document.querySelector('.generator-settings__styles')
    styleSettings.classList.add('generator-settings__styles--hidden')

    const selectedArmyName = armySelect.value;
    let matchingArmies = armies.filter(army => army.name === selectedArmyName)

    // Sort by updated_at in descending order (most recent first)
    matchingArmies.sort((a, b) => b.released_at - a.released_at)

    // Store the placeholder option
    const placeholder = subVersionSelect.querySelector('option[disabled][selected]')

    // Remove all options except the placeholder
    subVersionSelect.innerHTML = ''
    if (placeholder) {
      subVersionSelect.appendChild(placeholder)
      placeholder.selected = true
    }

    // Append sorted sub-version options using `name_with_sub_version`
    matchingArmies.forEach(army => {
      const option = document.createElement('option')
      option.value = army.id
      option.textContent = army.name_with_sub_version
      option.setAttribute('data-updated_at', army.updated_at)
      option.setAttribute('data-released_at', army.released_at)
      subVersionSelect.appendChild(option)
    });
  });
}

// Populates the "Army" dropdown with data
function populateArmySelect(armies) {
  const armySelect = document.querySelector('#army-select');

  // Store the placeholder option
  const placeholder = armySelect.querySelector('option[disabled][selected]');

  // Remove all options except the placeholder
  armySelect.innerHTML = '';
  if (placeholder) {
    armySelect.appendChild(placeholder)
    placeholder.selected = true
  }

  // Create a map of unique armies (name as key, id as value)
  const uniqueArmies = new Map();
  armies.forEach(army => {
    if (!uniqueArmies.has(army.name)) {
      uniqueArmies.set(army.name, army.id);
    }
  });

  // Append options
  uniqueArmies.forEach((id, name) => {
    const option = document.createElement('option');

    option.value = name;
    option.textContent = name;
    armySelect.appendChild(option);
  });
}

// When selected, will fetch profile data
function setupSubversionListener() {
  const select = document.querySelector("#army-sub-version-select");

  document.addEventListener('change', async (ev) => {
    if (ev.target == select) {
      const styleSettings = document.querySelector('.generator-settings__styles')
      styleSettings.classList.add('generator-settings__styles--hidden')
      startLoader()
      document.querySelector('#army-list').innerHTML = ""
      const armyId = select.value;
      let armyMeta = await get_meta(armyId);
      let units = await get_army(armyId);
      hideLoader()
      styleSettings.classList.remove('generator-settings__styles--hidden')
      outputUnits(units)
      regeneratePrintList()
    }
  });
}

/** Global options **/
function colorListener() {
  const picker = document.querySelector('input[type="color"]')
  const root = document.documentElement
  picker.addEventListener('change', () => {
    root.style.setProperty('--army-color', picker.value)
    document.querySelector('.army-list').setAttribute('data-theme', lightOrDark(picker.value))
  })
}

function globalImagePosListener() {
  const container = document.querySelector('.global__image-position')
  container.addEventListener('change', (ev) => {
    const cards = document.querySelectorAll('.unit-card')
    if (!cards) return
    if (ev.target.id === 'global-image-x') {
      cards.forEach(card => {
        card.querySelector('.unit-card__inner').style.backgroundPositionX = ev.target.value + "%"
        card.querySelector('.bg-pos-x').value = ev.target.value
      })
    }
    if (ev.target.id === 'global-image-y') {
      cards.forEach(card => {
        card.querySelector('.unit-card__inner').style.backgroundPositionY = ev.target.value + "%"
        card.querySelector('.bg-pos-y').value = ev.target.value
      })
    }
  })

}

function mixBlendListener() {
  const input = document.querySelector('#mix-image-toggle')
  input.addEventListener('change', () => {
    const cards = document.querySelectorAll('.unit-card')
    if (!cards) return
    if (input.checked) {
      cards.forEach(card => {
        card.querySelector('.unit-card__inner').style.backgroundBlendMode = "multiply"
        card.querySelector('.mix-background').checked = true
      })
    } else {
      cards.forEach(card => {
        card.querySelector('.unit-card__inner').style.backgroundBlendMode = "unset"
        card.querySelector('.mix-background').checked = false
      })
    }
  })
}

function imageUploadListener() {
  document.addEventListener('change', (ev) => {
    if (ev.target.getAttribute('type') === 'file') {
      const input = ev.target
      const file = ev.target.files[0];
      if (file) {
        const image = new Image()
        const reader = new FileReader()
        reader.onload = (e) => {
          if (ev.target.id === 'default-image') {
            const cards = document.querySelectorAll('.unit-card')
            if (cards) {
              cards.forEach(card => {
                card.querySelector('.unit-card__inner').style.backgroundImage = `url(${e.target.result})`
              })
            }
          } else {
            ev.target.closest('.unit-card').querySelector('.unit-card__inner').style.backgroundImage = `url(${e.target.result})`;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  })
}

function globalTransparencyListener() {
  const checkbox = document.querySelector('#global-transparency-toggle')
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      document.documentElement.style.setProperty('--opacity', "50%")
    } else {
      document.documentElement.style.setProperty('--opacity', "0%")
    }
  })
}

// Options per card
function cardOptionListeners() {
  const list = document.querySelector('#army-list')
  list.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('remove-image-button')) {
      ev.target.closest('.unit-card').querySelector('.unit-card__inner').removeAttribute('style')
      ev.target.previousElementSibling.value = null
    }
  })
  list.addEventListener('change', (ev) => {
    const card = ev.target.closest('.unit-card__options').previousElementSibling
    if (ev.target.classList.contains('bg-pos-x')) {
      card.style.backgroundPositionX = ev.target.value + "%"
    }
    if (ev.target.classList.contains('bg-pos-y')) {
      card.style.backgroundPositionY = ev.target.value + "%"
    }

    if (ev.target.classList.contains('mix-background')) {
      if (ev.target.checked) {
        card.style.backgroundBlendMode = "multiply"
      } else {
        card.style.backgroundBlendMode = "unset"
      }
    }

    if (ev.target.classList.contains('unit-card__include-option')) {
      const parent = card.closest('.unit-card')
      if (ev.target.checked) {
        parent.classList.add('unit-card--visible')
      } else {
        parent.classList.remove('unit-card--visible')
      }
      regeneratePrintList()
    }
  })
}

function globalToggleListener() {
  let checkbox = document.querySelector('#global-include-option')
  checkbox.addEventListener('change', () => {
    const cards = document.querySelectorAll('.unit-card')
    if (checkbox.checked) {
      cards.forEach(card => {
        card.classList.remove('unit-card--visible')
        const option = card.querySelector('.unit-card__include-option')
        option.checked = false
      })
    } else {
      cards.forEach(card => {
        card.classList.add('unit-card--visible')
        const option = card.querySelector('.unit-card__include-option')
        option.checked = true
      })
    }
    regeneratePrintList()
  })
}

function regeneratePrintList() {
  const list = document.querySelector('.print-list')
  list.innerHTML = ""
  const visibleCards = document.querySelectorAll('.unit-card--visible')
  const clones = [...visibleCards].map(card => card.cloneNode(true)); // Clone each card
  list.append(...clones); // Append all clones at once
}

function startLoader() {
  const loader = document.querySelector(".loader")
  loader.classList.remove('loader--hidden')
  loaderTextRandomizer()
}

function hideLoader() {
  const loader = document.querySelector('.loader')
  loader.classList.add('loader--hidden')
  clearInterval(text_shuffler)
}

function outputUnits(units) {
  const container = document.querySelector('#army-list')
  container.innerHTML = ""
  const template = document.querySelector('#unit-card')
  let first = true
  units.forEach(unit => {
    let clone = template.content.cloneNode(true)
    const category = army_organization.find(item => item.id === unit.principal_organisation_id)
    if (category) {
      let category_name = category.name
      if (category_name == "Characters") {
        category_name = "Character"
      }
      clone.querySelector(".unit-card__category").innerHTML = "<p>" + category_name + "</p>"
    }

    clone.querySelector('.unit-card__name').innerHTML = unit.name
    clone.querySelector('.unit-card__size').innerHTML = unit.carac.height.name
    clone.querySelector('.unit-card__base').innerHTML = unit.carac.base.name + (unit.carac.base.name != 'See mount' ? "mm" : '')

    clone.querySelector('.unit-card__charge').innerHTML = replaceAsCharacter(unit.carac.adv) + (replaceAsCharacter(unit.carac.adv) != 'mount' ? "\"" : '')
    clone.querySelector('.unit-card__mobility').innerHTML = replaceAsCharacter(unit.carac.mar) + (replaceAsCharacter(unit.carac.mar) != 'mount' ? "\"" : '');
    clone.querySelector('.unit-card__discipline').innerHTML = replaceAsCharacter(unit.carac.dis);
    clone.querySelector('.unit-card__health-points').innerHTML = replaceAsCharacter(unit.carac.hp);
    clone.querySelector('.unit-card__defense').innerHTML = replaceAsCharacter(unit.carac.def);
    clone.querySelector('.unit-card__resilience').innerHTML = replaceAsCharacter(unit.carac.res);
    clone.querySelector('.unit-card__armour').innerHTML = replaceAsCharacter(unit.carac.arm);
    // clone.querySelector('.unit-card__aegis').innerHTML = replaceAsCharacter(unit.carac.aeg);
    if (unit.troops) {
      unit.troops.forEach((troop, index) => {
        let container = clone.querySelector('.unit-card__troop-container'); // Find the container

        if (index === 0) {
          // First troop: Populate the existing elements
          container.querySelector('.unit-card__troop').setAttribute('data-troop-id', troop.id)
          container.querySelector('.unit-card__troop-name').innerHTML = troop.name ?? '/';
          container.querySelector('.unit-card__troop-attacks').innerHTML = replaceAsCharacter(troop.carac.att) ?? '/';
          container.querySelector('.unit-card__troop-offensive-skill').innerHTML = replaceAsCharacter(troop.carac.of) ?? '/';
          container.querySelector('.unit-card__troop-strength').innerHTML = replaceAsCharacter(troop.carac.str) ?? '/';
          container.querySelector('.unit-card__troop-armour-piercing').innerHTML = replaceAsCharacter(troop.carac.ap) ?? '/';
          container.querySelector('.unit-card__troop-agility').innerHTML = replaceAsCharacter(troop.carac.agi) ?? '/';
        } else {
          const newRow = container.querySelector('.unit-card__troop').cloneNode(true)

          // Update the content for each cloned stat block
          newRow.setAttribute('data-troop-id', troop.id)
          newRow.querySelector('.unit-card__troop-name').innerHTML = troop.name ?? '/';
          newRow.querySelector('.unit-card__troop-attacks').innerHTML = replaceAsCharacter(troop.carac.att) ?? '/';
          newRow.querySelector('.unit-card__troop-offensive-skill').innerHTML = replaceAsCharacter(troop.carac.of) ?? '/';
          newRow.querySelector('.unit-card__troop-strength').innerHTML = replaceAsCharacter(troop.carac.str) ?? '/';
          newRow.querySelector('.unit-card__troop-armour-piercing').innerHTML = replaceAsCharacter(troop.carac.ap) ?? '/';
          newRow.querySelector('.unit-card__troop-agility').innerHTML = replaceAsCharacter(troop.carac.agi) ?? '/';

          // Append in the correct order
          container.appendChild(newRow);
        }
      })
    }

    if (army_icon) {
      clone.querySelector('.unit-card__icon img').src = base_url + army_icon
    }

    unit.model_rule_unit_troops.forEach(rule => {
      if (rule.type_lvl === 'Global') {
        const globalRulesElement = clone.querySelector('.unit-card__global-rules')
        globalRulesElement.insertAdjacentHTML('beforeend', "<span>" + rule.name + "</span>")
      }
      if (rule.type_lvl === 'Defensive') {
        const defensiveRulesElement = clone.querySelector('.unit-card__defensive-rules')
        defensiveRulesElement.insertAdjacentHTML('beforeend', "<span>" + rule.name + "</span>")
      }
      if (rule.type_lvl === 'Offensive') {
        const offensiveRulesElement = clone.querySelector(`.unit-card__troop[data-troop-id="${rule.troop_id}"] .unit-card__troop-offensive-rules`)
        if (offensiveRulesElement) {
          offensiveRulesElement.insertAdjacentHTML('beforeend', "<span>" + rule.name + "</span>")
        }
      }
    })
    container.appendChild(clone)
  })
}

/** API-methods **/
async function get_meta(armyId) {
  const armyQuery = await fetch(`${base_url}/en/api/v1/ninth_age/armies/${armyId}.json`);
  if (!armyQuery.ok) {
    throw new Error("Failed to fetch army data");
  }
  const armyData = await armyQuery.json();

  const organizationQuery = await fetch(`${base_url}/en/api/v1/ninth_age/army-${armyId}/organisations/all`)
  if (!organizationQuery.ok) {
    throw new Error("Failed to fetch army organization")
  }

  army_organization = await organizationQuery.json();
  army_icon = armyData.medium_logo
  return armyData;
}

async function get_army(id) {
  // Simulate a fetch request, replace with actual fetch logic
  const response = await fetch(`${base_url}/en/api/v1/ninth_age/army-${id}/units/full`);
  if (!response.ok) {
    throw new Error("Failed to fetch army data");
  }
  const armyData = await response.json();
  return armyData;
}

async function get_armies_by_version(version_id) {
  const query = `/en/api/v1/ninth_age/version-${version_id}/armies/full.json`;
  const response = await fetch(base_url + query);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

/** Helpers **/
function sortBySource(armies) {
  const order = { "Official": 0, "Supplement": 1, "FanMade": 2 };

  return armies.sort((a, b) => {
    return (order[a.source] ?? 99) - (order[b.source] ?? 99);
  });
}

function lightOrDark(bg_color) {
  const lumen = calculateLumen(bg_color)
  if (lumen >= 128) {
    return "light"
  }
  if (lumen < 128) {
    return "dark"
  }
}

function calculateLumen(bg_color) {
  const rgb = hexToRGB(bg_color)
  return 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]
}

function hexToRGB(hex) {
  hex = hex.substring(1) // remove octothorpe
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4), 16);
  return [r, g, b];
}

function replaceAsCharacter(value) {
  if (typeof value !== 'string') return
  // Define replacements for LaTeX-macros
  if (value.includes('\\ascharacter{}')) {
    return value.replace('\\ascharacter{}', 'C')
  }
  if (value.includes('\\starsymbol{}')) {
    return value.replace('\\starsymbol{}', '*')
  }
  if (value.includes(',')) {
    return " "
  }
  if (value.includes('\\seemount{}')) {
    return "mount"
  }
  if (value.includes('\\newrule')) {
    const match = value.match(/\\newrule\{([0-9]|10)\}/);
    return match[1]
  }
  if (value.includes('\\XDsix')) {
    const match = value.match(/\\XDsix\{([0-9]|10)\}/);
    return match[1] + "D6"
  }
  if (value.includes('\\XDthree')) {
    const match = value.match(/\\XDthree\{([0-9]|10)\}/);
    return match[1] + "D3"
  }
  if (value.includes('\\Dsix{}')) {
    return "D6"
  }
  if (value.includes('\\frenchsmallcharacs')) {
    value = value.replace('\\Dthree{}', 'D3')
    value = value.replace('\\Dsix{}', 'D6')
    value = value.replace('\\frenchsmallcharacs{', '')
    value = value.substring(0, value.length - 1)
    return value
  }

    // If nothing is set, simply return the original value
    return value;

}

function loaderTextRandomizer() {
  const list = document.querySelector('.loader__statements');
  if (!list) return;

  const active = list.querySelector('.active')
  if (active) {
    active.classList.remove('active')
  }

  const elements = Array.from(list.children);
  let shuffledList = shuffleArray([...elements]);
  let index = 0;
  shuffledList[0].classList.add('active')
  text_shuffler = setInterval(() => {
    const activeElement = list.querySelector('.active');
    if (activeElement) {
      activeElement.classList.remove('active');
    }

    shuffledList[index].classList.add('active');

    index++;

    // If we've shown all, reshuffle and restart
    if (index >= shuffledList.length) {
      shuffledList = shuffleArray([...elements]); // Reshuffle
      index = 0;
    }
  }, 4000);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}