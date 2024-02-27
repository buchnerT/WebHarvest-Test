<link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap" rel="stylesheet">
<script>
    import "../app.css"
    import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte'
  </script>

  <div class="spacer layer">
    <slot></slot>
  </div>
  
  <div class="overlay" /> 

  <slot />
  
    <Footer class="mt-auto bg-primary-100 w-full absolute bottom-0 z-index-0">
      <FooterCopyright href="/" by="WebHarvest™" year={2023} />
      <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-white sm:mt-0">
        <FooterLink href="/">About</FooterLink>
        <FooterLink href="/">Privacy Policy</FooterLink>
        <FooterLink href="/">Licensing</FooterLink>
        <FooterLink href="/">Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>

    <style>

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%; 
        height: 100%; 
        background-color: #1a1a1d; /* Placeholder color */
        opacity: 0;  /* Initially hidden */
        z-index: 9999; /* High z-index to stay on top */
        transition: opacity 0.5s ease-in-out; /* Add a smooth transition */
    }

    .overlay.active {
        opacity: 1; /* Make it visible when active  */
    }

      .spacer {
         width: 100%;     
         background-size: cover; 
      }
     
      .layer {
         aspect-ratio: 900/540; 
         background-image: url('./background.svg');
         background-repeat: no-repeat;
         background-position: center;
      }

      /* Media Query for Mobile */
      @media (max-width: 768px) {
          .layer {
              aspect-ratio: 540/900;
              background-image: url('./background_mobile.svg'); 
          }
      }
     </style> 
