
import { get, derived, writable } from "svelte/store";
import fetch from 'node-fetch';
import {
  addMessages,
  locale,
  init,
  dictionary,
  _,
} from "svelte-i18n";
let _activeLocale;

// Internal store for tracking network
// loading state
const isDownloading = writable(false);
const MESSAGE_FILE_URL_TEMPLATE = "https://antanas79.github.io/sapper-template-2/lang/{locale}.json";


function setupI18n(options) {
    const { withLocale: locale_ } = options || 'lt';
    // Initialize svelte-i18n
    init({ initialLocale: locale_ });

  if (!hasLoadedLocale(locale_)) {

    const messagesFileUrl = 
    MESSAGE_FILE_URL_TEMPLATE.replace(
      "{locale}",
      locale_,
    );

    isDownloading.set(true);

    return loadJson(messagesFileUrl).then((messages) => {
      _activeLocale = locale_;
      addMessages(locale_, messages);
      locale.set(locale_);
      isDownloading.set(false);
    }).catch((err) => console.log(err));
  }
}
const isLocaleLoaded = derived(
  [isDownloading, dictionary],
  ([$isDownloading, $dictionary]) =>
    !$isDownloading &&
    $dictionary[_activeLocale] &&
    Object.keys($dictionary[_activeLocale]).length > 0,
);

function loadJson(url) {
    return fetch(url).then((response) => response.json()).catch((err) => console.log(err));
}

function hasLoadedLocale(locale) {
// If the svelte-i18n dictionary has an entry for the
// locale, then the locale has already been added
return get(dictionary)[locale];
}
export { _, setupI18n, isLocaleLoaded, locale };