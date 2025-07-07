export const PropertyMap = () => {
  return (
  <>
      <h2 className="text-2xl font-semibold text-gray-900 mb-8 font-sans tracking-tight">
        Neighbourhood
      </h2>
      <div className="h-[400px] rounded-xl overflow-hidden border border-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3652411242274!2d80.14433931482233!3d13.00747999081761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525fac595c29ff%3A0xb0f05d5c40b172b4!2sChromepet%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1620796867789!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      </>

  );
};