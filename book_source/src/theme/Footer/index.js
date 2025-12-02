import BrowserOnly from '@docusaurus/BrowserOnly';
import { Footer } from '@site/src/components/footer';


export default function NavbarWrapper() {
  return (
    <BrowserOnly fallback={<div>Loading Footer...</div>}>
      {() => <div>
        <Footer />
      </div>}
    </BrowserOnly>
  );
}