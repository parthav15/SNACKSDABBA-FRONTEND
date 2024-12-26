import React from "react";
import "../../tailwind-css/input.css";

const FeaturesCard = () => {
    const features = [
        {
          lottieSrc:
            "https://lottie.host/c82ec8a7-60aa-4a61-90d3-c1df349b9b97/vYfuMeXJif.json",
          title: "Free Delivery",
          description: "For all orders over $99",
        },
        {
          lottieSrc:
            "https://lottie.host/cfadff87-79c4-4715-b6ba-b59b64f4aa68/8ikGR1NdHR.json",
          title: "Secure Payment",
          description: "100% secure payment",
        },
        {
          lottieSrc:
            "https://lottie.host/f3cd1cef-b7f3-4065-b148-f1860fb741a0/EnRdrapPEq.json",
          title: "24/7 Support",
          description: "Dedicated support",
        },
        {
          lottieSrc:
            "https://lottie.host/ef93f7b4-d17a-40c1-b9dc-deeda4bb7553/4A73r8ZSiz.json",
          title: "Gift Service",
          description: "Support gift service",
        },
        {
          lottieSrc:
            "https://lottie.host/b7646457-ccf2-4f72-9ef4-fa5075f657fc/qYxBE9Z0gS.json",
          title: "1000+",
          description: "International Snacks on Store",
        },
        {
          lottieSrc:
            "https://lottie.host/9395d4f4-cb05-450a-be5f-075e3a1b4163/DdePjNcwzE.json",
          title: "22,000+",
          description: "Pin-codes Served in India",
        },
      ];
    
      return (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Why <span className="text-rose-500">Millions</span> of Customers Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 items-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-1 text-center"
              >
                {/* Lottie Player */}
                <div>
                  <lottie-player
                    src={feature.lottieSrc}
                    background="transparent"
                    speed="1"
                    style={{ width: "80px", height: "80px" }}
                    loop
                    mode="bounce"
                    autoplay
                  ></lottie-player>
                </div>
                {/* Title */}
                <h3 className="text-sm font-medium text-gray-800">
                  {feature.title}
                </h3>
                {/* Description */}
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    };
export default FeaturesCard;
