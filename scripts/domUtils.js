let autoScroll = true;

function showLoadingScreen() {
    document.getElementById('loading-container').style.display = 'flex';
}

function hideLoadingScreen() {
    document.getElementById('loading-container').style.display = 'none';
}

function clearBuffer(numberOfLinesStartToEnd) {
    const mensajesDiv = document.getElementById('messages');
    while (mensajesDiv.childElementCount > numberOfLinesStartToEnd) {
        mensajesDiv.removeChild(mensajesDiv.firstChild);
    }
    console.log('Clear Buffer Message!');
}

function toggleAutoScroll(button) {
    autoScroll = !autoScroll;
    button.textContent = autoScroll ? 'Desactivar Auto-scroll' : 'Activar Auto-scroll';
    console.log(`Auto-scroll ${autoScroll ? 'enabled' : 'disabled'}.`);
}

function isAutoScrollEnabled() {
    return autoScroll;
}

// Function to load the language JSON file
function loadLanguageStrings(language) {
    switch (language) {
        case 'es':
            return loadStringsFromFile('es.json');
        case 'it':
            return loadStringsFromFile('it.json');
        case 'de':
            return loadStringsFromFile('de.json');
        default:
            return loadStringsFromFile('en.json');
    }
}

// Function to load the language JSON file
async function loadStringsFromFile(language) {
    try {
        const response = await fetch(`../res/${language}`);
        if (!response.ok) {
            throw new Error(`Could not load language file: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Success loading language strings!')
        return data;
    } catch (error) {
        console.error('Error loading language strings:', error);
        // Fallback to English if there is an error
        return await loadFallbackLanguageFromFile();
    }
}

// Function to load the fallback language JSON file (English in this case)
async function loadFallbackLanguageFromFile() {
    try {
        const response = await fetch(`../res/es.json`);
        if (!response.ok) {
            throw new Error(`Could not load fallback language file: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading fallback language strings from file:', error);
        return {};
    }
}

/**
 * Replaces placeholders in a string with values from a replacements object.
 * @param {string} template - The string containing placeholders.
 * @param {Object} replacements - An object with keys corresponding to placeholder names.
 * @returns {string} - The resulting string with placeholders replaced.
 */
function replacePlaceholders(template, replacements) {
    return template.replace(/{{(\w+)}}/g, (match, key) => {
        return typeof replacements[key] !== 'undefined' ? replacements[key] : match;
    });
}