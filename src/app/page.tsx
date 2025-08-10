"use client";

import React, { useState } from "react";
import Image from "next/image";
import skills from "@/lib/skills";
import showcases from "@/lib/showcases";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContactForm from "@/components/customs/contact";

type IconProps = { name: string; alt: string; className?: string };

const FALLBACK_TO_JSD = new Set(["nextdotjs", "express", "prisma", "sonarqube", "oracle", "visualstudiocode", "github", "linkedin"]);
const srcSimple = (slug: string) => `https://cdn.simpleicons.org/${slug}`;
const srcJsd = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;

function Icon({ name, alt, className }: IconProps) {
  const src = FALLBACK_TO_JSD.has(name) ? srcJsd(name) : srcSimple(name);
  return (
    <Image src={src} alt={alt} width={32} height={32} className={`h-7 w-auto sm:h-8 ${className ?? ""}`} loading="lazy" sizes="(max-width: 640px) 28px, 32px" />
  );
}

function withSize(url: string, size: string) {
  // append or replace &sz=...
  return url.includes("&sz=") ? url.replace(/(&sz=)[^&]*/i, `$1${size}`) : `${url}&sz=${size}`;
}

export default function Home() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <div className="w-full flex flex-col px-4 sm:px-6 md:px-10 lg:px-24 py-12 md:py-24 justify-center overflow-x-hidden relative">
      {/* fixed CV download button (mobile-safe, same style) */}
      <a
        href="https://drive.google.com/file/d/1ZkvNd6_3KWnsG7tnWTCSnrDpVlTFvgx1/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-[9999] bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Download CV"
        style={{
          top: "max(env(safe-area-inset-top, 0px), 12px)",
          right: "max(env(safe-area-inset-right, 0px), 16px)",
        }}
      >
        <span className="hidden sm:inline">Download CV</span>
        <span className="sm:hidden">CV</span>
      </a>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] overflow-hidden -z-10">
        <div className="relative mx-auto max-w-[90rem]">
          <div className="absolute left-1/4 top-20 -translate-x-[25%] -translate-y-1/2 w-[360px] h-[360px] bg-[#ff6a36] rounded-full filter blur-[60px] opacity-30 animate-blob1" />
          <div className="absolute left-2/4 top-20 -translate-x-[50%] -translate-y-1/2 w-[360px] h-[360px] bg-[#ff3a85] rounded-full filter blur-[60px] opacity-30 animate-blob2" />
          <div className="absolute left-3/4 top-20 -translate-x-[75%] -translate-y-1/2 w-[360px] h-[360px] bg-[#2a40ff] rounded-full filter blur-[60px] opacity-30 animate-blob3" />
        </div>
      </div>

      <main className="w-full max-w-[90rem] flex flex-col mx-auto">
        <div className="mt-4 flex flex-col md:flex-row md:items-start md:gap-8 px-4 md:px-0">
          {/* Photo */}
          <div className="self-start border border-gray-400 rounded-2xl p-[6px]">
            <Image
              src="https://drive.google.com/thumbnail?id=1DhyFmZ5MM_U4K6BbM4AClueDg0dAxhFY&sz=s300"
              alt="Reyhan Emir Affandie — Full-Stack Engineer"
              width={300}
              height={300}
              className="w-[240px] md:w-[300px] h-auto rounded-2xl"
            />
          </div>

          {/* Text column */}
          <div className="mt-4 md:mt-0 md:flex-1">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
              Bringing digital products to life
              <br className="hidden sm:block" />
              with code and innovation.
            </h1>

            <h2 className="text-2xl sm:text-2xl md:text-4xl font-bold text-white mt-6">Reyhan Emir Affandie</h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-2xl text-white">
              Full-Stack Engineer with 14 years of experience, with the last 6 years specializing on modern JavaScript frameworks.
            </p>
            <p className="text-base sm:text-lg md:text-2xl text-white">Certified Frontend Engineer (Micro1, July 27, 2025).</p>
          </div>
        </div>

        {/* certificate */}
        <div className="w-full flex justify-start mt-4">
          <div className="relative w-full sm:w-auto md:-ml-8">
            <Image
              src="https://drive.google.com/thumbnail?id=1-WVdawNvAfq6AQMkWC_RnRap1OwebLYY&sz=s1600"
              alt="Micro1 Certified Frontend Engineer certificate for Reyhan Emir Affandie"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto block"
            />
            {/* top fade to kill the green glow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black via-black/70 to-transparent"></div>
          </div>
        </div>

        {/* tech table */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-6">My technical strengths include:</h3>

        <div className="border border-gray-400 rounded-sm p-2 md:pl-8 md:pr-8">
          <table className="text-white mt-2 text-lg sm:text-xl w-full table-auto">
            <tbody>
              {skills.map((category) => (
                <React.Fragment key={category.title}>
                  {/* Title Row */}
                  <tr>
                    <td className="py-2 whitespace-nowrap align-top">{category.title}</td>
                  </tr>

                  {/* Items Row */}
                  <tr>
                    <td className="py-2">
                      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4 px-2 sm:px-0">
                        {category.items.map((item) => (
                          <a
                            key={item.name}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center border border-gray-400 rounded-sm p-2 pb-1 transition-colors duration-200 hover:bg-white hover:text-black cursor-pointer"
                          >
                            <Icon
                              name={item.icon}
                              alt={item.alt}
                              className={
                                ["nextdotjs", "express", "prisma", "oracle", "sonarqube", "visualstudiocode", "github"].includes(item.icon)
                                  ? "invert group-hover:invert-0"
                                  : ""
                              }
                            />
                            {/* short divider */}
                            <div className="mt-6 w-full border-b border-gray-400 my-2 group-hover:border-black"></div>
                            <span className="text-xs sm:text-sm md:text-base whitespace-nowrap">{item.name}</span>
                          </a>
                        ))}
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-6">My skills showcase:</h3>
        <div className="border border-gray-400 rounded-sm p-2 md:p-6 md:pl-8 md:pr-8 text-white">
          <div className="text-xl">
            In my recent work, I have designed, built, and deployed end-to-end web applications. Most notably a Task Management System delivered in just three
            days for a technical assessment, as well as an Events Management module built in only one day. These experiences reflect my dedication to staying up
            to date with the latest technology, adopting best-in-class tools, and consistently delivering scalable, production-ready solutions in fast-paced
            environments.
          </div>
          <div className="mt-6 text-xl flex flex-row">
            <div className="flex w-52 justify-start">Live Demo</div>
            <div className="flex">
              :&nbsp;
              <a
                href="https://nodetasks.workmild.ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reyhan’s Showcase Live Demo"
                className="text-blue-400 hover:text-white transition-colors"
              >
                https://nodetasks.workmild.ai
              </a>
            </div>
          </div>
          <div className="mt-1 text-xl flex flex-row">
            <div className="flex w-52 justify-start">Demo Email</div>
            <div className="flex">: reyhanz1988@gmail.com</div>
          </div>
          <div className="mt-1 text-xl flex flex-row">
            <div className="flex w-52 justify-start">Demo Password</div>
            <div className="flex">: user1234</div>
          </div>
          <div className="mt-1 text-xl flex flex-row">
            <div className="flex w-52 justify-start">Backend Repository</div>
            <div className="flex">
              :&nbsp;
              <a
                href="https://github.com/reyhan-affandie/nodetasks-api"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reyhan’s Showcase Backend Repository"
                className="text-blue-400 hover:text-white transition-colors"
              >
                https://github.com/reyhan-affandie/nodetasks-api
              </a>
            </div>
          </div>
          <div className="mt-1 text-xl flex flex-row">
            <div className="flex w-52 justify-start">Frontend Repository</div>
            <div className="flex">
              :&nbsp;
              <a
                href="https://github.com/reyhan-affandie/nodetasks-cms"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reyhan’s Showcase Frontend Repository"
                className="text-blue-400 hover:text-white transition-colors"
              >
                https://github.com/reyhan-affandie/nodetasks-cms
              </a>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 md:gap-6 px-2 sm:px-0">
            {showcases.map((item, idx) => (
              <Dialog key={idx} open={activeIdx === idx} onOpenChange={(o) => setActiveIdx(o ? idx : null)}>
                <div>
                  <h3 className="text-xl sm:text-xl md:text-3xl font-bold text-white mb-2">{item.title}</h3>

                  <DialogTrigger asChild>
                    <button type="button" aria-label={`Open ${item.title}`} className="w-full border border-gray-400 rounded-xl p-6 group cursor-pointer">
                      <Image
                        src={withSize(item.img, "s960")}
                        alt={item.alt}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto block rounded-xl transition-transform duration-200 group-hover:scale-[1.01]"
                      />
                    </button>
                  </DialogTrigger>
                </div>

                <DialogContent className="max-w-[100vw] sm:max-w-6xl bg-white border-none rounded-xl shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out">
                  <DialogTitle className="text-xl sm:text-xl md:text-3xl font-bold">{item.title}</DialogTitle>
                  <div className="w-full border border-gray-400 p-6 rounded-xl">
                    <Image src={withSize(item.img, "s1600")} alt={item.alt} width={0} height={0} sizes="100vw" className="w-full h-auto rounded-xl" priority />
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
        <ContactForm publicKey={process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!} siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} />

        {/* footer */}
        <footer className="w-full mt-12 border-t border-gray-700 pt-6">
          <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 text-white text-sm">
            <a
              href="https://www.linkedin.com/in/reyhan-affandie-69478457"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reyhan’s LinkedIn"
              className="hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <Icon name="linkedin" alt="LinkedIn" className="invert group-hover:invert-0" />
              LinkedIn
            </a>

            <a href="mailto:reyhanz1988@gmail.com" aria-label="Reyhan’s Gmail" className="hover:text-blue-400 transition-colors flex items-center gap-2">
              <Icon name="gmail" alt="Email" />
              reyhanz1988@gmail.com
            </a>

            <a
              href="https://github.com/reyhan-affandie"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reyhan’s GitHub"
              className="hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <Icon name="github" alt="GitHub" className="invert group-hover:invert-0" />
              github.com/reyhan-affandie
            </a>

            <a
              href="https://gitlab.com/reyhanz1988"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reyhan’s GitLab"
              className="hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <Icon name="gitlab" alt="GitLab" />
              gitlab.com/reyhanz1988
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
