"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Button from "./Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Layanan", href: "/#layanan" },
  { label: "Portofolio", href: "/#portofolio" },
  { label: "Tentang", href: "/#tentang" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled
            ? "bg-[#232323] backdrop-blur-md border-b border-[var(--border-light)] shadow-sm"
            : "bg-white/95"
          }`}
        >


      {/* <header
        className={"fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-[var(--border-light)] shadow-sm"}
      > */}
      {/* <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[var(--border-light)] shadow-sm"
            : "bg-transparent"
          }`}
      > */}

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="REACreative.idn — Home">
            <span className={`text-xl font-bold tracking-tight text-[var-(--text)] ${scrolled 
              ? "text-[var(--text-inv)]"
              : "text-[var(--text)]"
            }`}>
              REA<span className="text-brand">CREATIVE</span>
              <span className={`font-normal ${scrolled
                ? "text-[var(--text-inv)]"
                : "text-[var(--text-muted)]"
              }`}>.idn</span>
            </span>
          </Link>
          
          {/* <Link href="/" className="flex-shrink-0" aria-label="REACreative.idn — Home">
            <span className="text-xl font-bold tracking-tight text-[var(--text)]">
              REA<span className="text-brand">CREATIVE</span>
              <span className="text-[var(--text-muted)] font-normal">.idn</span>
            </span>
          </Link> */}

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`nav-link text-sm font-medium  transition-colors duration-200 ${scrolled 
                  ? "text-[var(--text-inv-subtle)] hover:text-[var(--text-inv)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant={scrolled ? "ghost-dark" : "ghost"}
              href="/qr-generator"
              id="nav-qr-generator"
            >
              QR Generator
            </Button>
            <Button
              variant="filled"
              href="https://wa.me/6281234567890?text=Halo%20REACreative%2C%20saya%20ingin%20konsultasi%20gratis"
              id="nav-konsultasi-gratis"
              target="_blank"
              rel="noopener noreferrer"
            >
              Konsultasi Gratis
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`lg:hidden p-2 rounded-md transition-colors ${
              scrolled
                ? "text-white hover:bg-white/10"
                : "text-[var(--text)] hover:bg-[var(--bg-alt)]"
            }`}
            onClick={() => setDrawerOpen(true)}
            aria-label="Buka menu navigasi"
            id="nav-hamburger"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-[300px] z-50 bg-[var(--support)] flex flex-col transition-transform duration-300 ease-out lg:hidden ${drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        aria-label="Mobile navigation menu"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--border-dark)]">
          <span className="text-lg font-bold text-white">
            REA<span className="text-brand">CREATIVE</span>
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex flex-col px-6 py-8 gap-1 flex-1" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-md font-medium transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="px-6 pb-8 flex flex-col gap-3">
          <Button
            variant="ghost-dark"
            href="/qr-generator"
            className="w-full justify-center"
            id="drawer-qr-generator"
          >
            QR Generator
          </Button>
          <Button
            variant="filled"
            href="https://wa.me/6281234567890?text=Halo%20REACreative%2C%20saya%20ingin%20konsultasi%20gratis"
            className="w-full justify-center"
            id="drawer-konsultasi-gratis"
            target="_blank"
            rel="noopener noreferrer"
          >
            Konsultasi Gratis
          </Button>
        </div>
      </aside>
    </>
  );
}
