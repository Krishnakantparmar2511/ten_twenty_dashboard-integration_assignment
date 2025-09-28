export const BrandingPart: React.FC = () => {
  return (
    <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-6 md:p-12 min-h-[300px] md:min-h-screen">
      <div className="text-center text-white max-w-lg">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          ticktock
        </h2>
        <p className="text-base md:text-lg lg:text-xl leading-relaxed opacity-95">
          Introducing ticktock, our cutting-edge timesheet web application
          designed to revolutionize how you manage employee work hours. With
          ticktock, you can effortlessly track and monitor employee attendance
          and productivity from anywhere, anytime, using any internet-connected
          device.
        </p>
      </div>
    </div>
  );
};
