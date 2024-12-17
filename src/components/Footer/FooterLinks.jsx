
const links = {
  Product: ['Features', 'Pricing', 'Success Stories', 'For Teams'],
  Resources: ['Documentation', 'Blog', 'Community', 'Support'],
  Company: ['About Us', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Code of Conduct'],
};

export default function FooterLinks() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:w-2/3">
      {Object.entries(links).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-white mb-4">{category}</h3>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}