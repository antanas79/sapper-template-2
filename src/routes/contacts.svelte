<script>
  import { _ } from "../services/i18n";
</script>

<svelte:head>
  <title>{$_('Contacts.Title')}</title>
</svelte:head>

<h1>{$_('Contacts.H1')}</h1>


<p>{$_('Contacts.P1')} <a href="callto:{$_('footer.phone')}">{$_('footer.phoneToAppear')} </a></p>

<p>{$_('Contacts.P2')} <a href="mailto:{$_('footer.email')} ">{$_('footer.email')} </a> </p>


