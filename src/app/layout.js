import { Providers } from '../redux/provider';
import './globals.css'

import { Press_Start_2P } from "@next/font/google";
const press_start_2p = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: '--font-press_start_2p' });

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className={press_start_2p.className}><Providers>{children}</Providers></body>
        {/* <body><Providers>{children}</Providers></body> */}
      </html>
    );
  }