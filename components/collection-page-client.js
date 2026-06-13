"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Reveal from "@/components/reveal";
import { fetchProducts } from "@/lib/api-client";
import { getCategories } from "@/lib/product-utils";

const COLLECTION_IMAGES = {
  "T-Shirts": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  Hoodies: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
  Jeans: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
  Bottoms: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
  Outerwear: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=900&q=80",
  default: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
};

function getCollectionImage(category) {
  return COLLECTION_IMAGES[category] || COLLECTION_IMAGES.default;
}

export default function CollectionPageClient() {
  const [categories, setCategories] = useState([]);
  const [productCounts, setProductCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadCollections() {
      try {
        const products = await fetchProducts();
        const nextCategories = getCategories(products).filter((category) => category !== "All");
        const counts = nextCategories.reduce((accumulator, category) => {
          accumulator[category] = products.filter((product) => product.category === category).length;
          return accumulator;
        }, {});

        if (!cancelled) {
          setCategories(nextCategories);
          setProductCounts(counts);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadCollections();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="shell py-12">
      <Reveal>
        <div className="max-w-3xl">
          <p className="muted-label mb-3">Curated edits</p>
          <h1 className="text-5xl font-semibold">Collections</h1>
          <p className="mt-4 text-sm leading-7 text-black/60">
            Explore category-led drops built for layering, streetwear rotation, and everyday premium dressing.
          </p>
        </div>
      </Reveal>

      {isLoading ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="panel h-72 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal key={category} delay={index * 0.05}>
              <Link
                href={`/shop?category=${encodeURIComponent(category)}`}
                className="group panel block overflow-hidden transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={getCollectionImage(category)}
                    alt={category}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/70">Collection</p>
                    <h2 className="mt-2 text-3xl font-semibold">{category}</h2>
                    <p className="mt-2 text-sm text-white/75">
                      {productCounts[category] || 0} piece{productCounts[category] === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
