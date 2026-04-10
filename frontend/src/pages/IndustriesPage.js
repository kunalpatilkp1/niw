import { motion } from 'framer-motion';

const IndustriesPage = () => {
  const industries = [
    {
      emoji: '🍴',
      name: 'Restaurants & Cafes',
      needs: 'Drive foot traffic, online orders, and reservations',
      solutions: ['Instagram food photography', 'Google My Business optimization', 'WhatsApp order system', 'Delivery platform integration'],
      package: 'Gold',
    },
    {
      emoji: '🛋️',
      name: 'Furniture & Interiors',
      needs: 'Showcase designs and generate high-value leads',
      solutions: ['Portfolio website', 'Instagram visual storytelling', 'Lead capture forms', 'Before/After content'],
      package: 'Gold or Diamond',
    },
    {
      emoji: '🛒',
      name: 'Retail Shops',
      needs: 'Increase store visits and online sales',
      solutions: ['Social commerce setup', 'Seasonal campaigns', 'Inventory promotions', 'Customer loyalty programs'],
      package: 'Silver or Gold',
    },
    {
      emoji: '💇',
      name: 'Salons & Clinics',
      needs: 'Book appointments and build client base',
      solutions: ['Online booking system', 'Before/After galleries', 'Service packages marketing', 'Review management'],
      package: 'Gold',
    },
    {
      emoji: '🏠',
      name: 'Real Estate',
      needs: 'Generate quality property inquiries',
      solutions: ['Property listing pages', 'Virtual tour videos', 'Lead qualification system', 'Facebook/Google Ads'],
      package: 'Diamond',
    },
    {
      emoji: '🏫',
      name: 'Education & Coaching',
      needs: 'Fill batches and increase enrollments',
      solutions: ['Course landing pages', 'Webinar funnels', 'Student testimonials', 'WhatsApp follow-up'],
      package: 'Gold or Diamond',
    },
    {
      emoji: '💻',
      name: 'Ecommerce',
      needs: 'Scale sales and improve conversions',
      solutions: ['Product catalog optimization', 'Abandoned cart recovery', 'Email automation', 'Retargeting ads'],
      package: 'Diamond',
    },
    {
      emoji: '🎁',
      name: 'Gift & Toy Shops',
      needs: 'Drive seasonal sales and repeat purchases',
      solutions: ['Festival campaigns', 'Gift guide content', 'Social shopping', 'Customer retention emails'],
      package: 'Silver or Gold',
    },
  ];

  return (
    <div className="pt-32 pb-24" data-testid="industries-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 text-gradient-sky">
            Industry-Specific Digital Growth Plans
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Different businesses need different strategies. NIW adapts to your industry.
          </p>
        </motion.div>

        {/* Industries */}
        <div className="space-y-16">
          {industries.map((industry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-effect rounded-3xl p-12"
              data-testid={`industry-${idx}`}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="text-7xl"
                >
                  {industry.emoji}
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">{industry.name}</h2>
                  <p className="text-lg text-slate-600 mb-6">
                    <span className="font-semibold text-sky-600">What they need:</span> {industry.needs}
                  </p>
                  <div className="mb-6">
                    <p className="font-semibold text-slate-900 mb-3">How NIW helps:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {industry.solutions.map((solution, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-slate-700">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div>
                      <span className="text-sm font-semibold text-slate-700">Best Package: </span>
                      <span className="text-sky-600 font-bold">{industry.package}</span>
                    </div>
                    <a href="/contact" className="px-6 py-2 bg-sky-500 text-white rounded-full font-semibold text-sm hover:bg-sky-600 transition-colors">
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustriesPage;
