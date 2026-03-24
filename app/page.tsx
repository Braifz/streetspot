import { Navbar } from "@/src/components/common/Navbar";
import { getSession } from "@/src/lib/utils/auth";
import { ArrowRight, Flame, Globe, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src="/images/hero-street.jpg"
          alt="Urban street art background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="font-bold lg:text-5xl text-2xl leading-none tracking-wider text-foreground bg-background/80 p-3 rounded-t-xl">
            SPOTS DE PARKOUR
          </h1>
          <h1 className="lg:text-5xl text-2xl text-primary font-bold bg-background/80 p-3 rounded-xl">
            ¿DONDE VAS A ENTRENAR HOY?
          </h1>

          <p className="mt-6 max-w-md text-base uppercase tracking-wide leading-relaxed">
            Encontrá los mejores lugares para entrenar Parkour compartidos por
            la comunidad.
          </p>

          <Link
            href="/allSpot"
            className="mt-10 group flex items-center gap-3 bg-primary px-8 py-4 font-display text-xl tracking-[0.2em] text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            VER TODOS LOS SPOTS
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              SCROLL
            </span>
            <div className="h-8 w-0.5 bg-primary animate-pulse" />
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <section className="bg-primary py-3 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 font-display text-xl tracking-[0.3em] text-primary-foreground"
            >
              EXPLORA - COMPARTE - CONECTA - VIAJA -
            </span>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="border border-primary bg-transparent p-6 text-center">
              <Flame className="mx-auto h-8 w-8 text-primary mb-3" />
              <span className="block font-display text-4xl md:text-5xl tracking-wider text-foreground">
                {45}
              </span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1 block">
                SPOTS
              </span>
            </div>
            <div className="border border-primary bg-transparent p-6 text-center">
              <Users className="mx-auto h-8 w-8 text-primary mb-3" />
              <span className="block font-display text-4xl md:text-5xl tracking-wider text-foreground">
                847
              </span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1 block">
                TRACEURS
              </span>
            </div>
            <div className="border border-primary bg-transparent p-6 text-center">
              <Globe className="mx-auto h-8 w-8 text-primary mb-3" />
              <span className="block font-display text-4xl md:text-5xl tracking-wider text-foreground">
                23
              </span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1 block">
                PAISES
              </span>
            </div>
            <div className="border border-primary bg-transparent p-6 text-center">
              <MapPin className="mx-auto h-8 w-8 text-primary mb-3" />
              <span className="block font-display text-4xl md:text-5xl tracking-wider text-foreground">
                1.2K
              </span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1 block">
                COMENTARIOS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spots */}
      <section className="py-16 md:py-24 px-4 bg-transparent border-primary border-t-2 border-b-2">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">
                {/* // LO MEJOR */}
              </span>
              <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground mt-2">
                SPOTS DESTACADOS
              </h2>
            </div>
            <Link
              href="/allSpot"
              className="flex items-center gap-2 text-sm uppercase tracking-widest text-primary hover:text-foreground transition-colors group"
            >
              VER TODOS
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {featuredSpots.map((spot) => (
              <SpotCard key={spot.id} spot={spot} />
            ))} */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 relative overflow-hidden noise-overlay">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider text-foreground">
            ENCONTRA
          </h2>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider text-primary -mt-1 md:-mt-2">
            TU PROXIMO
          </h2>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider text-foreground -mt-1 md:-mt-2">
            DESTINO
          </h2>
          <p className="mt-6 text-muted-foreground uppercase tracking-wide text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Explora todos los spots que la comunidad fue subiendo. Cada lugar
            tiene su historia y sus comentarios.
          </p>
          <Link
            href="/allSpot"
            className="mt-10 inline-flex items-center gap-3 border-2 border-primary px-8 py-4 font-display text-xl tracking-[0.2em] text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            EXPLORAR AHORA
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <footer className="bg-transparent py-8 px-4 w-full flex justify-center">
        <p className="text-xs text-primary">Hecho por braifz</p>
      </footer>

      {session?.user && (
        <div>
          <p>{session.user.name}</p>
          <p>{session.user.email}</p>
        </div>
      )}
    </div>
  );
}
