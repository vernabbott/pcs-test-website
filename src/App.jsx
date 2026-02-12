import React, { useEffect, useRef, useState } from 'react';

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash || '#/');

  const baseUrl =
    (typeof import.meta !== 'undefined' &&
      import.meta.env &&
      typeof import.meta.env.BASE_URL === 'string')
      ? import.meta.env.BASE_URL
      : '/';

  const assetUrl = (path) => {
    const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const clean = String(path || '').replace(/^\/+/, '');
    return `${base}${clean}`;
  };

  const [estimateForm, setEstimateForm] = useState({
    emailAddress: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    roofSize: '',
    roofType: '',
  });

  const updateEstimateForm = (field, value) => {
    setEstimateForm((prev) => ({ ...prev, [field]: value }));
  };

  const estimateFieldClass =
    'w-[calc(100%-40px)] rounded-[8px] border-2 border-[#B1BCCB] bg-transparent px-[20px] py-[10.5px] text-[24px] text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-[#B1BCCB]';
  const contactFieldClass =
    'w-full rounded-[8px] border-2 border-[#B1BCCB] bg-transparent px-[20px] py-[10.5px] text-[24px] text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-[#B1BCCB]';

  const [estimateSubmitStatus, setEstimateSubmitStatus] = useState(null); // null | 'success' | 'error'
  const testimonialImages = ['testimony1.png', 'testimony2.png', 'testimony3.png'];
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isTestimonialFadingOut, setIsTestimonialFadingOut] = useState(false);
  const testimonialIndexRef = useRef(0);
  const slideshowImages = [
    'Single Ply (1).jpg',
    'Single Ply (2).jpg',
    'Single Ply (10).jpg',
    'Single Ply (11).jpg',
    'Ballasted (5).jpg',
    'Metal (1).jpg',
    'Commercial1webp',
    'Commercial2.webp',
    'Commercial3.webp',
    'Commercial4.webp',
    'guage.jpg',
  ];
  const galleryCategoryIcons = [
    {
      id: 'single-ply',
      src: 'images/SP_roofing_icon.webp',
      alt: 'Single ply roofing',
      transform: 'translate(0%, 3.3%) scale(0.97)',
    },
    {
      id: 'modified-bitumen',
      src: 'images/MOD_roofing_icon.webp',
      alt: 'Modified bitumen roofing',
      transform: 'translate(0%, 2.5%) scale(1.03)',
    },
    {
      id: 'rock-ballasted',
      src: 'images/BAL_roofing_icon.webp',
      alt: 'Rock ballasted roofing',
      transform: 'translate(0%, 1.6%) scale(1.03)',
    },
    {
      id: 'metal',
      src: 'images/MET_roofing_icon.webp',
      alt: 'Metal roofing',
      transform: 'translate(0%, 3.6%) scale(1)',
    },
    {
      id: 'tar-gravel',
      src: 'images/TG_roofing_icon.webp',
      alt: 'Tar and gravel roofing',
      transform: 'translate(0%, 2.5%) scale(1.08)',
    },
  ];
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [isSlideshowFadingOut, setIsSlideshowFadingOut] = useState(false);
  const slideshowIndexRef = useRef(0);
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  // Scroll-triggered animations (recreates Divi-style "et_animated" behavior)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.pcs-anim'));
    if (!els.length) return;

    const obs = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('pcs-anim-in');
          } else {
            entry.target.classList.remove('pcs-anim-in');
          }
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [route]);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.pcs-fade-scroll'));
    if (!els.length) return;

    const obs = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.requestAnimationFrame(() => {
              entry.target.classList.add('pcs-fade-scroll-in');
            });
          } else {
            entry.target.classList.remove('pcs-fade-scroll-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [route]);

const navigate = (item) => {
  if (item === 'Home') {
    window.location.hash = '#/';
    return;
  }
  if (item === 'Our Team') {
    window.location.hash = '#/our-team';
    return;
  }
  if (item === 'Contact') {
    window.location.hash = '#/contact';
    return;
  }
  if (item === 'Services') {
    window.location.hash = '#/services';
    return;
  }
  if (item === 'Online Estimate') {
    window.location.hash = '#/online-estimate';
    return;
  }
  if (item === 'Testimonials') {
    window.location.hash = '#/testimonials';
    return;
  }
  if (item === 'Gallery') {
    window.location.hash = '#/gallery';
    return;
  }
  if (item === 'FAQ') {
    window.location.hash = '#/faq';
    return;
  }
  alert(`${item} clicked`);
};

  const scrollToGallerySection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submitEstimate = () => {
    if (!isEstimateFormComplete) return;

    // Temporary UI-only behavior
    setEstimateSubmitStatus('success');

    // Optional: clear form
    setEstimateForm({
      emailAddress: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      roofSize: '',
      roofType: '',
    });
  };

  const isOurTeam = route === '#/our-team';
  const isContact = route === '#/contact';
  const isServices = route === '#/services';
  const isOnlineEstimate = route === '#/online-estimate';
  const isTestimonials = route === '#/testimonials';
  const isGallery = route === '#/gallery';
  const isFaq = route === '#/faq';
  const isHome =
    !isOurTeam && !isContact && !isServices && !isOnlineEstimate && !isTestimonials && !isGallery && !isFaq;
  const isEstimateFormComplete = [
    estimateForm.emailAddress,
    estimateForm.streetAddress,
    estimateForm.city,
    estimateForm.state,
    estimateForm.zip,
    estimateForm.roofSize,
  ].every((v) => String(v ?? '').trim() !== '');

  useEffect(() => {
    testimonialIndexRef.current = testimonialIndex;
  }, [testimonialIndex]);

  useEffect(() => {
    slideshowIndexRef.current = slideshowIndex;
  }, [slideshowIndex]);

  useEffect(() => {
    if (!isHome || testimonialImages.length < 2) return;
    let timeoutId;
    const scheduleNext = () => {
      timeoutId = window.setTimeout(() => {
        setIsTestimonialFadingOut(true);
        timeoutId = window.setTimeout(() => {
          const currentIndex = testimonialIndexRef.current;
          const nextIndex = (currentIndex + 1) % testimonialImages.length;
          setTestimonialIndex(nextIndex);
          setIsTestimonialFadingOut(false);
          scheduleNext();
        }, 1000);
      }, 7000);
    };

    scheduleNext();
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [isHome, testimonialImages.length]);

  useEffect(() => {
    if (!isHome || slideshowImages.length < 2) return;
    let timeoutId;
    let fadeTimeoutId;

    const scheduleNext = () => {
      timeoutId = window.setTimeout(() => {
        setIsSlideshowFadingOut(true);
        fadeTimeoutId = window.setTimeout(() => {
          const currentIndex = slideshowIndexRef.current;
          const nextIndex = (currentIndex + 1) % slideshowImages.length;
          setSlideshowIndex(nextIndex);
          setIsSlideshowFadingOut(false);
          scheduleNext();
        }, 700);
      }, 4000);
    };

    scheduleNext();
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (fadeTimeoutId) window.clearTimeout(fadeTimeoutId);
    };
  }, [isHome, slideshowImages.length]);

  const goToSlideshowIndex = (index) => {
    if (index === slideshowIndexRef.current) return;
    setIsSlideshowFadingOut(true);
    window.setTimeout(() => {
      setSlideshowIndex(index);
      setIsSlideshowFadingOut(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header
        className="w-full bg-white"
        style={{ backgroundColor: '#ffffff', opacity: 1, backdropFilter: 'none', WebkitBackdropFilter: 'none' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-semibold tracking-[0.08em] text-[#1f2937]">
              {['Home', 'Services', 'Online Estimate', 'Testimonials', 'FAQ', 'Our Team', 'Gallery', 'Contact'].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    className="border-x border-b-0 border-black bg-transparent text-[18px] uppercase hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                    onClick={() => navigate(item)}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </nav>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4 flex justify-center">
          <a href="#/" aria-label="Go to home page" className="inline-flex items-center">
            <img
              src={assetUrl('images/pcs-logo.png')}
              alt="Professional Coating Systems"
              className="pcs-header-logo h-12 w-auto"
              onError={(e) => {
                const fallback =
                  'data:image/svg+xml;utf8,' +
                  encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="56">
                      <rect width="100%" height="100%" fill="#e5e7eb"/>
                      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="14" fill="#6b7280">/public/images/pcs-logo.png not found</text>
                    </svg>`
                  );
                e.currentTarget.src = fallback;
              }}
            />
          </a>
        </div>
      </header>

      {isGallery && (
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <div className="mx-auto flex min-w-max items-center justify-center gap-0 px-4 py-3">
                {galleryCategoryIcons.map((icon) => (
                  <button
                    key={icon.id}
                    type="button"
                    onClick={() => scrollToGallerySection(icon.id)}
                    className="inline-flex h-[284px] w-[284px] cursor-pointer items-center justify-center overflow-hidden border-0 bg-transparent p-0 shadow-none ring-0 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-0 sm:h-[338px] sm:w-[338px]"
                    aria-label={`Jump to ${icon.alt} section`}
                  >
                    <img
                      src={assetUrl(icon.src)}
                      alt={icon.alt}
                      className="pointer-events-none h-full w-full border-0 object-contain shadow-none"
                      style={{ transform: icon.transform, transformOrigin: '50% 50%' }}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isHome ? (
        <>
          <style>{`
            .pcs-fade-scroll {
              opacity: 0;
              transform: translateY(12px);
              transition: opacity 700ms ease, transform 700ms ease;
            }
            .pcs-fade-scroll.pcs-fade-scroll-in {
              opacity: 1;
              transform: translateY(0);
            }
          `}</style>
          <section
            className="pcs-fade-scroll relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
            style={{ backgroundImage: `url('${assetUrl('images/main-background.jpeg')}')` }}
          >
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            <div className="relative z-20 h-full w-full grid grid-cols-1 -mt-10">
              <div className="flex flex-col justify-start items-start gap-[30px] p-8 pt-[40px] h-full ml-[350px] mr-[350px]">
                <div
                  className="text-white text-center px-6 py-4 rounded-xl overflow-hidden shadow-md text-[42px] font-semibold"
                  style={{
                    backgroundColor: 'rgba(15,23,42,0.18)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    border: '1px solid rgba(148,163,184,0.45)',
                    color: 'white',
                    borderRadius: '0.75rem',
                  }}
                >
                  Save up to 70% compared to traditional roof replacement
                </div>
                <div
                  className="text-white text-center px-6 py-4 rounded-xl overflow-hidden shadow-md text-[42px] font-semibold"
                  style={{
                    backgroundColor: 'rgba(15,23,42,0.18)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    border: '1px solid rgba(148,163,184,0.45)',
                    color: 'white',
                    borderRadius: '0.75rem',
                  }}
                >
                  Extend the life of your roof up to 20-years with material and labor warranties
                </div>
                <div
                  className="text-white text-center px-6 py-4 rounded-xl overflow-hidden shadow-md text-[42px] font-semibold"
                  style={{
                    backgroundColor: 'rgba(15,23,42,0.18)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    border: '1px solid rgba(148,163,184,0.45)',
                    color: 'white',
                    borderRadius: '0.75rem',
                  }}
                >
                  Improve energy efficiency with a cool roof system that reflects heat
                </div>
                <div
                  className="text-white text-center px-6 py-4 rounded-xl overflow-hidden shadow-md text-[39px] font-semibold"
                  style={{
                    backgroundColor: 'rgba(15,23,42,0.18)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    border: '1px solid rgba(148,163,184,0.45)',
                    color: 'white',
                    borderRadius: '0.75rem',
                  }}
                >
                  Avoid business disruption by applying the system without a complete tear-off
                </div>
                <div
                  className="text-white text-center px-6 py-4 rounded-xl overflow-hidden shadow-md text-[39px] font-semibold"
                  style={{
                    backgroundColor: 'rgba(15,23,42,0.18)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    border: '1px solid rgba(148,163,184,0.45)',
                    color: 'white',
                    borderRadius: '0.75rem',
                  }}
                >
                  See below for information about potential tax savings
                </div>
              </div>
            </div>
          </section>
          <section className="w-full bg-white pt-[30px] pb-6">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-nowrap items-center justify-center gap-[30px]">
                <a
                  href="#/contact"
                  className="flex min-h-[90px] w-[360px] items-center justify-center rounded-2xl border-2 border-[#3b1b0f] bg-gradient-to-b from-[#b45309] to-[#92400e] px-8 py-4 text-center text-[30px] font-semibold tracking-wide text-black no-underline shadow-[5px_8px_0_#3b1b0f,5px_16px_24px_rgba(0,0,0,0.28)] transition-transform active:translate-y-[2px]"
                  style={{ fontFamily: 'inherit' }}
                >
                  <span className="leading-tight">
                    SCHEDULE A FREE
                    <br />
                    CONSULTATION TODAY
                  </span>
                </a>
                <a
                  href="#/online-estimate"
                  className="flex min-h-[90px] w-[360px] items-center justify-center rounded-2xl border-2 border-[#3b1b0f] bg-gradient-to-b from-[#b45309] to-[#92400e] px-8 py-4 text-center text-[30px] font-semibold tracking-wide text-black no-underline shadow-[5px_8px_0_#3b1b0f,5px_16px_24px_rgba(0,0,0,0.28)] transition-transform active:translate-y-[2px]"
                  style={{ fontFamily: 'inherit' }}
                >
                  <span className="leading-tight">
                    REQUEST AN ONLINE
                    <br />
                    QUOTE
                  </span>
                </a>
              </div>
            </div>
          </section>
          <section className="w-full bg-white py-10 mt-[90px]">
            <style>{`
              .pcs-experience-wrap {
                position: relative;
                padding-left: 36px;
              }
              .pcs-experience-bar {
                position: absolute;
                left: 0;
                top: 6px;
                width: 6px;
                height: calc(100% - 12px);
                background: #0f172a;
              }
              .pcs-experience-text {
                font-family: Arial, sans-serif;
              }
            `}</style>
            <div className="mx-auto max-w-[76.8rem] px-4 sm:px-6 lg:px-8">
              <div className="pcs-experience-wrap">
                <div className="pcs-experience-bar" aria-hidden="true"></div>
                <div className="pcs-experience-text text-center uppercase">
                  <h2 className="text-[48px] font-semibold text-gray-900">EXPERIENCE MATTERS</h2>
                  <h3 className="mt-2 text-[40px] font-semibold text-gray-900">PROFESSIONAL COATING SYSTEMS</h3>
                  <p className="mt-3 text-[40px] text-gray-700">
                    YOUR ONE STOP SILICONE ROOF COATING SPECIALIST
                  </p>
                  <p className="mt-4 text-[40px] font-semibold text-gray-800">
                    PCS IS PROUD TO BE THE ONLY UNIFLEX ELITE CONTRACTOR IN THE ROCKY MOUNTAIN REGION
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full bg-white py-10 mt-[90px]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-[40px]">
              <img
                src={assetUrl('images/premierelite.webp')}
                alt="Premier Elite"
                className="h-[150px] w-auto max-w-full"
                loading="lazy"
                onError={(e) => {
                  console.error('Premier Elite image not found:', assetUrl('images/premierelite.webp'));
                  e.currentTarget.style.display = 'none';
                }}
              />
              <img
                src={assetUrl('images/gaco-2024-top-contractor.webp')}
                alt="Gaco 2024 Top Contractor"
                className="h-[150px] w-auto max-w-full"
                loading="lazy"
                onError={(e) => {
                  console.error(
                    'Gaco 2024 Top Contractor image not found:',
                    assetUrl('images/gaco-2024-top-contractor.webp')
                  );
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </section>
          <section className="w-full bg-white py-10 mt-[110px]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl bg-slate-50 p-6 shadow-sm flex justify-center">
                <div className="relative w-full max-w-[80%] grid">
                  <img
                    src={assetUrl('images/taxsavings.jpeg')}
                    alt="Tax savings illustration"
                    className="pcs-fade-scroll block h-auto w-full object-contain row-start-1 col-start-1"
                    loading="lazy"
                    onError={(e) => {
                      console.error('Tax savings image not found:', assetUrl('images/taxsavings.jpeg'));
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="row-start-1 col-start-1 z-10 flex items-center justify-center p-6">
                    <div className="flex flex-col items-center">
                      <div
                        className="mb-[34px] text-[50px] font-semibold text-slate-900"
                        style={{ fontFamily: 'Arial, sans-serif' }}
                      >
                        Potential Tax Deduction
                      </div>
                      <div
                        className="max-w-[calc(85%-260px)] rounded-xl bg-white/80 px-6 py-4 text-[36px] leading-relaxed text-sky-500 shadow-lg"
                        style={{
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          fontFamily: 'Arial, sans-serif',
                        }}
                      >
                        Upgrading to a cool-roof system like silicone coating may help you qualify for a federal tax deduction. 
                        Section 179D is a federal tax deduction that incentivizes building owners and designers to install/upgrade
                        energy-efficient systems in commercial buildings. This deduction allows for substantial tax
                        savings of up to $5.81 per square foot for qualifying improvement projects to buidling envelope, interior 
                        lighting, and HVAC. Projects must reduce energy use by at least 25% compared to a reference building and 
                        begin prior to June 30, 2026.
                      </div>
                      <a
                        href="https://www.irs.gov/credits-deductions/energy-efficient-commercial-buildings-deduction"
                        className="mt-[32px] text-[30px] text-sky-600 hover:text-sky-700 underline"
                        style={{ fontFamily: 'Arial, sans-serif' }}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit the IRS Energy Efficient Commercial Buildings Deduction website
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full bg-white py-10 mt-[90px]">
            <style>{`
              .pcs-slideshow-fade {
                transition: opacity 700ms ease-in-out;
              }
              .pcs-slideshow-dot {
                width: 12px;
                height: 12px;
                border-radius: 999px;
                background: #bfbfbf;
                opacity: 1;
                border: none;
                transition: background-color 200ms ease;
              }
              .pcs-slideshow-dot-active {
                background: #000000;
              }
            `}</style>
            <div className="mx-auto max-w-none px-[200px]">
              <div className="relative mx-auto min-h-[520px] max-w-4xl overflow-hidden flex items-center justify-center">
                <div
                  className="absolute inset-0 flex items-center justify-center pcs-slideshow-fade"
                  style={{ opacity: isSlideshowFadingOut ? 0 : 1 }}
                >
                  <img
                    src={assetUrl(`images/gallery/${encodeURIComponent(slideshowImages[slideshowIndex])}`)}
                    alt="Roofing project slideshow"
                    className="max-h-[520px] w-auto h-auto object-contain"
                    loading="lazy"
                    onError={(e) => {
                      console.error(
                        'Slideshow image not found:',
                        assetUrl(`images/gallery/${encodeURIComponent(slideshowImages[slideshowIndex])}`)
                      );
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <div className="mt-[10px] flex items-center justify-center gap-[20px]">
                {slideshowImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    aria-label={`View slide ${index + 1}`}
                    className={`pcs-slideshow-dot ${index === slideshowIndex ? 'pcs-slideshow-dot-active' : ''}`}
                    onClick={() => goToSlideshowIndex(index)}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="w-full bg-white py-10 mt-[90px]">
            <style>{`
              .pcs-testimonial-fade {
                transition: opacity 1000ms ease-in-out;
              }
            `}</style>
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="relative mx-auto min-h-[620px] max-w-3xl overflow-hidden flex items-center justify-center">
                <div
                  className="absolute inset-0 flex items-center justify-center pcs-testimonial-fade"
                  style={{ opacity: isTestimonialFadingOut ? 0 : 1 }}
                >
                  <img
                    src={assetUrl(`images/${testimonialImages[testimonialIndex]}`)}
                    alt="Customer testimonial"
                    className="max-h-[600px] w-auto h-auto object-contain"
                    loading="lazy"
                    onError={(e) => {
                      console.error(
                        'Testimonial image not found:',
                        assetUrl(`images/${testimonialImages[testimonialIndex]}`)
                      );
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      ) : isOurTeam ? (
        <main className="mx-auto max-w-7xl px-2 sm:px-3 lg:px-4 py-10">
          <style>{`
            @keyframes pcsSlideTop {
              from { opacity: 0; transform: translateY(28px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes pcsZoom {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
            @keyframes pcsFoldLeft {
              from { opacity: 0; transform: translateX(-28px); }
              to { opacity: 1; transform: translateX(0); }
            }

            .pcs-anim { opacity: 0; }
            .pcs-anim.pcs-slideTop.pcs-anim-in { animation: pcsSlideTop 900ms ease-in-out both; }
            .pcs-anim.pcs-zoom.pcs-anim-in { animation: pcsZoom 900ms ease-in-out both; }
            .pcs-anim.pcs-foldLeft.pcs-anim-in { animation: pcsFoldLeft 900ms ease-in-out both; }

            .pcs-delay-0 { animation-delay: 0ms; }
            .pcs-delay-150 { animation-delay: 150ms; }
            .pcs-delay-300 { animation-delay: 300ms; }
            .pcs-delay-450 { animation-delay: 450ms; }
            .pcs-delay-600 { animation-delay: 600ms; }
          `}</style>

          <div className="mt-10 space-y-[30px]">
            {[
              {
                name: 'RICHARD WINGER',
                title: 'President',
                phone: '720-388-0801',
                email: 'richard@procoatingsystems.com',
                image: 'richard-winger.webp',
              },
              {
                name: 'MARK BURCHAM',
                title: 'Vice President',
                phone: '303-929-4244',
                email: 'mark@procoatingsystems.com',
                image: 'mark-burcham.webp',
              },
              {
                name: 'JEMMA WINGER',
                title: 'Office',
                phone: '720-688-3133',
                email: 'jemma@procoatingsystems.com',
                image: 'jemma-winger.webp',
              },
              {
                name: 'DAVID ESTES',
                title: 'Chief Estimator',
                phone: '303-501-2315',
                email: 'david@procoatingsystems.com',
                image: 'david-estes.webp',
              },
            ].map((p, index) => (
              <div
                key={p.name}
                className="grid w-full grid-cols-[35%_65%] gap-6 rounded-xl p-6 shadow-sm items-start pcs-anim pcs-zoom pcs-delay-150"
              >
                <div className="w-full flex items-center justify-center">
                  <img
                    src={assetUrl(`images/${p.image}`)}
                    alt={p.name}
                    className="mx-auto w-[300px] object-cover rounded-lg"
                    loading="lazy"
                    onError={(e) => {
                      console.error('Team image not found:', assetUrl(`images/${p.image}`));
                      const fallback =
                        'data:image/svg+xml;utf8,' +
                        encodeURIComponent(
                          `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
                            <rect width="100%" height="100%" fill="#f3f4f6"/>
                            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                              font-family="Arial,Helvetica,sans-serif" font-size="18" fill="#6b7280">
                              Image not found
                            </text>
                          </svg>`
                        );
                      e.currentTarget.src = fallback;
                    }}
                    />
                  </div>
                <div className="flex h-full items-start gap-[50px]">
                  <div className="w-[8px] bg-[#1f2937] self-stretch" aria-hidden="true" />
                  <div className="flex flex-col text-left text-[18px] leading-[1.7] text-[#6b6b6b]">
                    <div className="text-[32px] font-semibold tracking-wide text-[#333333] leading-tight">{p.name}</div>
                    <div className="text-[22px]">{p.title}</div>
                    <div className="mt-4 space-y-2">
                      <div>
                        <span className="font-semibold">Phone:</span>
                        <a href={`tel:${p.phone}`} className="hover:underline">
                          {p.phone}
                        </a>
                      </div>
                      <div>
                        <span className="font-semibold">Email:</span>{' '}
                        <a href={`mailto:${p.email}`} className="hover:underline">
                          {p.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center pcs-anim pcs-slideTop pcs-delay-300">
            <img
              src={assetUrl('images/crew.webp')}
              alt="Professional Coating Systems Crew"
              className="mt-[30px] w-[75%] rounded-xl shadow-sm"
              loading="lazy"
              onError={(e) => {
                console.error('Crew image not found:', assetUrl('images/crew.webp'));
                const fallback =
                  'data:image/svg+xml;utf8,' +
                  encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400">
                      <rect width="100%" height="100%" fill="#f3f4f6"/>
                      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                        font-family="Arial,Helvetica,sans-serif" font-size="20" fill="#6b7280">
                        Crew image not found
                      </text>
                    </svg>`
                  );
                e.currentTarget.src = fallback;
              }}
            />
          </div>
        </main>
      ) : isServices ? (
        <main
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10"
          style={{ fontFamily: '"Open Sans", Arial, sans-serif' }}
        >
          <style>{`
            @keyframes pcsSlideTop {
              from { opacity: 0; transform: translateY(28px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes pcsZoom {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
            @keyframes pcsFoldLeft {
              from { opacity: 0; transform: translateX(-28px); }
              to { opacity: 1; transform: translateX(0); }
            }

            .pcs-anim { opacity: 0; }
            .pcs-anim.pcs-slideTop.pcs-anim-in { animation: pcsSlideTop 900ms ease-in-out both; }
            .pcs-anim.pcs-zoom.pcs-anim-in { animation: pcsZoom 900ms ease-in-out both; }
            .pcs-anim.pcs-foldLeft.pcs-anim-in { animation: pcsFoldLeft 900ms ease-in-out both; }

            .pcs-delay-0 { animation-delay: 0ms; }
            .pcs-delay-150 { animation-delay: 150ms; }
            .pcs-delay-300 { animation-delay: 300ms; }
            .pcs-delay-450 { animation-delay: 450ms; }
            .pcs-delay-600 { animation-delay: 600ms; }
          `}</style>

          <div className="mt-8 rounded-2xl overflow-hidden pcs-anim pcs-slideTop pcs-delay-0">
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight">Our Services</h1>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-[30%_70%] gap-x-8 gap-y-[50px]">
            <div className="rounded-2xl overflow-hidden shadow-sm pcs-anim pcs-zoom pcs-delay-150">
              <img
                src={assetUrl('images/commercial-roof-svc.webp')}
                alt="Commercial Roof"
                className="w-[92%] h-auto object-contain mx-auto"
                loading="lazy"
                style={{ background: '#f3f4f6' }}
                onError={e => {
                  console.error('Services image not found:', assetUrl('images/commercial-roof-svc.webp'));
                  e.currentTarget.src =
                    'data:image/svg+xml;utf8,' +
                    encodeURIComponent(
                      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="270">
                        <rect width="100%" height="100%" fill="#f3f4f6"/>
                        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                          font-family="Arial,Helvetica,sans-serif" font-size="20" fill="#6b7280">
                          Image not found
                        </text>
                      </svg>`
                    );
                }}
              />
            </div>
            <div className="flex flex-col text-[18px] leading-[1.7] text-[#6b6b6b]">
              <div className="flex items-center gap-4">
                <div className="h-[40px] w-[8px] bg-gray-200" aria-hidden="true" />
                <div
                  className="text-[32px] tracking-wide text-[#333333] pcs-anim pcs-foldLeft pcs-delay-300"
                  style={{ fontWeight: 700 }}
                >
                  COMMERCIAL ROOFS
                </div>
              </div>
              <div className="mt-6 pl-[24px] pr-[150px] pcs-anim pcs-slideTop pcs-delay-450">
                <p>
                  The combination of seasonal storms and the year-round sun takes a real toll on flat commercial roofs in Colorado. As a commercial or industrial building owner, you know how expensive it is to re-roof even a small building. Professional Coating Systems offers a way to protect those commercial roofs with our long-lasting and affordable roof coatings.
                </p>
                <p className="mt-3">
                  <strong>LONG-TERM WATERPROOF PROTECTION</strong>
                  <br />
                  Most flat roof coatings fail because they can&#8217;t hold up to ponding water. Traditional coatings eventually bubble and peel away from the roof&#8217;s substrate and that exposes your building&#8217;s structure to further damage. Our products are 100% silicone which provides long-term waterproofing protection. The coating weathers severe storms and is impervious to the permanent ponding that occurs on most flat commercial rooftops.
                </p>
                <div className="mt-4 text-[#555555]" style={{ fontWeight: 700 }}>
                  TIME AND MONEY SAVINGS BENEFITS
                </div>
                <div>
                  Regardless of project size, our coating process is completed in a fraction of the time it takes to replace a commercial roof. You also enjoy these money-saving benefits:
                  <ul className="mt-2 space-y-2 list-disc pl-6">
                    <li>No labor or landfill expenses from hauling away tear-offs</li>
                    <li>No need to interrupt business or shut down operations</li>
                    <li>Reduced cooling costs from UV reflective coatings</li>
                    <li>Significant extension of existing roof and substrate life</li>
                    <li>No need for repeat applications every few years</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm pcs-anim pcs-zoom pcs-delay-150">
              <img
                src={assetUrl('images/repair-maintenance-svc.webp')}
                alt="Repairs and Maintenance"
                className="w-[92%] h-auto object-contain mx-auto"
                loading="lazy"
                style={{ background: '#f3f4f6' }}
                onError={e => {
                  console.error('Services image not found:', assetUrl('images/repair-maintenance-svc.webp'));
                  e.currentTarget.src =
                    'data:image/svg+xml;utf8,' +
                    encodeURIComponent(
                      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="270">
                        <rect width="100%" height="100%" fill="#f3f4f6"/>
                        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                          font-family="Arial,Helvetica,sans-serif" font-size="20" fill="#6b7280">
                          Image not found
                        </text>
                      </svg>`
                    );
                }}
              />
            </div>
            <div className="flex flex-col text-[18px] leading-[1.7] text-[#6b6b6b]">
              <div className="flex items-center gap-4">
                <div className="h-[40px] w-[8px] bg-gray-200" aria-hidden="true" />
                <div
                  className="text-[32px] tracking-wide text-[#333333] pcs-anim pcs-foldLeft pcs-delay-300"
                  style={{ fontWeight: 700 }}
                >
                  REPAIRS AND MAINTENANCE
                </div>
              </div>
              <div className="mt-6 pl-[24px] pr-[150px] pcs-anim pcs-slideTop pcs-delay-450">
                <p>
                  Are you experiencing leaks but are unsure if you need a full roof replacement? We can provide you with the option of an energy efficient, maintenance-free, silicone roof coating system to extend the life of the roof.
                </p>
              </div>
            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="mt-[66px] grid grid-cols-[30%_70%] gap-x-8">
            <div aria-hidden="true" />
            <div>
              <h2
                className="pl-[24px] text-[32px] tracking-wide text-[#333333] uppercase pcs-anim pcs-foldLeft pcs-delay-300"
                style={{ fontWeight: 700 }}
              >
                Why Choose Us
              </h2>
              <div className="mt-10 max-w-3xl pl-[24px] pr-[150px] text-left text-[18px] leading-[1.9] text-[#3f3f3f]">
                <p>
                  We are proud to be one of the nation's leading silicone roof coating companies, renowned for our
                  exceptional craftsmanship, customer service, and commitment to providing durable, high-performance
                  solutions. Specializing in silicone roofing, we offer coatings that provide outstanding{' '}
                  <strong>weather resistance</strong>, <strong>water resistance</strong>, and{' '}
                  <strong>energy efficiency</strong> to protect your roof and ensure long-term performance.
                </p>
                <p className="mt-6">
                  Our team of skilled professionals is dedicated to delivering top-tier solutions tailored to your
                  specific needs. By using only the highest quality materials and cutting-edge techniques, we guarantee
                  that every project is completed with precision and <strong>flexibility</strong>. Our{' '}
                  <strong>silicone roofing</strong> systems are known for their <strong>durability</strong>,{' '}
                  <strong>smooth surface</strong>, and ability to withstand the harshest weather conditions, offering
                  superior protection and <strong>energy efficiency</strong>.
                </p>
                <p className="mt-6">
                  What truly sets us apart is our unwavering commitment to <strong>environmentally friendly</strong>{' '}
                  solutions. We focus on sustainability by using materials that not only enhance performance but also
                  minimize the environmental impact. Our attention to detail and dedication to delivering{' '}
                  <strong>long-lasting results</strong> has earned us a trusted reputation in the industry.
                </p>
                <p className="mt-6">
                  When you choose us, you're partnering with a company that prioritizes your satisfaction. We
                  understand your unique needs and work to ensure that your roof is protected from the elements while
                  enhancing the lifespan of your property. With our focus on <strong>flexibility</strong> and{' '}
                  <strong>durability</strong>, you can trust us to deliver reliable,{' '}
                  <strong>weather-resistant</strong> results that stand the test of time.
                </p>
              </div>
            </div>
          </div>


        </main>
      ) : isOnlineEstimate ? (
        <main className="mx-auto max-w-7xl px-[200px] py-10">
          <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-[32px] font-semibold tracking-tight text-gray-900">Request an Online Estimate</h2>
            <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-[16px] font-bold text-red-600">
              PLEASE NOTE: We do not offer residential services. Our services focus on commercial, multi-family, and
              other large structures.
            </div>

            <form className="mt-[30px] space-y-4">
              <label className="block">
                <span className="text-[16px] font-semibold text-gray-800">Email Address</span>
                <input
                  type="email"
                  value={estimateForm.emailAddress}
                  onChange={(e) => updateEstimateForm('emailAddress', e.target.value)}
                  className={`mt-2 ${contactFieldClass}`}
                  placeholder="you@example.com"
                />
              </label>

              <label className="block mt-[10px]">
                <span className="text-[16px] font-semibold text-gray-800">Street Address</span>
                <input
                  type="text"
                  value={estimateForm.streetAddress}
                  onChange={(e) => updateEstimateForm('streetAddress', e.target.value)}
                  className={`mt-2 ${contactFieldClass}`}
                  placeholder="Street Address *"
                />
              </label>

              <label className="block mt-[10px]">
                <span className="text-[16px] font-semibold text-gray-800">City</span>
                <input
                  type="text"
                  value={estimateForm.city}
                  onChange={(e) => updateEstimateForm('city', e.target.value)}
                  className={`mt-2 ${contactFieldClass}`}
                  placeholder="City *"
                />
              </label>

              <label className="block mt-[10px]">
                <span className="text-[16px] font-semibold text-gray-800">State</span>
                <input
                  type="text"
                  value={estimateForm.state}
                  onChange={(e) => updateEstimateForm('state', e.target.value)}
                  className={`mt-2 ${contactFieldClass}`}
                  placeholder="State *"
                />
              </label>

              <label className="block mt-[10px]">
                <span className="text-[16px] font-semibold text-gray-800">Zip Code</span>
                <input
                  type="text"
                  value={estimateForm.zip}
                  onChange={(e) => updateEstimateForm('zip', e.target.value)}
                  className={`mt-2 ${contactFieldClass}`}
                  placeholder="Zip Code *"
                />
              </label>

              <label className="block mt-[10px]">
                <span className="text-[16px] font-semibold text-gray-800">Estimated Roof Size (sqft)</span>
                <input
                  type="text"
                  value={estimateForm.roofSize}
                  onChange={(e) => updateEstimateForm('roofSize', e.target.value)}
                  className={`mt-2 ${contactFieldClass}`}
                  placeholder="Estimated Roof Size (sqft) *"
                />
              </label>

              <div className="pt-[20px] flex justify-center">
                <button
                  type="button"
                  disabled={!isEstimateFormComplete}
                  className={`rounded-xl px-6 py-3 text-[18px] font-semibold text-white transition ${
                    !isEstimateFormComplete ? 'bg-gray-500 cursor-not-allowed opacity-60' : 'bg-gray-900 hover:opacity-90'
                  }`}
                  onClick={submitEstimate}
                >
                  Submit
                </button>
              </div>

              {estimateSubmitStatus === 'success' && (
                <div className="mt-3 text-sm text-green-600">
                  Thanks — we received your request.
                </div>
              )}
              {estimateSubmitStatus === 'error' && (
                <div className="mt-3 text-sm text-red-600">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </main>
      ) : isTestimonials ? (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="mt-8 text-center">
            <h1 className="text-5xl font-semibold tracking-tight">Testimonials</h1>
            <p className="mt-4 text-[22px] text-gray-700 mx-auto max-w-3xl">
              Here’s what our customers are saying about Professional Coating Systems.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[
              {
                name: 'Customer Name',
                company: 'Company / Property (optional)',
                quote:
                  'PCS was professional from start to finish. Great communication and the finished roof looks fantastic.',
                project: 'Project Type (optional)',
                image: 'testimony1.png',
              },
              {
                name: 'Customer Name',
                company: 'Company / Property (optional)',
                quote:
                  'They delivered exactly what they promised and stayed on schedule. Highly recommend.',
                project: 'Project Type (optional)',
                image: 'testimony2.png',
                imageClassName: 'w-[123px]',
              },
              {
                name: 'Customer Name',
                company: 'Company / Property (optional)',
                quote:
                  'We avoided a full tear-off and saved significant money. The team was clean, courteous, and efficient.',
                project: 'Project Type (optional)',
                image: 'testimony3.png',
              },
              {
                name: 'Customer Name',
                company: 'Company / Property (optional)',
                quote:
                  'Excellent workmanship and attention to detail. The warranty options made this an easy decision.',
                project: 'Project Type (optional)',
              },
            ].map((t, idx) => (
              <div key={`${t.name}-${idx}`} className="rounded-2xl p-8 shadow-sm">
                {t.image && (
                  <div className="mb-[20px] flex justify-center">
                    <img
                      src={assetUrl(`images/${t.image}`)}
                      alt={t.name}
                      className={`h-20 w-auto object-contain ${t.imageClassName || ''}`}
                      loading="lazy"
                      onError={(e) => {
                        console.error('Testimonial image not found:', assetUrl(`images/${t.image}`));
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                {(t.company || t.project || t.name) && <div className="mt-6" />}
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-gray-50 p-8 text-center">
            <div className="text-2xl font-semibold">Want to share feedback?</div>
            <p className="mt-2 text-[20px] text-gray-700">
              We’d love to hear from you. Contact us and we can add your testimonial.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                className="rounded-xl px-6 py-3 text-[18px] font-semibold text-white bg-gray-900 hover:opacity-90"
                onClick={() => (window.location.hash = '#/contact')}
              >
                Contact Us
              </button>
            </div>
          </div>
        </main>
      ) : isGallery ? (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <style>{`
            .pcs-gallery-photo.pcs-fade-scroll {
              opacity: 0;
              transition: opacity 500ms ease-in-out;
              will-change: opacity;
            }
            .pcs-gallery-photo.pcs-fade-scroll.pcs-fade-scroll-in {
              opacity: 1;
            }
          `}</style>
          <div className="mt-12">
            <div className="mb-6">
              <h2
                id="single-ply"
                className="scroll-mt-24 border-y border-gray-300 py-3 text-center text-3xl font-semibold tracking-tight"
              >
                Single Ply Roofing
              </h2>
            </div>
            <div className="columns-2 md:columns-4 gap-4">
              {[
                'Single Ply (7).jpg',
                'Single Ply (8).jpg',
                'Single Ply (1).jpg',
                'Single Ply (2).jpg',
                'Single Ply (3).jpg',
                'Single Ply (4).jpg',
                'Single Ply (5).jpg',
                'Single Ply (6).jpg',
                'Single Ply (9).jpg',
                'Single Ply (10).jpg',
                'Single Ply (11).jpg',
                'Single Ply (12).jpg',
                'Single Ply (13).jpg',
                'guage.jpg',
              ].map((img) => (
                <div
                  key={img}
                  className="pcs-gallery-photo pcs-fade-scroll mb-4 break-inside-avoid rounded-2xl overflow-hidden bg-gray-100 shadow-sm"
                >
                  <img
                    src={assetUrl(`images/gallery/${encodeURIComponent(img)}`)}
                    alt="Single ply roofing project"
                    className="h-auto w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <div className="mb-6">
              <h2
                id="modified-bitumen"
                className="scroll-mt-24 border-y border-gray-300 py-3 text-center text-3xl font-semibold tracking-tight"
              >
                Modified Bitumen (Mod Bit) Roofing
              </h2>
            </div>
            <div className="columns-2 md:columns-4 gap-4">
              {[
                'Mod Bit (1).JPG',
                'Mod Bit (2).JPG',
                'Mod Bit (3).JPG',
                'Mod Bit (4).JPG',
                'Mod Bit (5).jpg',
                'Mod Bit (6).jpg',
                'Mod Bit (7).jpg',
                'Mod Bit (8).jpg',
              ].map((img) => (
                <div
                  key={img}
                  className="pcs-gallery-photo pcs-fade-scroll mb-4 break-inside-avoid rounded-2xl overflow-hidden bg-gray-100 shadow-sm"
                >
                  <img
                    src={assetUrl(`images/gallery/${encodeURIComponent(img)}`)}
                    alt="Mod bit roofing project"
                    className="h-auto w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <div className="mb-6">
              <h2
                id="rock-ballasted"
                className="scroll-mt-24 border-y border-gray-300 py-3 text-center text-3xl font-semibold tracking-tight"
              >
                Rock Ballasted Roofing
              </h2>
            </div>
            <div className="columns-2 md:columns-4 gap-4">
              {[
                'Ballasted (1).jpg',
                'Ballasted (2).jpg',
                'Ballasted (3).jpg',
                'Ballasted (4).jpg',
                'Ballasted (5).jpg',
              ].map((img) => (
                <div
                  key={img}
                  className="pcs-gallery-photo pcs-fade-scroll mb-4 break-inside-avoid rounded-2xl overflow-hidden bg-gray-100 shadow-sm"
                >
                  <img
                    src={assetUrl(`images/gallery/${encodeURIComponent(img)}`)}
                    alt="Rock ballasted roofing project"
                    className="h-auto w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <div className="mb-6">
              <h2
                id="metal"
                className="scroll-mt-24 border-y border-gray-300 py-3 text-center text-3xl font-semibold tracking-tight"
              >
                Metal Roofing
              </h2>
            </div>
            <div className="columns-2 md:columns-4 gap-4">
              {[
                'Metal (9).jpg',
                'Metal (10).jpg',
                'Metal (1).jpg',
                'Metal (2).jpg',
                'Metal (3).jpg',
                'Metal (4).jpg',
                'Metal (5).jpg',
                'Metal (6).jpg',
                'Metal (7).jpg',
                'Metal (8).jpg',
                'Metal (11).jpg',
                'Metal (12).jpg',
                'Metal (13).jpg',
                'Metal (14).jpg',
              ].map((img) => {
                return (
                  <div
                    key={img}
                    className="pcs-gallery-photo pcs-fade-scroll mb-4 break-inside-avoid rounded-2xl overflow-hidden bg-gray-100 shadow-sm"
                  >
                  <img
                    src={assetUrl(`images/gallery/${encodeURIComponent(img)}`)}
                    alt="Metal roofing project"
                    className="h-auto w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16">
            <div className="mb-6">
              <h2
                id="tar-gravel"
                className="scroll-mt-24 border-y border-gray-300 py-3 text-center text-3xl font-semibold tracking-tight"
              >
                Tar &amp; Gravel Roofing
              </h2>
            </div>
            <div className="columns-2 md:columns-4 gap-4">
              {[
                'Tar and Gravel (1).jpg',
                'Tar and Gravel (2).jpg',
                'Tar and Gravel (12).JPG',
                'Tar and Gravel (3).jpg',
                'Tar and Gravel (4).jpg',
                'Tar and Gravel (5).jpg',
                'Tar and Gravel (6).jpg',
                'Tar and Gravel (7).jpg',
                'Tar and Gravel (8).jpg',
                'Tar and Gravel (9).jpg',
                'Tar and Gravel (10).jpg',
                'Tar and Gravel (11).jpg',
                'Tar and Gravel (13).jpg',
              ].map((img) => (
                <div
                  key={img}
                  className="pcs-gallery-photo pcs-fade-scroll mb-4 break-inside-avoid rounded-2xl overflow-hidden bg-gray-100 shadow-sm"
                >
                  <img
                    src={assetUrl(`images/gallery/${encodeURIComponent(img)}`)}
                    alt="Tar and gravel roofing project"
                    className="h-auto w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
      ) : isFaq ? (
        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 pcs-faq">
          <style>{`
            .pcs-faq {
              font-family: "Open Sans", Arial, sans-serif;
              font-size: 14px;
              line-height: 1.7;
              color: #666;
            }
            .pcs-faq-heading {
              font-size: 26px;
              font-weight: 500;
              color: #333;
            }
            .pcs-faq-toggle {
              border: 1px solid #d9d9d9;
            }
            .pcs-faq-toggle + .pcs-faq-toggle {
              margin-top: 10px;
            }
            .pcs-faq-toggle-open {
              background-color: #fff;
              padding: 20px;
            }
            .pcs-faq-toggle-closed {
              background-color: #f4f4f4;
              padding: 20px;
            }
            .pcs-faq-title {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 12px;
              text-align: left;
              font-size: 20px;
              font-weight: 700;
              color: #666;
              background: transparent;
              border: none;
              padding: 0;
            }
            .pcs-faq-title-open {
              color: #333;
            }
            .pcs-faq-icon {
              font-size: 16px;
              color: #ccc;
              line-height: 1;
            }
            .pcs-faq-content {
              padding-top: 20px;
              margin: 0;
              font-size: 16px;
              color: #666;
            }
          `}</style>
          <div className="mt-8 text-center">
            <h2 className="pcs-faq-heading">Frequently Asked Questions</h2>
          </div>

          <div className="mt-10 space-y-4">
            {[
              {
                question: 'Does coating my roof require a building permit?',
                answer:
                  'No, roof coatings are considered maintenance to the roof so a building permit is not required, ultimately saving time.',
              },
              {
                question: 'What if I have a ponding area where water never seems to dry?',
                answer:
                  'The high solids silicone allows for permanent ponding areas and snow pack. It is extremely durable and will not soften, bubble, or degrade.',
              },
              {
                question: "Will I notice a change in my building's energy bills?",
                answer:
                  'With a reflective roof, building owners have noticed a decrease in overall energy consumption.',
              },
              {
                question: 'How will my tenants be affected by a roof coating?',
                answer: 'Your tenants can continue their daily operations without interruption.',
              },
              {
                question: 'How does a silicone coating roof stand up to hail damage?',
                answer:
                  'The high solids silicone assembly has been awarded the Severe Hail Rating by FM Approvals.',
              },
              {
                question: 'What length of warranty is offered?',
                answer: 'The customer has the choice of a 10, 15, and 20 year Material and Labor Warranty.',
              },
            ].map((item, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div
                  key={item.question}
                  className={`pcs-faq-toggle ${isOpen ? 'pcs-faq-toggle-open' : 'pcs-faq-toggle-closed'}`}
                >
                  <button
                    type="button"
                    className={`pcs-faq-title ${isOpen ? 'pcs-faq-title-open' : ''}`}
                    onClick={() => setFaqOpenIndex(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <span className="pcs-faq-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && <p className="pcs-faq-content">{item.answer}</p>}
                </div>
              );
            })}
          </div>
        </main>
      ) : isContact ? (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="mt-10 rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="text-[34px] font-bold">
              Call us at PCS to request a FREE onsite inspection
            </div>
            <div className="mt-2 text-[34px] font-bold">
              <a href="tel:7206883133" className="hover:underline">
                720-688-3133
              </a>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-10 items-start px-[150px]">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="mt-6 text-left text-[18px] leading-[1.7] text-[#6b6b6b]">
                <h3 className="mb-2 text-[32px] font-semibold tracking-wide text-[#333333]">PHONE</h3>
                <p>
                  <a href="tel:7206883133" className="hover:underline">
                    720-688-3133
                  </a>
                </p>
                <div className="h-5" />
                <h3 className="text-[32px] font-semibold tracking-wide text-[#333333]">ADDRESS</h3>
                <p className="mt-1">66 Springer Dr, Suite 302, Highlands Ranch, CO 80129</p>
                <div className="h-5" />
                <h3 className="text-[32px] font-semibold tracking-wide text-[#333333]">WORK HOURS</h3>
                <p className="mt-1">Monday: 8:00 AM – 5:00 PM</p>
                <p>Tuesday: 8:00 AM – 5:00 PM</p>
                <p>Wednesday: 8:00 AM – 5:00 PM</p>
                <p>Thursday: 8:00 AM – 5:00 PM</p>
                <p>Friday: 8:00 AM – 5:00 PM</p>
                <p>Saturday: Closed</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-[32px] font-semibold tracking-tight text-gray-900">Contact Us</h2>
              <form className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-[16px] font-semibold text-gray-800">Email Address</span>
                  <input
                    type="email"
                    name="email"
                    className={`mt-2 ${contactFieldClass}`}
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block">
                  <span className="text-[16px] font-semibold text-gray-800">Subject</span>
                  <input
                    type="text"
                    name="subject"
                    className={`mt-2 ${contactFieldClass}`}
                    placeholder="How can we help?"
                  />
                </label>
                <label className="block">
                  <span className="text-[16px] font-semibold text-gray-800">Message</span>
                  <textarea
                    name="message"
                    rows={6}
                    className={`mt-2 ${contactFieldClass}`}
                    placeholder="Tell us about your project."
                  />
                </label>
                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    className="rounded-xl px-6 py-3 text-[18px] font-semibold text-white transition bg-gray-900 hover:opacity-90"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-10 rounded-2xl overflow-hidden shadow-sm">
            <div className="w-full aspect-[4/3] bg-gray-100">
              <iframe
                title="PCS Office Location"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=66%20Springer%20Dr%2C%20Suite%20302%2C%20Highlands%20Ranch%2C%20CO%2080129&output=embed"
              />
            </div>
          </div>
        </main>
      ) : null}
      <footer className="w-full mt-12">
        <style>{`
          .pcs-footer-divider {
            height: 100px;
            background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDBweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0xMDk0LjQ0IDExOUwxNzIuNyA2OC43MmE3NC41NCA3NC41NCAwIDAgMS0yNS4xOS01Ljk1TDAgMHYxNDBoMTI4MFYwbC0xMzMuODUgMTAyYy0xNS44NCAxMi4wOS0zMy43IDE3Ljk1LTUxLjcxIDE3eiIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik0xMDkzLjQ4IDEzMS44NUwxNzMgOTRhNzYuODUgNzYuODUgMCAwIDEtMzYuNzktMTEuNDZMMCAwdjE0MGgxMjgwVjBsLTEzMS44MSAxMTEuNjhjLTE2LjQ3IDEzLjk2LTM1LjQ3IDIwLjk2LTU0LjcxIDIwLjE3eiIvPjwvZz48L3N2Zz4=");
            background-size: 200% 100px;
            background-repeat: no-repeat;
            background-position: center;
          }
          .pcs-footer-divider-top {
            transform: scale(1, -1);
          }
          .pcs-footer-divider-bottom {
            transform: scale(-1, 1);
          }
        `}</style>
        <div className="pcs-footer-divider pcs-footer-divider-top" />
        <div className="mx-auto max-w-2xl">
          <div
            className="h-[8px] w-full"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))' }}
          />
          <div className="border-y border-gray-300 py-4 text-center text-[16px] text-gray-700">
            <div>© 2025 Procoating Systems</div>
            <div className="mt-[10px] flex flex-wrap justify-center gap-[30px] text-[15px] text-gray-700">
              <a
                href="https://www.linkedin.com/company/professional-coating-systems/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="inline-flex items-center justify-center rounded-full p-1 transition hover:text-gray-900"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="36"
                  height="36"
                  style={{ display: 'block' }}
                >
                  <path
                    fill="#0A66C2"
                    d="M22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0zM7.433 20.452H3.86V9h3.573v11.452zM5.647 7.433a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm14.805 13.019h-3.571v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.322V9h3.43v1.561h.047c.477-.9 1.637-1.85 3.37-1.85 3.603 0 4.267 2.372 4.267 5.455v6.286z"
                  />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://www.facebook.com/people/Professional-Coating-Systems-of-Colorado/61577967671912/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="inline-flex items-center justify-center rounded-full p-1 transition hover:text-gray-900"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="36"
                  height="36"
                  style={{ display: 'block' }}
                >
                  <path
                    fill="#1877F2"
                    d="M24 12.072C24 5.373 18.627 0 12 0S0 5.373 0 12.072c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.026 24 18.062 24 12.072z"
                  />
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
          <div
            className="h-[8px] w-full"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))' }}
          />
        </div>
        <div className="pcs-footer-divider pcs-footer-divider-bottom" />
      </footer>
    </div>
  );
}
