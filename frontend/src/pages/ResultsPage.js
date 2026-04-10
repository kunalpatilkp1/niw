import { motion } from 'framer-motion';

const ResultsPage = () => {
  const results = [
    {
      industry: 'Restaurant',
      problem: 'Low foot traffic and online orders',
      solution: 'Instagram content + Google My Business + WhatsApp ordering',
      result: '3x increase in orders within 2 months',
    },
    {
      industry: 'Furniture Store',
      problem: 'No online presence, losing to competitors',
      solution: 'Portfolio website + SEO + Facebook Ads',
      result: '50+ quality leads per month',
    },
    {
      industry: 'Salon & Spa',
      problem: 'Empty appointment slots',
      solution: 'Booking system + Instagram Reels + Email campaigns',
      result: '80% capacity utilization',
    },
  ];

  return (
    <div className="pt-32 pb-24" data-testid="results-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 text-gradient-sky">
            See What NIW Can Build for Businesses Like Yours
          </h1>
        </motion.div>

        <div className="space-y-12">
          {results.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-effect rounded-3xl p-12"
              data-testid={`result-${idx}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-sm font-semibold text-sky-600 uppercase tracking-wide mb-2">Client Type</p>
                  <p className="text-2xl font-bold text-slate-900">{item.industry}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-2">Problem</p>
                  <p className="text-slate-700">{item.problem}</p>
                  <p className="text-sm font-semibold text-sky-600 uppercase tracking-wide mt-4 mb-2">Solution</p>
                  <p className="text-slate-700">{item.solution}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">Result</p>
                  <p className="text-2xl font-bold text-green-600">{item.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
