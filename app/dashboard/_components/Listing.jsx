"use client";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Autoplay from "embla-carousel-autoplay";

function Listing() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [selectedDesignType, setSelectedDesignType] = useState(null);

  const handleScrollToAccordion = () => {
    const accordionSection = document.getElementById("design-styles");
    if (accordionSection) {
      accordionSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const designTypes = [
    {
      name: "Bohemian",
      description:
        "Bohemian tarzı, özgür ruhlu ve sanatsal bir atmosfer yaratmayı amaçlayan eklektik ve rahat bir tasarım stilidir. Genellikle canlı renkler, desenli tekstiller, etnik dokunuşlar ve el yapımı aksesuarlarla karakterizedir. Mobilyalar vintage veya ikinci el olabilir ve farklı kültürlerden ilham alan objelerle süslenebilir. Ahşap, rattan ve doğal kumaşlar gibi organik malzemeler tercih edilir, böylece sıcak ve davetkar bir ortam oluşturulur.",
      image: "/bohemian.jpeg",
    },
    {
      name: "Modern",
      description:
        "Modern iç tasarım, minimalizm ve işlevselliğe odaklanır. Keskin ve temiz çizgiler, açık renk paletleri ve nötr tonlarla karakterize edilir. Mobilyalar genellikle alçak profilli ve sade tasarımlıdır. Cam, metal ve cilalı yüzeyler sıkça kullanılır. Açık konsept düzenlemeler, geniş cam pencereler ve doğal ışık modern tasarımın temel özelliklerindendir. Gereksiz süslemelerden kaçınılır ve odalar düzenli, ferah bir his uyandırır.",
      image: "/modern.jpg",
    },
    {
      name: "Industrial",
      description:
        "Endüstriyel tasarım, fabrika ve depo estetiğinden ilham alarak ham, işlenmemiş materyalleri öne çıkarır. Tuğla duvarlar, beton zeminler, açıkta bırakılmış borular ve çelik gibi unsurlar bu tarzın belirgin özelliklerindendir. Mobilyalar genellikle büyük, dayanıklı ve işlevseldir; çoğu zaman geri dönüştürülmüş veya vintage unsurlar içerir. Renk paleti genellikle gri, kahverengi ve siyah tonlarında olup, mekanlara güçlü ve maskülen bir hava katar.",
      image: "/industrial.avif",
    },
    {
      name: "Traditional",
      description:
        "Geleneksel iç mekan tasarımı, klasik ve zamansız bir estetik yaratmaya odaklanır. Zengin ahşap detaylar, oymalı mobilyalar, simetrik düzenlemeler ve zarif dekoratif öğeler bu tarzın belirgin özelliklerindendir. Renk paleti genellikle sıcak ve doğal tonlardan oluşur; bej, krem, altın ve koyu kahverengi sıkça kullanılır. Büyük avizeler, işlemeli perdeler, sanat eserleri ve süslemelerle mekana ihtişamlı bir hava katılır. Konfor ve lüks ön plandadır.",
      image: "/traditional.jpg",
    },
    {
      name: "Rustic",
      description:
        "Rustik tasarım, doğadan ilham alarak sıcak, samimi ve rahat bir atmosfer yaratmayı amaçlar. Ahşap, taş, tuğla ve doğal kumaşlar gibi organik malzemeler ön plandadır. Genellikle büyük şömineler, kütük mobilyalar ve elde dokunmuş tekstiller ile tamamlanır. Renk paleti toprak tonları, krem, bej ve yeşil gibi doğaya yakın tonlardan oluşur. Rustik tasarım, şehir hayatından kaçış hissi vererek doğayla iç içe bir yaşam tarzını yansıtır.",
      image: "/rustic.png",
    },
    {
      name: "Minimalist",
      description:
        "Minimalist tasarım, 'az çoktur' anlayışına dayanır. Gereksiz süslemelerden kaçınılır ve mekanlar sade, işlevsel ve düzenli tutulur. Renk paleti genellikle beyaz, gri, siyah ve pastel tonlarından oluşur. Mobilyalar temiz çizgilere sahiptir ve genellikle çok amaçlı olarak tasarlanır. Açık alanlar ve az sayıda eşya ile ferahlık hissi ön planda tutulur. Minimalist dekorasyon, modern yaşamın stresini azaltmayı ve huzurlu bir ortam yaratmayı hedefler.",
      image: "/minimalist.jpg",
    },
    {
      name: "Scandinavian",
      description:
        "İskandinav tasarımı, sadelik, işlevsellik ve konforu ön plana çıkaran bir iç mekan stilidir. Beyaz ve açık gri gibi nötr tonlarla birlikte doğal ahşap detaylar sıkça kullanılır. Mekanlar aydınlık ve ferah tutulur; büyük pencereler ve doğal ışık önemli unsurlardır. Konforu artırmak için yumuşak tekstiller, sıcak aydınlatmalar ve bitkiler dekorasyona dahil edilir. İskandinav tasarımı, hem estetik hem de pratik bir yaşam alanı oluşturmayı amaçlar.",
      image: "/scandinavian.webp",
    },
    {
      name: "Art Deco",
      description:
        "Art Deco tasarım, 1920’lerin lüks ve gösterişli stilinden ilham alır. Cesur geometrik desenler, parlak yüzeyler, zengin renkler ve altın, pirinç gibi metalik detaylarla dikkat çeker. Mobilyalar genellikle şık ve kıvrımlıdır, kadife ve deri gibi lüks kumaşlar kullanılır. Aynalar, cam detaylar ve parlak cilalı ahşap yüzeyler mekana sofistike bir hava katar. Art Deco tarzı, zarafet ve ihtişamı sevenler için mükemmel bir seçenektir.",
      image: "/artdeco.webp",
    },
  ];

  return (
    <div className="p-2 min-h-[2000px]">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl text-white shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Welcome,{" "}
            <span className="text-yellow-300">
              {user?.fullName ? user.fullName : "Guest"}
            </span>
          </h2>
          <p className="text-md opacity-80">
            Ready to design your dream space?
          </p>
        </div>
        <Link href={"/dashboard/create-new"}>
          <Button variant="secondary" className="text-black font-bold text-md">
            ReDesign Your Room
          </Button>
        </Link>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <h3 className="text-center text-3xl font-bold text-gray-600 underline underline-offset-8 mt-20">
          AI Room Design Examples
        </h3>
        <div className=" mt-10 w-3/3 md:w-3/3 lg:w-3/3 xl:w-2/3">
          <Carousel
            className="mt-10"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
          >
            <CarouselContent>
              {[
                "/room1.webp",
                "/room2.jpg",
                "/room3.jpg",
                "/room4.webp",
                "/room7.jpg",
                "/room8.jpg",
              ].map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative">
                    <Image
                      src={src}
                      alt={`AI Room Design ${index + 1}`}
                      width={800}
                      height={400}
                      className="rounded-lg object-fill w-full h-[500px]"
                    />
                    <div className="absolute bottom-5 left-5 text-white font-bold text-xl bg-black bg-opacity-50 p-2 rounded-md">
                      AI Powered Design
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="mt-10 flex flex-col items-center text-center">
          <p className="text-xl font-semibold text-gray-700">
            Do you know about design styles?
          </p>
          <Button
            onClick={handleScrollToAccordion}
            variant="destructive"
            className="mt-5 h-[40px] w-[120px] text-md"
          >
            Learn More
          </Button>
        </div>
      </div>

      <div className="border-b-[3px] border-dashed border-gray-400 p-10"></div>

      <div className="min-h-screen flex items-center justify-center mt-20">
        <div className="relative w-full h-[900px] flex items-center justify-center bg-[url('/Room.jpg')] bg-center bg-no-repeat bg-cover rounded-lg">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          <div className="relative flex items-center justify-center flex-col text-white">
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">
              Create New AI Interior Design for Your Room
            </h2>
            <Link href="/dashboard/create-new">
              <Button className="mt-10 w-[200px] h-[40px] lg:w-[225px] lg:h-[45px] text-md md:font-semibold lg:font-bold text-center">
                Redesign your Room
              </Button>
            </Link>
          </div>
          <div className="container absolute bottom-[-5%] flex items-center justify-center">
            <div className="relative hidden lg:grid grid-cols-3 gap-4 lg:gap-6 xl:gap-8 w-full px-4">
              <Card className="bg-red-200 bg-opacity-90 rounded-lg p-4 shadow-lg">
                <CardHeader className="flex items-center">
                  <Image
                    src="/high-quality.png"
                    alt="quality"
                    width={50}
                    height={50}
                  />
                  <CardTitle className="text-xl font-semibold text-gray-900 ml-2">
                    Maximum Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 font-semibold">
                    AI-powered design ensures top-notch quality with realistic
                    details and seamless aesthetics.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-blue-200 bg-opacity-90 rounded-lg p-4 shadow-lg">
                <CardHeader className="flex items-center text-center">
                  <Image
                    src="/feedback.png"
                    alt="Upload Room"
                    width={50}
                    height={50}
                  />
                  <CardTitle className="text-xl font-semibold text-gray-900 ml-2">
                    Transform Your Space Instantly
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 font-semibold">
                    Upload a photo of your room and let AI generate a stunning
                    new design in seconds.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-yellow-200 bg-opacity-90 rounded-lg p-4 shadow-lg">
                <CardHeader className="flex items-center gap-2">
                  <Image
                    src="/personalized.png"
                    alt="quality"
                    width={50}
                    height={50}
                  />
                  <CardTitle className="text-xl font-semibold text-gray-900 ml-2">
                    Personalized for You
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 font-semibold">
                    Customize your space with AI-generated designs that reflect
                    your personality and style.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div
        className="border-b-[3px] border-dashed border-gray-400 p-10"
        id="design-styles"
      ></div>

      <div className="mt-28 flex flex-col items-center justify-center">
        <p className="font-bold text-2xl mb-10 text-gray-500">
          Before designing your room, you can find detailed descriptions for
          each type of design here.
        </p>
        <div className="w-2/3 bg-orange-100 p-6 rounded-lg shadow-lg shadow-orange-200 mb-52">
          <Accordion type="single" collapsible>
            {designTypes.map((design, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-300 transition-all duration-500"
              >
                <AccordionTrigger className="relative group font-semibold text-2xl text-gray-700 hover:text-red-500 transition-colors duration-300">
                  {design.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full group-hover:bottom-0"></span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col md:flex-row items-center p-6 gap-6 transition-all duration-300">
                    <Image
                      src={design.image}
                      alt={design.name}
                      width={350}
                      height={250}
                      className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                    />
                    <p className="text-gray-600 text-xl leading-relaxed">
                      {design.description}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Listing;
