"use client";

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import SpecularButton from './specular-button';
// use your own icon import if react-icons is not available
const GoArrowUpRight = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 16 16"
        className={className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M3.75 2h7.5c.414 0 .75.336.75.75v7.5a.75.75 0 0 1-1.5 0V4.56L4.53 10.53a.75.75 0 0 1-1.06-1.06L9.44 3.5H3.75a.75.75 0 0 1 0-1.5Z" />
    </svg>
);

type CardNavLink = {
    label: string;
    href?: string;
    ariaLabel: string;
};

export type CardNavItem = {
    label: string;
    bgColor: string;
    textColor: string;
    links: CardNavLink[];
};

export interface CardNavProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logo: any;
    logoAlt?: string;
    items: CardNavItem[];
    className?: string;
    ease?: string;
    baseColor?: string;
    menuColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
    theme?: string;
}

const CardNav: React.FC<CardNavProps> = ({
    logo,
    logoAlt = 'Logo',
    items,
    className = '',
    ease = 'power3.out',
    baseColor = '#fff',
    menuColor,
    buttonBgColor,
    buttonTextColor
}) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 260;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
            if (contentEl) {
                const wasVisible = contentEl.style.visibility;
                const wasPointerEvents = contentEl.style.pointerEvents;
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                contentEl.style.visibility = 'visible';
                contentEl.style.pointerEvents = 'auto';
                contentEl.style.position = 'static';
                contentEl.style.height = 'auto';

                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                contentEl.offsetHeight;

                const topBar = 60;
                const padding = 16;
                const contentHeight = contentEl.scrollHeight;

                contentEl.style.visibility = wasVisible;
                contentEl.style.pointerEvents = wasPointerEvents;
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        return 260;
    };

    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 60, overflow: 'hidden' });

        const tl = gsap.timeline({ paused: true });

        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.5,
            ease: "power4.out"
        });

        tl.fromTo(cardsRef.current,
            { y: 25, opacity: 0, scale: 0.97 },
            { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power4.out", stagger: 0.05 },
            0.05
        );

        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ease, items]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;

            if (isExpanded) {
                const newHeight = calculateHeight();
                gsap.set(navRef.current, { height: newHeight });

                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    newTl.progress(1);
                    tlRef.current = newTl;
                }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    tlRef.current = newTl;
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
            tl.reverse();
        }
    };

    const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
        if (el) cardsRef.current[i] = el;
    };

    return (
        <div
            className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-99 top-[1.2em] md:top-[2em] ${className}`}
        >
            <nav
                ref={navRef}
                className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl border border-white/10 shadow-lg backdrop-blur-lg relative overflow-hidden will-change-[height]`}
                style={{ backgroundColor: baseColor }}
            >
                <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-2">
                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? 'open rotate-180' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-0 focus:outline-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
                        onClick={toggleMenu}
                        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleMenu();
                            }
                        }}
                        role="button"
                        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                        aria-expanded={isExpanded}
                        tabIndex={0}
                        style={{ color: menuColor || '#000' }}
                    >
                        <div
                            className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-[50%_50%] ${isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
                                } group-hover:opacity-75`}
                        />
                        <div
                            className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-[50%_50%] ${isHamburgerOpen ? 'translate-y-[-4px] -rotate-45' : ''
                                } group-hover:opacity-75`}
                        />
                    </div>

                    <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={logo?.src || logo} alt={logoAlt} className="logo h-[28px]" />
                    </div>

                    <SpecularButton
                        size="lg"
                        radius={18}
                        tint="#ffffff"
                        tintOpacity={0}
                        blur={0}
                        textColor={buttonTextColor || '#f5f5f5'}
                        lineColor="#ffffff"
                        baseColor={buttonBgColor || '#525252'}
                        intensity={1}
                        shineSize={10}
                        shineFade={40}
                        thickness={1}
                        speed={0.35}
                        followMouse
                        proximity={250}
                        autoAnimate={false}
                        onClick={() => console.log('clicked')}
                        className="hidden md:inline-flex h-[44px] py-0! items-center"
                    >
                        Get Started
                    </SpecularButton>
                </div>

                <div
                    className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-1 ${isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
                        } md:flex-row md:items-end md:gap-[12px]`}
                    aria-hidden={!isExpanded}
                >
                    {(items || []).slice(0, 3).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-3xl border border-white/5 min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%] bg-(--nav-card-bg) transition-colors duration-300 hover:bg-white/8 hover:border-white/15 hover:shadow-lg hover:shadow-black/25"
                            ref={setCardRef(idx)}
                            style={{
                                '--nav-card-bg': item.bgColor,
                                color: item.textColor
                            } as React.CSSProperties}
                        >
                            <div className="nav-card-label font-semibold tracking-tight text-[18px] md:text-[22px]">
                                {item.label}
                            </div>
                            <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                                {item.links?.map((lnk, i) => (
                                    <a
                                        key={`${lnk.label}-${i}`}
                                        className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1.5 text-white/50 hover:text-white text-[15px] md:text-[16px] focus:outline-none"
                                        href={lnk.href || '#'}
                                        aria-label={lnk.ariaLabel}
                                    >
                                        <GoArrowUpRight className="nav-card-link-icon shrink-0 opacity-70" aria-hidden="true" />
                                        {lnk.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
