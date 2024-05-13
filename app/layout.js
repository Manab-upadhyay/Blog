import './globals.css';
import NavbarDemo from './navbar';
import { StickyScroll } from './componets/scrool';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
   
      <body >
      <ToastContainer theme='dark' autoClose={5000} />
     
     <NavbarDemo></NavbarDemo>
        
        {children}</body>
    </html>
  );
}