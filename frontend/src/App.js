import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";
import { initLenis } from "@/lib/smooth";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BenefitStrip from "@/components/BenefitStrip";
import Products from "@/components/Products";
import CustomerStories from "@/components/CustomerStories";
import PetCalculator from "@/components/PetCalculator";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CategoryPage from "@/pages/CategoryPage";
import PurposePage from "@/pages/PurposePage";
import BlogPage from "@/pages/BlogPage";
import SubscriptionsPage from "@/pages/SubscriptionsPage";
import TransitionPage from "@/pages/TransitionPage";

function Home() { return <main><Hero /><BenefitStrip /><Products /><CustomerStories /><PetCalculator /><Newsletter /></main>; }
function Layout() { return <div className="min-h-screen overflow-x-clip bg-cream font-sans text-ink"><div className="grain" aria-hidden="true"/><AnnouncementBar/><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/nosso-proposito" element={<PurposePage/>}/><Route path="/produtos/:slug" element={<CategoryPage/>}/><Route path="/assinaturas" element={<SubscriptionsPage/>}/><Route path="/transicao-alimentar" element={<TransitionPage/>}/><Route path="/blog" element={<BlogPage/>}/></Routes><Footer/><CartDrawer/><WhatsAppFloat/><Toaster position="bottom-center" richColors closeButton/></div>; }

export default function App() {
  useEffect(() => { initLenis(); }, []);
  return <BrowserRouter><CartProvider><Layout/></CartProvider></BrowserRouter>;
}
