const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <div className="space-y-6">
              <h3 className="text-3xl font-serif font-light mb-2">
                Miss <span className="text-[#f7ce83]">Kitty</span>
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg max-w-md font-light">
                Discover elegance with Miss Kitty - your premier destination for
                exquisite dresses. From stunning evening gowns to chic cocktail
                dresses, we curate timeless pieces that celebrate your unique
                style and grace.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4 pt-4">
                {[
                  {
                    name: "Facebook",
                    icon: (
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    ),
                  },
                  {
                    name: "Instagram",
                    icon: (
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.73-3.016-1.804L4.87 12.762c-.568-1.074-.568-2.388 0-3.462l.563-1.422c.568-1.074 1.719-1.804 3.016-1.804h7.102c1.297 0 2.448.73 3.016 1.804l.563 1.422c.568 1.074.568 2.388 0 3.462l-.563 1.422c-.568 1.074-1.719 1.804-3.016 1.804H8.449z" />
                    ),
                  },
                  {
                    name: "WhatsApp",
                    icon: (
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.687" />
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="group relative p-3 bg-gray-800 rounded-lg hover:bg-[#f7ce83] transition-all duration-300 transform hover:-translate-y-1"
                    aria-label={social.name}
                  >
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {social.icon}
                    </svg>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {social.name}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-xl font-serif font-light mb-6 pb-2 border-b border-gray-700 inline-block">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Collection", href: "/products" },
                
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#f7ce83] transition-all duration-300 flex items-center group font-light"
                  >
                    <span className="w-2 h-2 bg-[#f7ce83] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-3"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 lg:col-start-9">
            <h4 className="text-xl font-serif font-light mb-6 pb-2 border-b border-gray-700 inline-block">
              Get In Touch
            </h4>
            <div className="space-y-4">
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  ),
                  text: "Algiers, Algeria",
                  description: "Our main boutique location",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  ),
                  text: "+213 771 836 015",
                  description: "Available 9AM - 6PM",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  ),
                  text: "contact@misskitty.dz",
                  description: "We respond within 24 hours",
                },
              ].map((contact, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-[#f7ce83] transition-all duration-300 flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {contact.icon}
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-100 font-medium group-hover:text-[#f7ce83] transition-colors duration-300">
                      {contact.text}
                    </p>
                    <p className="text-gray-400 text-sm font-light">
                      {contact.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gray-400 text-sm font-light">
              © 2024 Miss Kitty. Crafted with elegance in Algeria.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400 font-light">
              <a
                href="/privacy"
                className="hover:text-[#f7ce83] transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:text-[#f7ce83] transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="/shipping"
                className="hover:text-[#f7ce83] transition-colors duration-300"
              >
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
