import HeroPageLayout from '@/components/ui/hero-page-layout';
import React from 'react';
import { FaBullseye, FaLightbulb, FaNetworkWired, FaHandshake } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <HeroPageLayout
      title="About Us"
      description="Learn more about our mission, our team, and what drives us to connect innovators worldwide."
    >
      <div className="w-full max-w-4xl mx-auto px-4 text-neutral-300 relative z-10 font-sans">
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M100 0L0 100V0H100zM0 0l100 100V0H0z\' fill=\'%23ffffff\' fill-opacity=\'0.1\'/%3E%3C/svg%3E")' }}></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 text-white hover:bg-white/10 transition-colors duration-200">
            {/* Beveled edge effect */}
            <div className="absolute inset-0 border-4 border-transparent rounded-2xl pointer-events-none" style={{ background: 'linear-gradient(45deg, transparent 0%, transparent 100%)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }}></div>
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mr-4 transition-all duration-300 hover:scale-110">
                <FaBullseye className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl font-extrabold text-white uppercase tracking-wider leading-tight text-shadow-lg font-orbitron">
                Our Mission
              </h2>
            </div>
            <p className="text-lg text-base leading-relaxed text-neutral-200 mt-4 border-t border-blue-500/20 pt-4">
              Connecting visionaries with game-changing ideas. Lion bridges the gap between brilliant minds and world-changing innovations. Let&apos;s build the future together.
            </p>
          </section>

          <section className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 text-white hover:bg-white/10 transition-colors duration-200">
            {/* Beveled edge effect */}
            <div className="absolute inset-0 border-4 border-transparent rounded-2xl pointer-events-none" style={{ background: 'linear-gradient(45deg, transparent 0%, transparent 100%)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }}></div>
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mr-4 transition-all duration-300 hover:scale-110">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl font-extrabold text-white uppercase tracking-wider leading-tight text-shadow-lg font-orbitron">
                Our Vision
              </h2>
            </div>
            <p className="text-lg text-base leading-relaxed text-neutral-200 mt-4 border-t border-blue-500/20 pt-4">
              A world where great ideas become reality. We&apos;re building a global hub where innovators connect, collaborate, and create solutions that shape tomorrow&apos;s world.
            </p>
          </section>

          <section className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 text-white hover:bg-white/10 transition-colors duration-200">
            {/* Beveled edge effect */}
            <div className="absolute inset-0 border-4 border-transparent rounded-2xl pointer-events-none" style={{ background: 'linear-gradient(45deg, transparent 0%, transparent 100%)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }}></div>
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mr-4 transition-all duration-300 hover:scale-110">
                <FaNetworkWired className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl font-extrabold text-white uppercase tracking-wider leading-tight text-shadow-lg font-orbitron">
                Our Team
              </h2>
            </div>
            <p className="text-lg text-base leading-relaxed text-neutral-200 mt-4 border-t border-blue-500/20 pt-4">
              A powerhouse of tech visionaries and creative problem-solvers. We&apos;re obsessed with building an innovation platform that&apos;s both powerful and intuitive.
            </p>
            {/* You can add team member cards or details here */}
          </section>

          <section className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 text-white hover:bg-white/10 transition-colors duration-200">
            {/* Beveled edge effect */}
            <div className="absolute inset-0 border-4 border-transparent rounded-2xl pointer-events-none" style={{ background: 'linear-gradient(45deg, transparent 0%, transparent 100%)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }}></div>
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mr-4 transition-all duration-300 hover:scale-101">
                <FaHandshake className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl font-extrabold text-white uppercase tracking-wider leading-tight text-shadow-lg font-orbitron">
                Join Us
              </h2>
            </div>
            <p className="text-lg text-base leading-relaxed text-neutral-200 mt-4 border-t border-white/10 pt-4">
              Your idea, our platform. Whether you&apos;re a first-time founder or a seasoned entrepreneur, Lion gives your vision wings. Let&apos;s build something amazing—together.
            </p>
          </section>
        </div>
      </div>
    </HeroPageLayout>
  );
}
