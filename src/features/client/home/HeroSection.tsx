import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CardSwap, { Card } from '@/components/ui/CardSwap'; 

const HeroSection = () => {
  const [dimensions, setDimensions] = useState({
    width: 650,
    height: 480,
    cardDistance: 35,
    verticalDistance: 45
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setDimensions({
          width: 300,
          height: 300,
          cardDistance: 20,
          verticalDistance: 25
        });
      } else if (window.innerWidth < 1024) {
        setDimensions({
          width: 450,
          height: 450,
          cardDistance: 30,
          verticalDistance: 35
        });
      } else {
        setDimensions({
          width: 660,
          height: 480,
          cardDistance: 35,
          verticalDistance: 45
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-white flex items-center py-20 lg:py-0 transition-colors duration-500">
      
      {/* --- ORIGINAL WAVY LINES (TOP & BOTTOM LEFT) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* 1. TOP LEFT WAVY LINES */}
        <svg className="absolute top-0 left-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] opacity-10" viewBox="0 0 500 500" fill="none">
          <path d="M-50,50 Q100,100 150,-50" stroke="#2ecc71" strokeWidth="1.5" />
          <path d="M-50,120 Q150,180 220,-50" stroke="#2ecc71" strokeWidth="1" strokeDasharray="5 5" />
          <path d="M-50,200 Q200,280 300,-50" stroke="#2ecc71" strokeWidth="1.2" opacity="0.6" />
        </svg>

        {/* 2. BOTTOM LEFT WAVY LINES */}
        <svg className="absolute bottom-0 left-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] opacity-10" viewBox="0 0 500 500" fill="none">
          <path d="M-50,450 Q120,350 250,550" stroke="#2ecc71" strokeWidth="1.5" />
          <path d="M-50,350 Q180,250 350,550" stroke="#2ecc71" strokeWidth="1" strokeDasharray="8 8" />
          <path d="M-50,250 Q250,150 450,550" stroke="#2ecc71" strokeWidth="0.8" />
        </svg>

      </div>

      <div className="relative max-w-7xl mt-12 sm:mt-0   mx-auto px-4 sm:px-0 lg:px-5 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-12">
          
          {/* Content Area */}
          {/* Content Area */}
<motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  // മൊബൈലിൽ ടെക്സ്റ്റ് സെന്റർ ആക്കാൻ 'text-center' ഉം വലിയ സ്ക്രീനിൽ 'lg:text-left' ഉം ചേർത്തു
  className="text-center lg:text-left order-1 lg:order-1 lg:-ml-12"
>
  <h1 className="text-4xl sm:text-4xl xl:text-[68px] font-black text-zinc-900 leading-[0.9] tracking-tighter">
    YOUR VISION. <br />
    <span className="bg-[image:var(--brand-gradient)] bg-clip-text text-transparent">OUR PRECISION.</span>
  </h1>

  <p className="mt-6 text-zinc-900 sm:mt-10 text-[15px] sm:text-[15px]  font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
    We bridge the gap between abstract ideas and powerful digital products. 
    <br className="hidden sm:block" />
    <span className="text-zinc-900 font-bold font-mono">ViceVersa</span> crafts high-end solutions where every pixel serves a purpose.
  </p>

  {/* Buttons Area - മൊബൈലിൽ ഒരേ ലൈനിൽ വരാൻ flex-row ഉം justify-center ഉം നൽകി */}
  <div className="mt-12 flex flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8">
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // w-full മാറ്റി w-auto ആക്കി, അപ്പോൾ ബട്ടൺ ഒരേ ലൈനിൽ ഒതുങ്ങി നിൽക്കും
      className="bg-[image:var(--brand-gradient)] text-white px-5 sm:px-10 py-3 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-brand/20 transition-all w-auto"
    >
      Let's Build It
    </motion.button>

    <motion.button 
      whileHover={{ x: 5 }}
      className="flex items-center gap-2 sm:gap-3 text-zinc-900 font-bold text-sm sm:text-base group"
    >
      Talk to Us 
      <span className="hidden sm:block w-8 h-[1px] bg-zinc-300 group-hover:bg-brand group-hover:w-12 transition-all duration-300"></span>
    </motion.button>
  </div>
</motion.div>

          {/* CardSwap Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center lg:justify-end items-center h-[400px] sm:h-[550px] order-2 lg:order-2"
          >
            <div className="lg:mr-[-40px] mt-0 lg:mt-30">
              <CardSwap
                width={dimensions.width} 
                height={dimensions.height}
                cardDistance={dimensions.cardDistance}
                verticalDistance={dimensions.verticalDistance}
                delay={4000}
              >
                {/* Image Cards */}
                {[
                    { title: "", img: "https://i.pinimg.com/736x/75/52/f3/7552f36ae36b166025420c84fe3a4cf3.jpg" },
                  { title: "", img: "https://i.pinimg.com/1200x/ca/32/82/ca3282c4b57e67ae0d564278704b3227.jpg" },
                  { title: "", img: "https://i.pinimg.com/736x/25/e3/28/25e3289ee5f7af4291d473b65bb399f9.jpg" },
                    { title: "", img: "https://i.pinimg.com/1200x/bd/dd/2a/bddd2a086b0f4fedaf5fb5353aa70dd8.jpg" },
                ].map((item, index) => (
                  <Card key={index} className="overflow-hidden border-none shadow-2xl shadow-zinc-300/50 rounded-[35px] sm:rounded-[40px] bg-zinc-100">
                    <img src={item.img} className="w-full h-full object-cover opacity-80" alt={item.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 sm:p-10 flex flex-col justify-end">
                      <h3 className="text-2xl sm:text-3xl font-black text-white text-center">{item.title}</h3>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div> 
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;