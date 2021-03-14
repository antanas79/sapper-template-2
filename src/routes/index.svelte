<script>
  import svarainiai from "images/svarainiai2.jpg";
  import { _ } from "../services/i18n";
</script>

<svelte:head>
  <title>{$_('Index.Title')}</title>
</svelte:head>

<h1>{$_('Index.H1')}</h1>
<p>{$_('Index.P1')}</p>


<figure>
  <img alt="{$_('Index.P1')}" src={svarainiai} />
</figure>


<style>
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }


</style>
