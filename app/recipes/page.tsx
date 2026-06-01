"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type RecipeType = "veg" | "nonveg";

const recipes = {
  veg: [
    {
      title: "Matar Paneer",
      slug: "matar-paneer",
      image: "/images/mutter panner.png",
      serves: "2",
      cookTime: "10 to 12 minutes",
      timeSaved: "22 to 25 minutes",
      ingredients: ["Paneer: 150 g", "Green peas: 1/2 cup", "GrabV tomato onion paste: 1/2 cup", "Oil or ghee: 1 tbsp", "Water: 1/2 cup", "Salt: only if needed", "Coriander leaves: optional"],
      instructions: "Heat oil, add some cumin and GrabV paste and cook for 1 to 2 minutes. Add peas and water, cover and cook for 5 minutes. Add paneer and simmer for 3 to 4 minutes. Garnish and serve.",
    },
    {
      title: "Mix Veg",
      slug: "mix-veg",
      image: "/images/mix veg.png",
      serves: "2",
      cookTime: "10 to 15 minutes",
      timeSaved: "22 to 25 minutes",
      ingredients: ["Mixed vegetables: 2 cups", "Carrot, beans, potato, cauliflower, peas, capsicum", "GrabV tomato onion paste: 1/2 cup", "Oil: 1 tbsp", "Water: 1/2 to 3/4 cup", "Salt: only if needed", "Coriander leaves: optional"],
      instructions: "Heat oil, add some jeera and GrabV paste and cook for 1 to 2 minutes. Add chopped vegetables and mix well. Add water, cover and cook for 10 minutes until soft. Garnish and serve.",
    },
    {
      title: "Bhindi Masala",
      slug: "bhindi-masala",
      image: "/images/bhindi masala.png",
      serves: "2",
      cookTime: "10 minutes",
      timeSaved: "20 to 25 minutes",
      ingredients: ["Bhindi: 250 g", "GrabV tomato onion paste: 1/3 cup", "Oil: 1 1/2 tbsp", "Salt: only if needed", "Coriander leaves: optional"],
      instructions: "Dry bhindi completely and cut it. Heat oil, saute bhindi for 4 to 5 minutes until almost cooked. Add GrabV paste and cook uncovered for 4 to 5 minutes until the masala coats the bhindi well. Adjust salt to taste. Garnish and serve.",
    },
    {
      title: "Aloo Gobhi",
      slug: "aloo-gobhi",
      image: "/images/aloo gobhi.png",
      serves: "2",
      cookTime: "10 to 15 minutes",
      timeSaved: "20 to 25 minutes",
      ingredients: ["Potato: 1 medium, cubed", "Cauliflower: 1 1/2 cups florets", "GrabV tomato onion paste: 1/2 cup", "Oil: 1 1/2 tbsp", "Water: 1/4 to 1/2 cup", "Salt: only if needed", "Coriander leaves: optional"],
      instructions: "Heat oil, add jeera and curry leaves. Once it starts spluttering, saute potatoes and cauliflower for 5 minutes. Add GrabV paste and mix well. Add a little water, cover and cook for 8 minutes until tender. Cook uncovered for 2 minutes if needed. Garnish and serve.",
    },
    {
      title: "Matar Mushroom",
      slug: "matar-mushroom",
      image: "/images/mutter mushrooom.png",
      serves: "2",
      cookTime: "10 to 12 minutes",
      timeSaved: "22 to 25 minutes",
      ingredients: ["Mushrooms: 200 g, sliced", "Green peas: 1/2 cup", "GrabV tomato onion paste: 1/2 cup", "Oil or butter: 1 tbsp", "Water: 1/2 cup", "Salt: only if needed", "Coriander leaves: optional"],
      instructions: "Heat oil or butter, add some whole spices and saute mushrooms for 3 to 4 minutes. Add peas and GrabV paste. Add water and simmer for 5 to 6 minutes until the gravy thickens. Garnish and serve.",
    },
  ],
  nonveg: [
    {
      title: "Homestyle Chicken Curry",
      slug: "homestyle-chicken-curry",
      image: "/images/home style chicken.png",
      serves: "2",
      cookTime: "10 to 15 minutes",
      timeSaved: "22 to 25 minutes",
      ingredients: ["Chicken: 300 g, curry cut", "GrabV tomato onion paste: 3/4 cup", "Oil: 1 1/2 tbsp", "Curd: 2 tbsp, optional", "Water: 3/4 cup", "Salt: only if needed", "Coriander leaves: optional"],
      instructions: "Heat oil, add GrabV paste and cook for 2 minutes. Add chicken and mix well. Add curd if needed, then add water. Cover and cook for 10 to 15 minutes until chicken is cooked. Garnish and serve.",
    },
    {
      title: "Dhaba Style Chicken Do Pyaza",
      slug: "dhaba-style-chicken-do-pyaza",
      image: "/images/chicken do pyaza.png",
      serves: "2",
      cookTime: "10 to 15 minutes",
      timeSaved: "22 to 25 minutes",
      ingredients: ["Chicken: 300 g", "Onion: 1 large, cut into petals", "GrabV tomato onion paste: 3/4 cup", "Oil: 2 tbsp", "Curd: 2 tbsp, optional", "Water: 1/2 to 3/4 cup", "Salt: only if needed", "Coriander leaves: optional"],
      instructions: "Heat oil and saute onion petals for 3 minutes. Remove half and keep aside. Add GrabV paste and chicken to the pan. Add curd and water, cover and cook for 10 to 15 minutes. Add reserved onions, cook for 2 minutes and serve.",
    },
    {
      title: "Egg Curry",
      slug: "egg-curry",
      image: "/images/egg curry.png",
      serves: "2",
      cookTime: "10 minutes",
      timeSaved: "20 to 25 minutes",
      ingredients: ["Boiled eggs: 4", "GrabV tomato onion paste: 1/2 cup", "Oil: 1 tbsp", "Water: 1/2 to 3/4 cup", "Salt: only if needed", "Coriander leaves: optional"],
      instructions: "Heat oil and lightly fry boiled eggs for 1 minute and remove. In the same pan add GrabV paste and water. Simmer for 6 to 8 minutes until the curry thickens and then add the eggs. Leave for 1 to 2 minutes for the eggs to absorb flavour. Garnish and serve.",
    },
    {
      title: "Mutton Curry",
      slug: "mutton-curry",
      image: "/images/mutton curry.png",
      serves: "2",
      cookTime: "15 to 20 minutes",
      timeSaved: "25 to 30 minutes",
      ingredients: ["Mutton: 300 g", "GrabV tomato onion paste: 3/4 to 1 cup", "Oil: 2 tbsp", "Curd: 3 tbsp, optional", "Water: 1 to 1 1/4 cups", "Salt: only if needed", "Coriander leaves: optional"],
      instructions: "Heat oil in a pressure cooker, add GrabV paste and cook for 2 to 3 minutes. Add mutton and sear for 5 minutes. Add curd and water. Pressure cook for 5 to 6 whistles until tender. Simmer for 5 minutes and serve.",
    },
    {
      title: "Mutton Sukka",
      slug: "mutton-sukka",
      image: "/images/mutton shuka.png",
      serves: "2",
      cookTime: "15 to 20 minutes",
      timeSaved: "20 to 25 minutes",
      ingredients: ["Mutton: 300 g, small pieces", "GrabV tomato onion paste: 1/3 to 1/2 cup", "Oil: 2 tbsp", "Curry leaves: 1 sprig, optional", "Grated coconut or dry coconut powder: 2 tbsp, optional", "Water: 3/4 cup for pressure cooking", "Salt: only if needed", "Coriander leaves: optional"],
      instructions: "Pressure cook mutton with water and salt for 5 to 6 whistles. Heat oil, add curry leaves and GrabV paste. Add cooked mutton with a little stock. Roast until dry and well coated. Add coconut if needed, roast for 2 to 3 minutes and serve.",
    },
  ],
};

export default function RecipesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeType, setActiveType] = useState<RecipeType>("veg");
  const activeRecipes = recipes[activeType];
  const isVeg = activeType === "veg";

  useEffect(() => {
    const recipeTypeBySlug = new Map<string, RecipeType>([
      ...recipes.veg.map((recipe) => [recipe.slug, "veg"] as const),
      ...recipes.nonveg.map((recipe) => [recipe.slug, "nonveg"] as const),
    ]);

    const openRecipeFromHash = () => {
      const slug = window.location.hash.replace("#", "");
      const recipeType = recipeTypeBySlug.get(slug);

      if (!recipeType) {
        return;
      }

      setActiveType(recipeType);
      window.setTimeout(() => {
        document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    };

    openRecipeFromHash();
    window.addEventListener("hashchange", openRecipeFromHash);

    return () => window.removeEventListener("hashchange", openRecipeFromHash);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full font-arpona overflow-x-hidden" style={{ backgroundColor: "rgb(239, 238, 230)" }}>
      <header style={{ backgroundColor: "rgb(12, 61, 27)" }} className="sticky top-0 z-[100] w-full flex-shrink-0 shadow-md">
        <div className="max-w-[1600px] mx-auto px-4 md:pl-4 md:pr-8 h-[70px] md:h-[80px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="lg:hidden flex items-center">
              <button className="text-white focus:outline-none p-2" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="2" x2="24" y2="2" stroke="white" strokeWidth="2.5" />
                  <line x1="0" y1="8" x2="24" y2="8" stroke="white" strokeWidth="2.5" />
                  <line x1="0" y1="14" x2="24" y2="14" stroke="white" strokeWidth="2.5" />
                </svg>
              </button>
            </div>

            <Link href="/" className="flex items-center">
              <Image src="/images/logo.svg" alt="GrabV Logo" width={110} height={40} className="w-auto h-8 md:h-12" priority />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8 xl:gap-12 text-white font-medium">
            <Link href="/" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Home</Link>
            <Link href="/recipes" className="text-[rgb(247,216,13)] transition-colors text-[18px]">Recipes</Link>
            <Link href="/products" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">Products</Link>
            <Link href="/ourstory" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Our Story</Link>
            <Link href="/contact" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px] whitespace-nowrap">Contact Us</Link>
            <Link href="/faq" className="hover:text-[rgb(247,216,13)] transition-colors text-[18px]">FAQ</Link>
          </nav>

          <Link
            href="/all-purposegravy"
            style={{ borderRadius: "5px", backgroundColor: "rgb(247, 216, 13)", color: "rgb(12, 61, 27)", letterSpacing: "0.05em" }}
            className="font-arpona font-medium flex items-center justify-center hover:bg-yellow-400 transition-colors shrink-0 text-[12px] md:text-[18px] w-[85px] md:w-[142px] h-[30px] md:h-[37px]"
          >
            Order Now
          </Link>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 z-[200] bg-[rgb(12,61,27)] flex flex-col items-center justify-center animate-in fade-in duration-300">
            <button className="absolute top-6 right-8 text-white p-2 hover:scale-110 transition-transform" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5L25 25M25 5L5 25" stroke="white" strokeWidth="3" />
              </svg>
            </button>
            <nav className="flex flex-col items-center gap-8 text-white font-arpona font-medium text-[24px]">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Home</Link>
              <Link href="/recipes" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors text-[rgb(247,216,13)]">Recipes</Link>
              <Link href="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Products</Link>
              <Link href="/ourstory" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Our Story</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">Contact Us</Link>
              <Link href="/faq" onClick={() => setIsMenuOpen(false)} className="hover:text-[rgb(247,216,13)] transition-colors">FAQ</Link>
              <Link href="/all-purposegravy" style={{ backgroundColor: "rgb(247, 216, 13)", color: "rgb(12, 61, 27)" }} className="mt-4 px-10 py-3 rounded-full font-bold text-[18px] hover:bg-yellow-400 transition-colors flex items-center justify-center" onClick={() => setIsMenuOpen(false)}>
                Order Now
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="w-full relative flex flex-col items-center">
        <section className="w-full relative overflow-hidden pt-10 md:pt-16 pb-12 md:pb-20" style={{ backgroundColor: "rgb(21, 107, 54)" }}>
          <div className="absolute inset-0 opacity-25">
            <Image src="/images/bg green2.svg" alt="" fill className="object-cover object-bottom" priority />
          </div>
          <div className="relative w-full max-w-[1600px] mx-auto px-4 md:px-16 flex flex-col md:flex-row items-center gap-8 md:gap-14">
            <div className="w-full md:w-[58%] text-center md:text-left">
              <div className="relative inline-flex mb-5 md:mb-8">
                <div className="relative z-10 flex items-center gap-2 px-5 md:px-8 py-2 md:py-3 rounded-full bg-[rgb(247,216,13)]">
                  <Image src="/images/leaf.svg" alt="" width={20} height={20} className="w-4 md:w-6 h-4 md:h-6" />
                  <span className="font-arpona font-semibold text-[14px] md:text-[22px] uppercase tracking-wide text-[rgb(21,107,54)]">GrabV Recipes</span>
                </div>
                <Image src="/images/border2.svg" alt="" fill className="z-20 object-fill pointer-events-none scale-110" />
              </div>

              <h1 className="font-kura uppercase leading-[0.9] mb-4 md:mb-6">
                <span className="block text-[42px] md:text-[68px] lg:text-[92px] text-[rgb(247,216,13)]">Recipes</span>
                <span className="block text-[34px] md:text-[52px] lg:text-[72px] text-white">GrabV</span>
              </h1>
              <p className="text-white/90 text-[16px] md:text-[24px] leading-[1.35] max-w-[640px] mx-auto md:mx-0">
                Switch the ingredients, keep the flavour. Make everyday curries faster with GrabV onion tomato gravy.
              </p>
            </div>

            <div className="relative w-full md:w-[42%] max-w-[520px] aspect-[5/4]">
              <Image src={isVeg ? "/images/mutter panner.png" : "/images/home style chicken.png"} alt={isVeg ? "Mutter Paneer" : "Home Style Chicken Curry"} fill className="object-cover rounded-[18px] md:rounded-[28px] border-[6px] md:border-[10px] border-[rgb(247,216,13)] shadow-2xl" priority />
            </div>
          </div>
        </section>

        <section className="w-full pt-8 md:pt-14 pb-16 md:pb-24" style={{ backgroundColor: "rgb(239, 238, 230)" }}>
          <div className="w-full max-w-[1600px] mx-auto px-4 md:px-16">
            <div className="flex flex-col items-center gap-5 md:gap-8 mb-8 md:mb-14">
              <div className="grid grid-cols-2 w-full max-w-[520px] rounded-full p-1.5 md:p-2 bg-white shadow-md border border-[rgba(21,107,54,0.18)]">
                {[
                  { key: "veg" as RecipeType, label: "Veg" },
                  { key: "nonveg" as RecipeType, label: "Non Veg" },
                ].map((option) => {
                  const isActive = activeType === option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setActiveType(option.key)}
                      className="relative h-[46px] md:h-[58px] rounded-full font-arpona font-bold text-[16px] md:text-[22px] transition-all"
                      style={{
                        backgroundColor: isActive ? (option.key === "veg" ? "rgb(21, 107, 54)" : "rgb(247, 0, 52)") : "transparent",
                        color: isActive ? "white" : "rgb(21, 107, 54)",
                      }}
                      aria-pressed={isActive}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <div className="w-full flex items-center gap-3 md:gap-8">
                <div className="flex-1 h-[1px] md:h-[2px]" style={{ backgroundColor: isVeg ? "rgb(21, 107, 54)" : "rgb(247, 0, 52)" }} />
                <div className="flex items-center gap-2 md:gap-3 px-4 md:px-8 py-2 md:py-3 rounded-full shrink-0" style={{ backgroundColor: isVeg ? "rgb(207, 219, 204)" : "rgba(247, 0, 52, 0.15)" }}>
                  <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full" style={{ backgroundColor: isVeg ? "rgb(21, 107, 54)" : "rgb(247, 0, 52)" }} />
                  <span className="font-bold text-[13px] md:text-[22px] tracking-[0.1em]" style={{ color: isVeg ? "rgb(21, 107, 54)" : "rgb(247, 0, 52)" }}>
                    {isVeg ? "VEGETARIAN" : "NON-VEGETARIAN"}
                  </span>
                </div>
                <div className="flex-1 h-[1px] md:h-[2px]" style={{ backgroundColor: isVeg ? "rgb(21, 107, 54)" : "rgb(247, 0, 52)" }} />
              </div>
            </div>

            <div className="flex flex-col gap-8 md:gap-12">
              {activeRecipes.map((item, index) => {
                const textFirst = index % 2 === 0;
                const textBlock = (
                  <div className={`min-w-0 p-5 md:p-7 lg:p-9 ${textFirst ? "order-1" : "order-1 md:order-2"}`}>
                    <h2 className="font-kura uppercase text-[32px] md:text-[46px] lg:text-[52px] leading-[0.95] mb-4 text-[rgb(247,0,52)]">{item.title}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
                      {[
                        ["Serves", item.serves],
                        ["Cook time", item.cookTime],
                        ["Time saved", item.timeSaved],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-[12px] bg-[rgb(239,238,230)] px-4 py-3">
                          <p className="text-[12px] uppercase font-bold tracking-wide text-[rgb(21,107,54)]">{label}</p>
                          <p className="text-[15px] md:text-[17px] font-semibold leading-tight text-[rgb(12,61,27)]">{value}</p>
                        </div>
                      ))}
                    </div>
                    <h3 className="text-[18px] md:text-[22px] font-bold mb-2 text-[rgb(21,107,54)]">Ingredients</h3>
                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-1.5 mb-5 text-[15px] md:text-[17px] leading-snug text-[rgb(21,107,54)]">
                      {item.ingredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                      ))}
                    </ul>
                    <h3 className="text-[18px] md:text-[22px] font-bold mb-2 text-[rgb(21,107,54)]">Instructions</h3>
                    <p className="text-[15px] md:text-[18px] leading-relaxed text-[rgb(21,107,54)]">{item.instructions}</p>
                  </div>
                );
                const imageBlock = (
                  <div className={`relative min-h-[280px] md:min-h-full aspect-[4/3] md:aspect-auto overflow-hidden bg-white ${textFirst ? "order-2" : "order-2 md:order-1"}`}>
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(min-width: 768px) 44vw, 92vw" />
                  </div>
                );
                const articleColumns = textFirst
                  ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
                  : "md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]";

                return (
                  <article
                    id={item.slug}
                    key={item.title}
                    className={`scroll-mt-24 grid grid-cols-1 ${articleColumns} gap-0 overflow-hidden rounded-[18px] md:rounded-[28px] bg-white shadow-lg border border-[rgba(21,107,54,0.12)]`}
                  >
                    {textFirst ? (
                      <>
                        {textBlock}
                        {imageBlock}
                      </>
                    ) : (
                      <>
                        {imageBlock}
                        {textBlock}
                      </>
                    )}
                  </article>
                );
              })}
              <p className="text-center text-[14px] md:text-[18px] leading-relaxed font-medium text-[rgb(21,107,54)]">
                Note: For more servings, multiply all ingredients based on the serving size.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 md:py-16 px-6 md:px-8 lg:px-10" style={{ backgroundColor: "rgb(21, 107, 54)" }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-0 flex flex-col w-full h-auto md:h-[234px] justify-start gap-12">
              <div>
                <div className="w-[110px] h-[55px] relative mb-4">
                  <Image src="/images/logo.svg" alt="GrabV Logo" fill className="object-contain object-left" />
                </div>
                <p className="text-[16px] font-medium leading-[1.2] font-arpona text-[rgb(247,216,13)]">&copy; 2026 GrabV. All rights reserved.</p>
              </div>
              <div className="flex flex-col items-start gap-1.5 mt-8 md:mt-0">
                <span className="text-[14px] font-bold font-arpona text-white">Follow Us</span>
                <div className="flex items-center gap-3">
                  <Link href="#" className="w-6 h-6 relative hover:scale-110 transition-transform brightness-0 invert"><Image src="/images/facebook.svg" alt="Facebook" fill className="object-contain" /></Link>
                  <Link href="#" className="w-6 h-6 relative hover:scale-110 transition-transform brightness-0 invert"><Image src="/images/whatsapp1.svg" alt="WhatsApp" fill className="object-contain" /></Link>
                  <Link href="https://www.instagram.com/grab__v/" target="_blank" rel="noopener noreferrer" className="w-6 h-6 relative hover:scale-110 transition-transform brightness-0 invert"><Image src="/images/insta.svg" alt="Instagram" fill className="object-contain" /></Link>
                </div>
              </div>
            </div>

            {[
              { title: "Company", links: [{ label: "Our Story", href: "/ourstory" }, { label: "Process", href: "/#process" }, { label: "Quality Promise", href: "/#quality" }, { label: "Contact Us", href: "/contact" }] },
              { title: "Product", links: [{ label: "All Purpose Gravy", href: "/all-purposegravy" }, { label: "Ingredients", href: "/all-purposegravy#ingredients" }, { label: "How to Use", href: "/all-purposegravy#how-to-use" }, { label: "Recipes", href: "/recipes" }] },
              { title: "Order & Policies", links: [{ label: "WhatsApp Order", href: "#" }, { label: "Exchange Order", href: "#" }, { label: "Privacy Policy", href: "#" }] },
            ].map((column) => (
              <div key={column.title} className="rounded-[30px] p-6 flex flex-col w-full h-auto md:h-[234px]" style={{ backgroundColor: "rgb(55, 122, 49)" }}>
                <h3 className="text-[22px] font-bold mb-2 text-[rgb(247,216,13)]">{column.title}</h3>
                <div className="flex flex-col gap-1 text-[18px] font-medium font-arpona leading-tight text-[rgb(247,216,13)]">
                  {column.links.map((link) => (
                    <Link key={link.label} href={link.href} className="hover:opacity-80 transition-opacity">{link.label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
