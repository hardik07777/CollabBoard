import { motion } from "framer-motion";
import { Check } from "lucide-react";

const sections = [
  {
    title: "Real-time collaboration",
    description: "See your team's changes instantly. No more waiting, no more confusion. WebSocket-powered sync keeps everyone on the same page.",
    items: ["Live updates", "Instant notifications", "Smart conflict resolution"],
    imageRight: true,
  },
  {
    title: "Works the way you do",
    description: "Drag and drop tasks, customize workflows, and adapt the board to your team's unique needs. Flexibility without complexity.",
    items: ["Drag & drop interface", "Custom columns", "Team workflows"],
    imageRight: false,
  },
  {
    title: "Built for teams",
    description: "Manage permissions, invite teammates, and keep everyone accountable. Secure by default with role-based access control.",
    items: ["Role-based access", "Team management", "Audit logs"],
    imageRight: true,
  },
];

export default function Features() {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto space-y-32">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className={`grid lg:grid-cols-2 gap-16 items-center ${
              section.imageRight ? "" : "lg:auto-cols-fr"
            }`}
          >
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: section.imageRight ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className={section.imageRight ? "" : "lg:order-2"}
            >
              <div className="text-sm font-medium text-gray-600 mb-3">
                Feature {i + 1}
              </div>
              <h2 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-6 leading-tight">
                {section.title}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {section.description}
              </p>

              {/* Feature list */}
              <ul className="space-y-3">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className={section.imageRight ? "" : "lg:order-1"}
            >
              <div className="bg-gray-100 rounded-lg border border-gray-200 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 text-sm">Product screenshot</div>
                  <div className="text-gray-300 text-xs mt-2">Feature {i + 1}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
