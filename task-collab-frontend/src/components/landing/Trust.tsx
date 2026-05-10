import { motion } from "framer-motion";

export default function Trust() {
  const logos = [
    { name: "TechCorp", color: "bg-blue-100" },
    { name: "StartupXYZ", color: "bg-indigo-100" },
    { name: "CloudMinded", color: "bg-cyan-100" },
    { name: "DevTools", color: "bg-purple-100" },
    { name: "FastScale", color: "bg-pink-100" },
    { name: "DataFlow", color: "bg-green-100" },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm font-medium text-gray-600 mb-8">
          Trusted by 10,000+ teams worldwide
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`w-32 h-12 ${logo.color} rounded-lg flex items-center justify-center font-semibold text-gray-700 text-sm`}
            >
              {logo.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
