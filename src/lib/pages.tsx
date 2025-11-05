import React from 'react';
import ResearchSection from './ResearchSection';
import HackathonSection from './HackathonSection';

export const appMap: Record<string, React.ReactNode> = {
  'research.exe': (
    <div className="w-full h-full overflow-auto rounded-md scrollbar-hide" style={{backgroundColor: '#C8C393'}}>
        <ResearchSection />
    </div>
  ),

  'hackathons.exe': (
    <div className="w-full h-full overflow-auto rounded-md scrollbar-hide" style={{backgroundColor: "#C8C393"}}>
      <HackathonSection />
    </div>
  ),

  'portfolio.exe': (
    <div className="w-full h-full overflow-auto bg-gray-900 rounded-lg scrollbar-hide">
      <div className="p-8 text-green-200 space-y-6">
        <h1 className="text-3xl font-semibold text-green-300 mb-2">
          Portfolio
        </h1>
        <p className="text-lg text-green-100 leading-relaxed">
          Coming Soon!
        </p>
      </div>
    </div>
  ),

  'fun.exe': (
    <div className="w-full h-full overflow-auto bg-gray-900 rounded-lg scrollbar-hide">
      <div className="p-8 text-green-200 space-y-6">
        <h1 className="text-3xl font-semibold text-green-300 mb-2">
          Cool Stuff
        </h1>
        <p className="text-lg text-green-100 leading-relaxed">
          Coming Soon!
        </p>
      </div>
    </div>
  ),
};
