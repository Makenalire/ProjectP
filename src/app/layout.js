import { Providers } from '../redux/provider';
import './globals.css'
import { Press_Start_2P } from "next/font/google";
import SessionProvider from "../context/SessionProvider";

const press_start_2p = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: '--font-press_start_2p' });

export const metadata = {
    title : "Retro Number Cruncher",
    description : "A 24 game application",
    icons: {
        icon: '/icon.png'
    }
};

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className={press_start_2p.className}>
        <SessionProvider>
            <Providers>{children}</Providers>
        </SessionProvider>
        </body>
        {/* <body><Providers>{children}</Providers></body> */}
      </html>
    );
  }