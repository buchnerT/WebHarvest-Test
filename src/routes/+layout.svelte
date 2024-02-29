<link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap" rel="stylesheet">
<script>
    import "../app.css"
    import { fade } from 'svelte/transition';
    import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte'
    import { isLoading } from "../lib/client-side/loadingStore"
  </script>

  <body>
    <div class="spacer layer">
      <slot></slot>
    </div>
  
      <Footer class="mt-auto bg-primary-100 w-full absolute bottom-0 z-index-0">
        <FooterCopyright href="/" by="WebHarvest™" year={2023} />
        <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-white sm:mt-0">
          <FooterLink href="/">About</FooterLink>
          <FooterLink href="/">Privacy Policy</FooterLink>
          <FooterLink href="/">Licensing</FooterLink>
          <FooterLink href="/">Contact</FooterLink>
        </FooterLinkGroup>
      </Footer>
      <div class="overlay" in:fade="{{ duration: 300 }}" class:active={$isLoading} />
  </body>
  
    <style>

      .overlay {
        position: relative;
        top: 0;
        left: 0;
        width: 100%; 
        height: 100%; 
        background-color: #1a1a1d;
        opacity: 0; 
        z-index: 0; 
        transition: opacity 0.5s ease-in-out; 
      }

      .overlay.active {
        opacity: 1;
        z-index: 9999; 
      }

      .spacer {
         width: 100%;     
         background-size: cover; 
      }
     
      .layer {
         aspect-ratio: 900/540; 
         background-image: url('../lib/client-side/background.svg');
         background-repeat: no-repeat;
         background-position: center;
      }

      /* Media Query for Mobile */
      @media (max-width: 768px) {
          .layer {
              aspect-ratio: 540/900;
              background-image: url('../lib/client-side/background_mobile.svg'); 
          }
      }
     </style> 
