"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const servicesCard1Ref = useRef<HTMLDivElement>(null);
  const servicesCard2Ref = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const cardsToAnimate = [
      servicesCard1Ref.current,
      servicesCard2Ref.current,
      contactCardRef.current,
    ].filter(Boolean);
    const MAX_ROTATION = 5;
    const SCALE_FACTOR = 1.03;
    const PERSPECTIVE = "1000px";
    const listeners: {
      card: HTMLDivElement | HTMLFormElement;
      move: (event: MouseEvent) => void;
      leave: () => void;
    }[] = [];

    cardsToAnimate.forEach((card) => {
      if (!card) return;
      const handleMouseMove = (event: MouseEvent) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;
        const rotateY_val = ((x - width / 2) / (width / 2)) * MAX_ROTATION;
        const rotateX_val = -((y - height / 2) / (height / 2)) * MAX_ROTATION;
        card.style.transform = `perspective(${PERSPECTIVE}) rotateX(${rotateX_val}deg) rotateY(${rotateY_val}deg) scale3d(${SCALE_FACTOR}, ${SCALE_FACTOR}, ${SCALE_FACTOR})`;
      };
      const handleMouseLeave = () => {
        card.style.transform = `perspective(${PERSPECTIVE}) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      };
      card.addEventListener("mousemove", handleMouseMove as EventListener);
      card.addEventListener("mouseleave", handleMouseLeave as EventListener);
      listeners.push({ card, move: handleMouseMove, leave: handleMouseLeave });
    });

    return () => {
      listeners.forEach(({ card, move, leave }) => {
        card.removeEventListener("mousemove", move as EventListener);
        card.removeEventListener("mouseleave", leave as EventListener);
      });
    };
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to send message.");
      setFormStatus("success");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch {
      setFormStatus("error");
    }
  };

  const textVariantLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const textVariantRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const arrowVariant = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: { duration: 1, ease: "easeOut", delay: 0.5 },
    },
  };
  const iconVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.3 },
    },
  };
  const subHeadingVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 1.0 },
    },
  };
  const sectionRevealVariant = {
    hidden: { opacity: 0, y: -75 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };
  const techGridContainerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, staggerChildren: 0.15 } },
  };
  const techItemVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  const technologies = [
    { src: "/nextjs-icon.svg", alt: "Ícone do Next.js", name: "Next" },
    { src: "/svelte-icon.svg", alt: "Ícone do Svelte", name: "SvelteKit" },
    { src: "/vue-icon.svg", alt: "Ícone do Vue.js", name: "Vue" },
    { src: "/angular-icon.svg", alt: "Ícone do Angular", name: "Angular" },
    {
      src: "/typescript-icon.svg",
      alt: "Ícone do TypeScript",
      name: "TypeScript",
    },
  ];

  return (
    <>
      <header
        className={`text-xl text-white font-light fixed py-6 w-full z-20 transition-all duration-300 ease-in-out ${isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"}`}
      >
        <nav className="flex items-center gap-x-10 max-w-5xl mx-auto px-4">
          <Link href="#inicio" className="mr-auto">
            <Image
              src="/softhaus-logo.svg"
              alt="Logo da Softhaus"
              width={125}
              height={42}
              priority
            />
          </Link>
          <Link
            className="hidden sm:block text-white/80 hover:text-white"
            href="#servicos"
          >
            Serviços
          </Link>
          <Link
            className="hidden sm:block text-white/80 hover:text-white"
            href="#tecnologias"
          >
            Tecnologias
          </Link>
          <Link
            className="hidden sm:block text-white/80 hover:text-white"
            href="#sobre-nos"
          >
            Sobre Nós
          </Link>
          <Link
            className="hidden sm:block text-black bg-white font-bold uppercase tracking-[-1px] px-4 py-1 rounded-full"
            href="#contato"
          >
            Contato
          </Link>
        </nav>
      </header>
      <main>
        <section
          id="inicio"
          className="flex flex-col overflow-hidden text-white items-center bg-[url(/background1.webp)] bg-cover bg-bottom bg-no-repeat"
        >
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-89.73px)] max-w-5xl w-full mt-[89.73px] px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <motion.h1
                variants={textVariantLeft}
                className="text-5xl sm:text-7xl md:text-[100px] lg:text-[124px] font-semibold leading-tight lg:leading-[124px] tracking-[-4px] text-nowrap text-center sm:text-left"
              >
                Você tem a ideia,
              </motion.h1>
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <div className="flex flex-col">
                  <motion.h2
                    variants={textVariantRight}
                    className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold leading-tight lg:leading-[124px] tracking-[-2px] lg:tracking-[-4px] text-center sm:text-left"
                  >
                    a gente cria.
                  </motion.h2>
                  <motion.div
                    variants={arrowVariant}
                    className="mt-10 mb-6 relative h-[2px] w-0 bg-white after:border-r-2 after:border-b-2 after:border-white after:block after:w-[16px] after:h-[16px] after:absolute after:-top-[7px] after:right-0 after:rotate-[-45deg]"
                  ></motion.div>
                  <motion.p
                    variants={subHeadingVariant}
                    className="text-xl md:text-2xl lg:text-3xl font-extralight leading-relaxed lg:leading-[51px] tracking-[1px] lg:tracking-[3px]"
                  >
                    Seu site <b>responsivo</b>, <b>otimizado</b> e{" "}
                    <b>intuitivo</b>.
                  </motion.p>
                </div>
                <motion.div
                  variants={iconVariant}
                  className="m-6 flex justify-center items-center flex-1"
                >
                  <Image
                    src="/softhaus-icon.svg"
                    alt="Ícone decorativo Softhaus"
                    width={150}
                    height={240}
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        <section
          id="servicos"
          className="relative flex flex-col items-center bg-[url(/background2.webp)] bg-cover bg-center bg-no-repeat"
        >
          <motion.div
            className="flex flex-col items-center min-h-[calc(100vh-89.73px)] max-w-5xl w-full py-16 px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionRevealVariant}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16">
              Serviços
            </h2>
            <div className="flex flex-col md:flex-row gap-8 z-10 text-white">
              <div
                ref={servicesCard1Ref}
                className="flex flex-col gap-y-8 p-6 pb-8 rounded-2xl w-full max-w-[412px] bg-gradient-to-b from-black to-[#240218]"
                style={{ transition: "transform 0.15s ease-out" }}
              >
                <div className="bg-[url(/services1.webp)] bg-cover border-white border-4 rounded-2xl h-[200px] md:h-[250px]"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-center">
                  Desenvolvimento de Websites
                </h3>
                <p className="text-lg md:text-xl text-center md:text-left">
                  Criamos websites sob medida, com foco em desempenho,
                  usabilidade e inovação, para alavancar seu negócio.
                </p>
              </div>
              <div
                ref={servicesCard2Ref}
                className="flex flex-col gap-y-8 p-6 pb-8 rounded-2xl w-full max-w-[412px] bg-gradient-to-b from-black to-[#240218]"
                style={{ transition: "transform 0.15s ease-out" }}
              >
                <div className="bg-[url(/services2.webp)] bg-cover border-white border-4 rounded-2xl h-[200px] md:h-[250px]"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-center">
                  Desenvolvimento de Aplicativos
                </h3>
                <p className="text-lg md:text-xl text-center md:text-left">
                  Desenvolvemos aplicativos mobile intuitivos e performáticos,
                  transformando suas ideias em soluções digitais.
                </p>
              </div>
            </div>
          </motion.div>
          <Image
            src="/divider.svg"
            alt="Divisor de seção ondulado"
            className="absolute bottom-0 -mb-[1px] sm:-mb-[86px] md:-mb-[172px] w-full h-auto"
            width={1920}
            height={345}
            sizes="100vw"
          />
        </section>
        <section
          id="tecnologias"
          className="flex flex-col text-white items-center bg-[url(/background3.webp)] bg-cover bg-bottom bg-no-repeat"
        >
          <motion.div
            className="flex flex-col justify-center min-h-[calc(100vh-89.73px)] h-full max-w-5xl w-full py-16 md:py-24 px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionRevealVariant}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-[60px] md:mb-[80px]">
              Tecnologias
            </h2>
            <p className="text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-[64px] font-medium tracking-[-1px] text-center md:text-left max-w-[600px] mx-auto md:mx-0">
              Aplicações modernas com as tecnologias mais utilizadas
            </p>
            <div className="my-[38px] h-[15px] p-[1px] rounded-2xl bg-[linear-gradient(to_right,black,white)]">
              <div className="h-full w-full rounded-2xl bg-[linear-gradient(to_right,black_25%,rgba(0,0,0,0.5))]"></div>
            </div>
            <div className="flex flex-col md:flex-row gap-x-8 lg:gap-x-[96px] gap-y-10">
              <div className="flex flex-col gap-y-8 md:gap-y-12 flex-1">
                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-[44px] tracking-[-1px]">
                  Para desenvolver sites modernos, usamos um conjunto de
                  tecnologias que garantem <b>performance</b>, <b>segurança</b>{" "}
                  e uma excelente <b>experiência</b> do usuário.
                </p>
                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-[44px] tracking-[-1px]">
                  Utilizamos os frameworks mais populares e consolidados do
                  mercado — como <b>Next</b>, <b>Vue</b> e <b>Angular</b>.
                </p>
              </div>
              <motion.div
                className="ml-auto grid grid-rows-3 grid-cols-2 w-full md:w-fit gap-y-8 md:gap-y-12 lg:gap-y-16 gap-x-4 md:gap-x-8 place-items-start"
                variants={techGridContainerVariant}
              >
                {technologies.map((tech) => (
                  <motion.div
                    key={tech.name}
                    className="flex items-center gap-x-3 md:gap-x-4"
                    variants={techItemVariant}
                  >
                    <Image
                      src={tech.src}
                      alt={tech.alt}
                      width={50}
                      height={50}
                    />
                    <p className="text-xl md:text-2xl">{tech.name}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>
        <section id="sobre-nos" className="flex flex-col items-center">
          <motion.div
            className="flex flex-col justify-center min-h-[100vh] max-w-5xl w-full text-[#240218] p-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionRevealVariant}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-[48px] md:mb-[64px]">
              Quem
              <br />
              somos
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              A <b>Softhaus</b> é especializada na criação de sites{" "}
              <b>modernos</b>, <b>eficientes</b> e <b>sob medida</b> para cada
              cliente. Nosso compromisso é com a <b>qualidade</b>, a{" "}
              <b>rapidez</b> e a <b>satisfação</b> total de nossos clientes —
              entregando sites visualmente <b>atraentes</b>, <b>responsivos</b>{" "}
              e <b>otimizados</b> para resultados reais. Seja qual for o tamanho
              do seu projeto, garantimos agilidade na entrega e excelência em
              cada linha de código.
            </p>
            <br />
            <p className="text-lg md:text-xl leading-relaxed">
              Nossa empresa nasceu do desejo de transformar ideias em realidade
              de forma <b>rápida</b> e <b>eficaz</b> e conta com uma equipe de
              funcionários <b>capacitada</b> para{" "}
              <b>transformar suas ideias em realidade</b>.
            </p>
            <div className="my-[32px] h-[15px] p-[1px] rounded-2xl bg-gradient-to-r from-white to-[#240218]">
              <div className="h-full w-full rounded-2xl bg-[linear-gradient(to_right,white_50%,#240218)]"></div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-[48px] md:mb-[64px]">
              Equipe
            </h3>
            <div className="flex flex-wrap justify-around gap-10">
              <div className="flex flex-1 items-center gap-x-4 md:gap-x-6">
                <div className="rounded-full bg-[url(/henrique.jpeg)] bg-center bg-cover min-w-[80px] h-[80px] md:min-w-[128px] md:h-[128px]"></div>
                <div className="flex flex-col gap-y-2">
                  <p>
                    Seis anos de experiência profissional como{" "}
                    <b>desenvolvedor full-stack</b> com experiência em{" "}
                    <b>Next.js</b>, <b>SvelteKit</b>, <b>Vue</b>, <b>Angular</b>{" "}
                    entre outras diversas tecnologias, inclusive a criação de{" "}
                    <b>aplicações mobile</b> utilizando <b>React Native</b>.
                  </p>
                  <div className="flex gap-x-2">
                    <Link
                      href="https://www.linkedin.com/in/henriquehbr"
                      target="_blank"
                    >
                      <Image
                        src="/linkedin-icon.svg"
                        alt="Ícone do LinkedIn"
                        width={30}
                        height={30}
                      />
                    </Link>
                    <Link href="/curriculo-henrique.pdf" target="_blank">
                      <Image
                        src="/resume-icon.png"
                        alt="Ícone de Currículo"
                        width={30}
                        height={30}
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-x-4 md:gap-x-6">
                <div className="rounded-full bg-[url(/pedro.jpeg)] bg-center bg-cover min-w-[80px] h-[80px] md:min-w-[128px] md:h-[128px]"></div>
                <div className="flex flex-col gap-y-2">
                  <p>
                    Um ano de experiência profissional como{" "}
                    <b>desenvolvedor front-end</b>, especializado em{" "}
                    <b>SvelteKit</b>, <b>Next.js</b> e conhecimento prático em{" "}
                    <b>design UX/UI</b>.
                  </p>
                  <div className="flex gap-x-2">
                    <Link
                      href="https://www.linkedin.com/in/pedro-henrique-21623b210"
                      target="_blank"
                    >
                      <Image
                        src="/linkedin-icon.svg"
                        alt="Ícone do LinkedIn"
                        width={30}
                        height={30}
                      />
                    </Link>
                    <Link
                      href="https://github.com/PedroHAlvesN"
                      target="_blank"
                    >
                      <Image
                        src="/github-icon.png"
                        alt="Ícone do GitHub"
                        width={30}
                        height={30}
                      />
                    </Link>
                    <Link href="/curriculo-pedro.pdf" target="_blank">
                      <Image
                        src="/resume-icon.png"
                        alt="Ícone de Currículo"
                        width={30}
                        height={30}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        <section
          id="contato"
          className="relative overflow-hidden flex justify-center text-white items-center bg-[url(/background5.png)] bg-cover bg-top bg-no-repeat"
        >
          <motion.div
            className="flex flex-wrap max-w-5xl w-full px-4 pt-[60px] sm:pt-[30px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionRevealVariant}
          >
            <div className="flex flex-col flex-1 justify-center min-h-[calc(100vh-89.73px)] z-10">
              <h1 className="text-[35px] font-bold md:text-5xl lg:text-5xl sm:leading-[35px] sm:text-left md:leading-[45px] leading-[50px] tracking-[-1px] text-center max-w-[600px] mx-auto md:mx-0">
                Sua visão, <br /> nossa tecnologia
              </h1>
              <p className="my-10 md:my-10 text-xl leading-[29px] tracking-[-1px] text-center sm:text-left">
                Acreditamos que cada linha de código pode ser o início de uma{" "}
                <b>grande transformação</b>. Se você tem uma <b>visão</b>, um{" "}
                <b>desafio tecnológico</b> ou a{" "}
                <b>necessidade de otimizar processos</b>, estamos aqui para
                ouvir e, juntos, desenhar a <b>solução ideal</b>.
              </p>
              <h3 className="font-bold text-[26px] leading-[65px] tracking-[-1px] text-center sm:text-left">
                Entre em contato
              </h3>
              <div className="flex flex-col items-center sm:items-start">
                <Link
                  href="mailto:henriqueborgeshbr@proton.me"
                  className="flex items-center mt-6 gap-x-[10px] bg-white text-[#240218] rounded-md w-fit px-2 p-1 hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/email-icon.svg"
                    alt="Ícone do Email"
                    width={30}
                    height={30}
                  />
                  <p className="text-xl tracking-[-1px]">Email</p>
                  <div className="relative rotate-[-45deg] h-[2px] w-[20px] bg-[#240218] after:border-r-2 after:border-b-2 after:border-[#240218] after:block after:w-[8px] after:h-[8px] after:absolute after:-top-[3px] after:right-0 after:rotate-[-45deg]"></div>
                </Link>
                <Link
                  href="https://wa.me/5563992219697"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center mt-6 gap-x-[10px] bg-white text-[#240218] rounded-md w-fit px-2 p-1 hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/whatsapp-icon.svg"
                    alt="Ícone do WhatsApp"
                    width={30}
                    height={30}
                  />
                  <p className="text-xl tracking-[-1px]">WhatsApp</p>
                  <div className="relative rotate-[-45deg] h-[2px] w-[20px] bg-[#240218] after:border-r-2 after:border-b-2 after:border-[#240218] after:block after:w-[8px] after:h-[8px] after:absolute after:-top-[3px] after:right-0 after:rotate-[-45deg]"></div>
                </Link>
                <Link
                  href="https://www.linkedin.com/company/softhaus-co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center mt-6 gap-x-[10px] bg-white text-[#240218] rounded-md w-fit px-2 p-1 hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/linkedin-icon.svg"
                    alt="Ícone do LinkedIn"
                    width={30}
                    height={30}
                  />
                  <p className="text-xl tracking-[-1px]">LinkedIn</p>
                  <div className="relative rotate-[-45deg] h-[2px] w-[20px] bg-[#240218] after:border-r-2 after:border-b-2 after:border-[#240218] after:block after:w-[8px] after:h-[8px] after:absolute after:-top-[3px] after:right-0 after:rotate-[-45deg]"></div>
                </Link>
                <Link
                  href="https://www.instagram.com/softhaus_co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center mt-6 gap-x-[10px] bg-white text-[#240218] rounded-md w-fit px-2 p-1 hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/instagram-icon.png"
                    alt="Ícone do Instagram"
                    width={30}
                    height={30}
                  />
                  <p className="text-xl tracking-[-1px]">Instagram</p>
                  <div className="relative rotate-[-45deg] h-[2px] w-[20px] bg-[#240218] after:border-r-2 after:border-b-2 after:border-[#240218] after:block after:w-[8px] after:h-[8px] after:absolute after:-top-[3px] after:right-0 after:rotate-[-45deg]"></div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col text-black w-full flex-1 justify-center items-center max-w-[350px] mx-auto z-10 sm:mx-6 sm:max-w-none py-10 md:py-0">
              <form
                ref={contactCardRef}
                onSubmit={handleSubmit}
                className="flex flex-col justify-center text-center gap-y-6 p-6 pb-8 rounded-2xl bg-white w-full"
                style={{ transition: "transform 0.15s ease-out" }}
              >
                <h3 className="text-4xl font-bold leading-[34px] tracking-[-1px]">
                  Nos mande uma mensagem!
                </h3>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-[#d9d9d9] p-3 rounded-md placeholder:text-[#9e9e9e] w-full"
                  type="text"
                  placeholder="Nome"
                />
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-[#d9d9d9] p-3 rounded-md placeholder:text-[#9e9e9e] w-full"
                  type="tel"
                  placeholder="Número"
                />
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-[#d9d9d9] p-3 rounded-md placeholder:text-[#9e9e9e] w-full"
                  type="email"
                  placeholder="Email"
                />
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="bg-[#d9d9d9] p-3 rounded-md placeholder:text-[#9e9e9e] w-full resize-none"
                  placeholder="Mensagem"
                ></textarea>
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="bg-[#240218] text-white p-3 rounded-md hover:bg-opacity-90 transition-all cursor-pointer w-full disabled:bg-opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === "sending"
                    ? "Enviando..."
                    : formStatus === "success"
                      ? "Enviado com Sucesso!"
                      : formStatus === "error"
                        ? "Erro! Tente Novamente"
                        : "Enviar Mensagem"}
                </button>
              </form>
            </div>
          </motion.div>
          <Image
            src="/divider.svg"
            alt="Divisor de seção ondulado"
            className="absolute w-full h-auto bottom-[-170px]"
            width={1920}
            height={400}
            sizes="100vw"
          />
        </section>
        <footer className="relative w-full bg-[url(/background4.webp)] bg-cover bg-no-repeat">
          <div className="flex flex-col sm:flex-row text-white text-lg md:text-xl gap-y-8 sm:gap-x-10 items-center max-w-5xl py-10 md:py-14 mx-auto px-4">
            <Link href="#inicio" className="mx-auto">
              <Image
                src="/softhaus-logo.svg"
                alt="Logo da Softhaus (Rodapé)"
                width={180}
                height={60}
              />
            </Link>
            <div className="text-center text-white/70 text-sm">
              © {new Date().getFullYear()} Softhaus. Todos os direitos
              reservados.
            </div>
            <Link href="#servicos">Serviços</Link>
            <Link href="#tecnologias">Tecnologias</Link>
            <Link href="#sobre-nos">Sobre Nós</Link>
          </div>
        </footer>
      </main>
    </>
  );
}
