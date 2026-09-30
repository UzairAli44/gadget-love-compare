import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarClock,
  ChevronRight,
  CircleDollarSign,
  Globe2,
  Laptop,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Store,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  brands,
  formatPKR,
  laptopBudgets,
  phoneBudgets,
  products,
  quickFilters,
  worldwideDeals,
  type Product,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CompareGadgetsHub — Compare Phone & Laptop Prices in Pakistan" },
      { name: "description", content: "Compare mobile phone and laptop prices across Pakistani retailers and official stores in 25 countries. All prices in PKR, updated daily." },
      { property: "og:title", content: "CompareGadgetsHub — Find the lowest gadget price" },
      { property: "og:description", content: "Compare trusted Pakistan shops and worldwide official stores in one fast search." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function Logo() {
  return (
    <a href="#top" className="group flex min-w-0 items-center gap-2.5" aria-label="CompareGadgetsHub home">
      <span className="logo-mark"><BarChart3 size={20} strokeWidth={2.6} /></span>
      <span className="truncate text-[17px] font-extrabold tracking-normal text-foreground sm:text-lg">Compare<span className="text-primary">Gadgets</span>Hub</span>
    </a>
  );
}

function Header({ onSearch }: { onSearch: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-semibold text-muted-foreground md:flex" aria-label="Main navigation">
          <a href="#phones" className="nav-link">Phones</a>
          <a href="#laptops" className="nav-link">Laptops</a>
          <a href="#how" className="nav-link">How we compare</a>
        </nav>
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={onSearch} className="icon-button" aria-label="Open search"><Search size={19} /></button>
          <button type="button" onClick={() => setOpen((value) => !value)} className="icon-button md:hidden" aria-expanded={open} aria-label="Toggle menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-7xl flex-col">
            {[['Phones', '#phones'], ['Laptops', '#laptops'], ['How we compare', '#how']].map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-border/70 py-3 font-semibold last:border-0">{label}<ChevronRight size={17} /></a>)}
          </div>
        </nav>
      )}
    </header>
  );
}

function SearchBox({ mode, setMode, externalQuery, onExternalHandled }: { mode: "pk" | "world"; setMode: (mode: "pk" | "world") => void; externalQuery: string; onExternalHandled: () => void }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (externalQuery) {
      setQuery(externalQuery);
      setFocused(true);
      inputRef.current?.focus();
      onExternalHandled();
    }
  }, [externalQuery, onExternalHandled]);
  const matches = useMemo(() => query.trim() ? products.filter((product) => `${product.name} ${product.variant}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : products.slice(0, 4), [query]);
  const choose = (product: Product) => { setQuery(product.name); setFocused(false); };
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="relative z-20">
        <div className={`search-shell ${focused ? "search-shell-active" : ""}`}>
          <Search className="shrink-0 text-primary" size={23} />
          <input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); }} onFocus={() => setFocused(true)} onBlur={() => window.setTimeout(() => setFocused(false), 120)} onKeyDown={(event) => {
            if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => Math.min(value + 1, matches.length - 1)); }
            if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)); }
            if (event.key === "Enter" && matches[active]) choose(matches[active]);
            if (event.key === "Escape") setFocused(false);
          }} className="min-w-0 flex-1 bg-transparent text-base font-medium text-foreground outline-none placeholder:text-muted-foreground sm:text-lg" placeholder="Search any phone or laptop…" aria-label="Search phones and laptops" aria-autocomplete="list" />
          {query && <button type="button" onClick={() => setQuery("")} className="icon-button h-9 w-9" aria-label="Clear search"><X size={17} /></button>}
          <button type="button" className="search-submit" onClick={() => setFocused(true)} aria-label="Search"><span className="hidden sm:inline">Search</span><ArrowRight size={18} /></button>
        </div>
        {focused && (
          <div className="search-results" role="listbox">
            <div className="flex items-center justify-between px-4 pb-2 pt-3 text-xs font-bold uppercase text-muted-foreground"><span>{query ? "Best matches" : "Popular searches"}</span><span>{mode === "pk" ? "Pakistan prices" : "Worldwide prices"}</span></div>
            {matches.length ? matches.map((product, index) => (
              <button key={product.name} type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => choose(product)} className={`search-result ${active === index ? "bg-accent" : ""}`} role="option" aria-selected={active === index}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-product"><img src={product.image} alt="" className="h-11 w-11 object-contain" /></span>
                <span className="min-w-0 flex-1 text-left"><span className="block truncate text-sm font-bold">{product.name}</span><span className="text-xs text-muted-foreground">{product.variant}</span></span>
                <span className="shrink-0 text-right"><span className="block text-xs text-muted-foreground">from</span><span className="text-sm font-extrabold text-primary">{formatPKR(product.price)}</span></span>
              </button>
            )) : <div className="px-4 py-8 text-center text-sm text-muted-foreground">No exact match yet. Try a brand or model name.</div>}
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <div className="mode-toggle" aria-label="Price region">
          <button type="button" onClick={() => { setMode("pk"); setFocused(false); }} className={mode === "pk" ? "mode-active" : ""}>🇵🇰 <span>In Pakistan</span></button>
          <button type="button" onClick={() => { setMode("world"); setFocused(false); }} className={mode === "world" ? "mode-active" : ""}>🌍 <span>Worldwide</span></button>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {quickFilters.map((filter) => <button type="button" key={filter} onClick={() => { setQuery(filter); inputRef.current?.focus(); setFocused(true); }} className="filter-chip">{filter}</button>)}
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: string }) {
  return <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3"><div className="min-w-0">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 className="section-title">{title}</h2></div>{action && <a className="section-action" href="#top">{action}<ArrowRight size={16} /></a>}</div>;
}

function ProductCard({ product, onCompare }: { product: Product; onCompare: (name: string) => void }) {
  return (
    <article className="product-card">
      <div className={`product-visual product-${product.tint}`}><img src={product.image} alt={`${product.name} product view`} loading="lazy" width={816} height={816} /></div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold text-muted-foreground">{product.variant}</p>
        <h3 className="mt-1 min-h-12 text-base font-extrabold leading-snug">{product.name}</h3>
        <div className="mt-3"><span className="text-xs text-muted-foreground">Lowest price</span><p className="text-xl font-black text-foreground">{formatPKR(product.price)}</p></div>
        <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground"><span>at {product.shops} shops</span><span className="freshness"><span />Updated 3h ago</span></div>
        {product.saving ? <div className="saving-badge">🌍 Save up to {formatPKR(product.saving)} abroad</div> : <div className="h-9" />}
        <button type="button" onClick={() => onCompare(product.name)} className="compare-button">Compare prices<ChevronRight size={16} /></button>
      </div>
    </article>
  );
}

function HomePage() {
  const [mode, setMode] = useState<"pk" | "world">("pk");
  const [searchRequest, setSearchRequest] = useState("");
  const [reportOpen, setReportOpen] = useState(false);
  const startSearch = (query = " ") => { setSearchRequest(query); document.getElementById("search")?.scrollIntoView({ behavior: "smooth", block: "center" }); };
  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header onSearch={() => startSearch()} />
      <main>
        <section className="hero-section">
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 text-center sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pt-24">
            <div className="hero-kicker"><span className="live-dot" />Pakistan’s smarter gadget price finder</div>
            <h1 className="mx-auto mt-5 max-w-5xl text-4xl font-black leading-[1.08] tracking-normal sm:text-6xl lg:text-7xl">Find the lowest price for any <span className="hero-accent">phone or laptop</span>, in Pakistan and worldwide.</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">We compare major Pakistani shops and official stores in 25 countries. Updated daily.</p>
            <div id="search" className="scroll-mt-28 pt-8"><SearchBox mode={mode} setMode={setMode} externalQuery={searchRequest} onExternalHandled={() => setSearchRequest("")} /></div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Why shoppers trust us">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border lg:grid-cols-4">
            {[[Store, "8+", "Pakistani retailers"], [Globe2, "25", "countries compared"], [CalendarClock, "Daily", "price updates"], [ShieldCheck, "Zero", "sign-up needed"]].map(([Icon, value, label]) => { const StatIcon = Icon as typeof Store; return <div key={String(label)} className="stat-item"><StatIcon size={20} /><div><strong>{String(value)}</strong><span>{String(label)}</span></div></div>; })}
          </div>
        </section>

        <section id="phones" className="page-section scroll-mt-24">
          <SectionHeading eyebrow="Live market snapshot" title="Trending in Pakistan" action="Browse all" />
          <div className="product-grid hide-scrollbar">{products.map((product) => <ProductCard key={product.name} product={product} onCompare={startSearch} />)}</div>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted-foreground sm:hidden"><ArrowRight size={14} /> Swipe to see more</div>
        </section>

        <section className="savings-band">
          <div className="page-section">
            <SectionHeading eyebrow="Global price radar" title="Biggest worldwide savings this week" action="See all worldwide deals" />
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {worldwideDeals.map((deal, index) => <article key={deal.name} className={`deal-card ${index === 0 ? "deal-featured" : ""}`}>
                <div className="flex items-start justify-between gap-3"><span className="deal-rank">0{index + 1}</span><span className="freshness"><span />Updated 3h ago</span></div>
                <h3 className="mt-5 text-lg font-extrabold leading-snug">{deal.name}</h3>
                <div className="mt-5 space-y-2 border-y border-border/70 py-4 text-sm"><div className="flex justify-between gap-2"><span className="text-muted-foreground">🇵🇰 Pakistan</span><strong>{formatPKR(deal.local)}</strong></div><div className="flex justify-between gap-2"><span className="text-muted-foreground">{deal.country}</span><strong>{formatPKR(deal.global)}</strong></div></div>
                <p className="mt-4 text-2xl font-black text-savings">−{formatPKR(deal.saving)} <span className="text-base">(−{deal.percent}%)</span></p>
                <p className="mt-1 text-xs text-muted-foreground">Before PTA tax / import costs</p>
              </article>)}
            </div>
          </div>
        </section>

        <section id="laptops" className="page-section scroll-mt-24">
          <SectionHeading eyebrow="Explore 500+ devices" title="Browse by category" />
          <div className="grid gap-4 lg:grid-cols-2">
            <button type="button" onClick={() => startSearch("Mobile Phones")} className="category-card group"><div><span className="category-icon"><Smartphone size={24} /></span><h3>Mobile Phones</h3><p>150+ models compared across trusted shops</p><span className="category-link">Explore phones <ArrowRight size={17} /></span></div><img src={products.find((item) => item.category === "phone")?.image} alt="Modern mobile phones" loading="lazy" width={816} height={816} /></button>
            <button type="button" onClick={() => startSearch("Laptops")} className="category-card group"><div><span className="category-icon"><Laptop size={24} /></span><h3>Laptops</h3><p>350+ laptops for work, study and gaming</p><span className="category-link">Explore laptops <ArrowRight size={17} /></span></div><img src={products.find((item) => item.category === "laptop")?.image} alt="Modern laptop computer" loading="lazy" width={816} height={816} /></button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">{brands.map((brand) => <button key={brand} type="button" onClick={() => startSearch(brand)} className="brand-chip">{brand}</button>)}</div>
        </section>

        <section className="page-section pt-2">
          <SectionHeading eyebrow="Stay on budget" title="Shop by price" />
          <div className="grid gap-4 lg:grid-cols-2">
            {[{ icon: Smartphone, name: "Phones", items: phoneBudgets }, { icon: Laptop, name: "Laptops", items: laptopBudgets }].map(({ icon: Icon, name, items }) => <div key={name} className="budget-panel"><div className="flex items-center gap-2 font-extrabold"><Icon size={19} className="text-primary" />{name}</div><div className="mt-4 flex flex-wrap gap-2">{items.map((item) => <button type="button" key={item} onClick={() => startSearch(`${name} ${item}`)} className="budget-chip">{item}<ChevronRight size={14} /></button>)}</div></div>)}
          </div>
        </section>

        <section id="how" className="how-band scroll-mt-16">
          <div className="page-section text-center">
            <p className="eyebrow">Three simple steps</p><h2 className="section-title">From search to the best price</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[[Search, "Search your gadget", "Type any phone or laptop model."], [CircleDollarSign, "Compare every option", "Check Pakistan shops or official stores worldwide."], [ShoppingBag, "Choose the best deal", "Buy from the cheapest trusted shop."]].map(([Icon, title, text], index) => { const StepIcon = Icon as typeof Search; return <div key={String(title)} className="step"><span className="step-number">{index + 1}</span><span className="step-icon"><StepIcon size={25} /></span><h3>{String(title)}</h3><p>{String(text)}</p></div>; })}
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="report-banner"><div className="report-icon"><Zap size={25} /></div><div className="min-w-0 flex-1"><p className="eyebrow">Help the community</p><h2>Seen a better price in a shop?</h2><p>Report a price you saw in a market, like Hafeez Centre. We verify every report before it’s listed.</p></div><button type="button" onClick={() => setReportOpen(true)} className="primary-button">Report a price<ArrowRight size={17} /></button></div>
        </section>
      </main>

      <footer className="border-t border-border bg-footer">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="grid gap-8 border-b border-border pb-8 md:grid-cols-[1fr_auto]"><div><Logo /><p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">Clear, current gadget prices for smarter buying decisions in Pakistan.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-muted-foreground">{["About", "How we compare", "Disclaimer", "Contact", "Report a price", "Privacy"].map((item) => <a key={item} href={item === "How we compare" ? "#how" : "#top"} className="hover:text-primary">{item}</a>)}</div></div><p className="pt-6 text-xs leading-relaxed text-muted-foreground">Prices change often. Worldwide prices are converted to PKR at current rates. Import/PTA taxes are not included unless stated.</p><p className="mt-3 text-xs font-semibold text-muted-foreground">© 2026 CompareGadgetsHub</p></div>
      </footer>

      {reportOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setReportOpen(false)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="report-title" onMouseDown={(event) => event.stopPropagation()}><button type="button" onClick={() => setReportOpen(false)} className="icon-button absolute right-4 top-4" aria-label="Close"><X size={18} /></button><span className="category-icon"><BadgeCheck size={24} /></span><h2 id="report-title" className="mt-4 text-2xl font-black">Price reporting is opening soon</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">We’re finalising the verification process so every community price stays reliable. Thank you for helping Pakistani buyers.</p><button type="button" onClick={() => setReportOpen(false)} className="primary-button mt-6 w-full">Got it</button></div></div>}
    </div>
  );
}
