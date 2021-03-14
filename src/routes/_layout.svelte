<script>
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";
  // import { RingLoader } from '../../node_modules/svelte-loading-spinners/src/index';
  // import { RingLoader } from '../../node_modules/svelte-loading-spinners/src/index';

  export let segment;
 
  import { setupI18n, isLocaleLoaded } from "../services/i18n";
  setupI18n({ withLocale: "lt" });
</script>




  {#if $isLocaleLoaded}
    <Nav {segment} />
    <main>
      <div class="content-container main-content-container">
        <slot />
      </div>
    </main>
    <Footer />
  {:else}
    <div class="loader-container">
      <div>
        <!-- <RingLoader size="100" color="#FF3E00" unit="px" duration="5s"></RingLoader> -->
      </div>
    </div>
  {/if}
  


<style >
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .loader-container {
    width: 100vw;
    height: 100vh;
    z-index: 100000;
    background-color: white;
    display: flex;
    align-items:center;
    justify-content: center;
  }

  .loader-container div {
      margin: 0 auto;
      height: 100px;
      width: 100px;
    }

  :global(.content-container) {
    max-width: 1300px;
    width: 100%;
  }

  :global(.main-content-container) {
	margin-bottom: 50px;
  }

</style>
