<script>
  // export let segment;
  import { _, locale, setupI18n } from "../services/i18n";
  let year = new Date().getFullYear();
</script>

<footer>
  <div class="content-container">
    <div class="copyright">
      &#169; {year}
    </div>
    <div class="footer-contacts">
      <a href="mailto:{$_('footer.email')} ">{$_('footer.email')} </a>
      <a href="callto:{$_('footer.phone')}">{$_('footer.phoneToAppear')}</a>
    </div>
    <div>
      
    </div>
    
    <!-- {segment} -->
    <!-- {$_("footer.contacts")} -->
  </div>



</footer>

<style>
  footer {
    font-weight: 300;
    padding: 0 1em;
    position: fixed;
    bottom: 0px;
    height: 50px;
    border-top: 1px solid rgba(255, 62, 0, 0.1);
    width: calc(100% - 2em);
    z-index: 1000;
    background: white;
    display: flex;
    justify-content:center;
    align-items:center;
  }

  .copyright {
    display: flex;
    align-items:center;
  }
  .content-container {
    display: flex;
  }

  .footer-contacts {
    display: flex;
    align-items: center;
  }

  .footer-contacts a, .copyright {
      font-size: 16px;
      padding: 15px;
  }

  @media (max-width: 400px) {
    .footer-contacts a, .copyright {
      font-size: 12px;
      padding: 1em 0.5em;
    }

  } 
</style>
