<link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap" rel="stylesheet">;
<script>
    import "../app.css";
    import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
  </script>

  <div class="">
    <slot class="bg-primary-50"></slot>
  </div>
    
    <Footer class="mt-auto bg-primary-100 w-full absolute bottom-0">
      <FooterCopyright href="/" by="WebHarvest™" year={2023} />
      <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-white sm:mt-0">
        <FooterLink href="/">About</FooterLink>
        <FooterLink href="/">Privacy Policy</FooterLink>
        <FooterLink href="/">Licensing</FooterLink>
        <FooterLink href="/">Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>

    
