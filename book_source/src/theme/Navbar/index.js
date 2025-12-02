import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Navbar } from '@site/src/components/navbar';

export default function NavbarWrapper() {
  return (
    <BrowserOnly fallback={<div>Loading Navbar...</div>}>
      {() => <div>
        <Navbar />
      </div>}
    </BrowserOnly>
  );
}