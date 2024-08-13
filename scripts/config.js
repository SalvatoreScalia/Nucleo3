const configStrings = {}; //promesa

const Strings = (function() { 
    async function loadConfigStrings() {
        console.log('Loading config.json ...');
        try {
            const response = await fetch("../res/config.json");
            if (!response.ok) {
                throw new Error(`Could not load setup.json file: ${response.statusText}`);
            }
            const data = await response.json(); // Lee el cuerpo una vez
            Object.assign(configStrings, data); // Usa la variable `data`
            console.log('config.json loaded.')
            return data;
        } catch (error) {
            console.error('Error loading config strings:', error);
            // Fallback to English if there is an error
            //return await loadFallbackLanguageStrings();
        }
    }
    return {
        loadConfigStrings: loadConfigStrings
    }
})();

Strings.loadConfigStrings();