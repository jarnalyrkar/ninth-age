const base_url = "https://www.9thbuilder.com";
let army_icon = ""
let army_organization = []

export function cardGenerator() {
  const versionSelect = document.querySelector('#version-select');

  colorListener()
  versionSelect.addEventListener('change', async (ev) => {
    try {
      let armies = await get_armies_by_version(ev.target.value);
      armies = sortBySource(armies);
      populateArmySelect(armies);
      setupArmySelectListener(armies);
      await setupSubversionListener()
    } catch (error) {
      console.error("Error fetching armies:", error);
    }
  });
}

function imageUploadListener() {
  const fileInputs = document.querySelectorAll('#army-list .unit-card [type="file"]')
  fileInputs.forEach(input => {
    input.addEventListener('change', (ev) => {
      const file = ev.target.files[0];
      if (file) {
        const image = new Image()
        const reader = new FileReader()
        reader.onload = (e) => {
          ev.target.closest('.unit-card').querySelector('.unit-card__inner').style.backgroundImage = `url(${e.target.result})`;
          input.parentElement.querySelector('.bg-pos-tools').classList.remove('hidden')
        };
        reader.readAsDataURL(file);
        input.nextElementSibling.classList.remove('hidden')
      }
    })
  })
}

function colorListener() {
  const picker = document.querySelector('input[type="color"]')
  const root = document.documentElement
  picker.addEventListener('change', () => {
    root.style.setProperty('--army-color', picker.value)
    document.querySelector('.army-list').setAttribute('data-theme', lightOrDark(picker.value))
  })
}

async function setupSubversionListener() {
  const select = document.querySelector("#army-sub-version-select");

  select.addEventListener('change', async () => {
    const armyId = select.value;
    let armyMeta = await get_meta(armyId);
    let units = await get_army(armyId);
    outputUnits(units)
    imageUploadListener()
    clearImageListener()
  });
}

function clearImageListener() {
  const list = document.querySelector('#army-list')
  list.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('remove-image-button')) {
      ev.target.closest('.unit-card').querySelector('.unit-card__inner').removeAttribute('style')
      ev.target.previousElementSibling.value = null
      ev.target.classList.add('hidden')
      ev.target.nextElementSibling.classList.add('hidden')
    }
  })
  list.addEventListener('change', (ev) => {
    if (ev.target.classList.contains('bg-pos-x')) {
      ev.target.closest('.unit-card__options').previousElementSibling.style.backgroundPositionX = ev.target.value + "%"
    }
    if (ev.target.classList.contains('bg-pos-y')) {
      ev.target.closest('.unit-card__options').previousElementSibling.style.backgroundPositionY = ev.target.value + "%"
    }
  })
}

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

function outputUnits(units) {
  const container = document.querySelector('#army-list')
  container.innerHTML = ""
  const template = document.querySelector('#unit-card')
  let first = true
  units.forEach(unit => {
    let clone = template.content.cloneNode(true)
    const category = army_organization.find(item => item.id === unit.principal_organisation_id)
    if (category) {
      clone.querySelector(".unit-card__category").innerHTML = "<p>" + category.name + "</p>"
    }

    clone.querySelector('.unit-card__name').innerHTML = unit.name
    if (unit.name.length > 14) {
      clone.querySelector('.unit-card__name').classList.add('long-name')
    }
    clone.querySelector('.unit-card__size').innerHTML = unit.troops[0].carac.size
    clone.querySelector('.unit-card__base').innerHTML = unit.carac.base.name + "mm"

    clone.querySelector('.unit-card__charge').innerHTML = unit.carac.mar ?? '/'
    clone.querySelector('.unit-card__advance').innerHTML = unit.carac.adv ?? '/'
    clone.querySelector('.unit-card__courage').innerHTML = unit.carac.dis ?? '/'
    clone.querySelector('.unit-card__health-points').innerHTML = unit.carac.hp ?? '/'
    clone.querySelector('.unit-card__defense').innerHTML = unit.carac.def ?? '/'
    clone.querySelector('.unit-card__resiliance').innerHTML = unit.carac.res ?? '/'
    clone.querySelector('.unit-card__armour').innerHTML = unit.carac.arm ?? '/'
    clone.querySelector('.unit-card__attacks').innerHTML = unit.troops[0].carac.att ?? '/'
    clone.querySelector('.unit-card__offensive-skill').innerHTML = unit.troops[0].carac.of ?? '/'
    clone.querySelector('.unit-card__strength').innerHTML = unit.troops[0].carac.str ?? '/'
    clone.querySelector('.unit-card__armour-piercing').innerHTML = unit.troops[0].carac.ap ?? '/'
    clone.querySelector('.unit-card__agility').innerHTML = unit.troops[0].carac.agi ?? '/'

    if (army_icon) {
      clone.querySelector('.unit-card__icon img').src = base_url + army_icon
    }

    const specialRules = clone.querySelector('.unit-card__special-rules')
    const longRules = []
    const shortRules = []

    let specialRuleString = ""
    let first = true
    unit.model_rule_unit_troops.forEach(rule => {
      if (!first) {
        specialRuleString += ", "
      }

      specialRuleString += rule.name
      first = false
    })
    specialRules.innerHTML = specialRuleString
    container.appendChild(clone)
  })
}

async function get_army(id) {
  // Simulate a fetch request, replace with actual fetch logic
  const response = await fetch(`${base_url}/en/api/v1/ninth_age/army-${id}/units/full`);
  if (!response.ok) {
    throw new Error("Failed to fetch army data");
  }
  const armyData = await response.json();
  console.log(armyData)
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

function sortBySource(armies) {
  const order = { "Official": 0, "Supplement": 1, "FanMade": 2 };

  return armies.sort((a, b) => {
    return (order[a.source] ?? 99) - (order[b.source] ?? 99);
  });
}

function populateArmySelect(armies) {
  const armySelect = document.querySelector('#army-select');

  // Store the placeholder option
  const placeholder = armySelect.querySelector('option[disabled][selected]');

  // Remove all options except the placeholder
  armySelect.innerHTML = '';
  if (placeholder) armySelect.appendChild(placeholder);

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

function setupArmySelectListener(armies) {
  const armySelect = document.querySelector('#army-select');
  const subVersionSelect = document.querySelector('#army-sub-version-select');

  armySelect.addEventListener('change', () => {
    const selectedArmyName = armySelect.value;
    let matchingArmies = armies.filter(army => army.name === selectedArmyName);

    // Sort by updated_at in descending order (most recent first)
    matchingArmies.sort((a, b) => b.id > a.id);

    // Store the placeholder option
    const placeholder = subVersionSelect.querySelector('option[disabled][selected]');

    // Remove all options except the placeholder
    subVersionSelect.innerHTML = '';
    if (placeholder) subVersionSelect.appendChild(placeholder);

    // Append sorted sub-version options using `name_with_sub_version`
    matchingArmies.forEach(army => {
      const option = document.createElement('option');
      option.value = army.id;
      option.textContent = army.name_with_sub_version; // Using name_with_sub_version instead of source
      subVersionSelect.appendChild(option);
    });
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