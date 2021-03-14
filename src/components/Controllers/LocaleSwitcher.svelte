<script>
  import { createEventDispatcher } from "svelte";
  import Select, {Option} from '@smui/select';
  let languages = ['lt', 'en', 'ru'];
  export let value = 'lt';
  import { _ } from "../../services/i18n";

  const dispatch = createEventDispatcher();

  function switchLocale(event) {
    dispatch("locale-changed", event);
  }
</script>

<div class="choose-locale">
  <div class="select">
    <Select
      bind:value={value}
      label="{$_('nav.localeSwitcher.language')}"
      anchor$class="select-width"
      menu$class="select-width"
    >
      {#each languages as language}
        <Option value={language} on:click={ () => { switchLocale(language) } }>{language}</Option>
      {/each}
    </Select>
  </div>
</div>


<style>
  .choose-locale {
    display: flex;
    justify-content: center;
  }
  .select {
    margin: 0 1rem 1rem;
    max-width: 55px;
  }

  :global(.mdc-select__selected-text)  {
    min-width: 0!important;
  }

  :global(.mdc-menu) {
      min-width: 0!important;
    }

  :global(.select-width) {
    max-width: 55px;
    width: 55px;
  }



</style>
