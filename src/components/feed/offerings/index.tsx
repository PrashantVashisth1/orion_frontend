// import { ChevronRight } from "lucide-react"

// const products = ["Fashion", "Home Decor", "Kitchen Essentials", "Home Decor"]
// const services = ["Zero Commission", "Easy Product Listing", "Doorstep Delivery", "Secure Payment Options"]

// export default function Offerings() {
//   return (
//     <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full">
//       <h3 className="text-xl font-bold text-white mb-6">What do we Offer?</h3>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
//           <h4 className="font-semibold text-white mb-4">Products</h4>
//           <div className="space-y-2 mb-4">
//             {products.map((product, index) => (
//               <div key={index} className="bg-gray-600/50 rounded-lg px-3 py-2 text-sm text-gray-300 border border-gray-500/50">
//                 {product}
//               </div>
//             ))}
//           </div>
//           <button className="text-blue-400 text-sm font-medium hover:text-blue-300">View All</button>
//         </div>

//         <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
//           <h4 className="font-semibold text-white mb-4">Services</h4>
//           <div className="space-y-2 mb-4">
//             {services.map((service, index) => (
//               <div key={index} className="bg-gray-600/50 rounded-lg px-3 py-2 text-sm text-gray-300 border border-gray-500/50">
//                 {service}
//               </div>
//             ))}
//           </div>
//           <button className="text-blue-400 text-sm font-medium hover:text-blue-300">View All</button>
//         </div>

//         <div className="bg-gray-700/50 rounded-xl p-4 relative border border-gray-600/50">
//           <h4 className="font-semibold text-white mb-4">Others</h4>
//           <div className="h-32 flex items-center justify-center">
//             <ChevronRight className="h-8 w-8 text-gray-400" />
//           </div>
//           <button className="text-blue-400 text-sm font-medium hover:text-blue-300">View All</button>
//         </div>
//       </div>
//     </div>
//   )
// }


import { ChevronRight } from "lucide-react"
import type { StartupProfileResponse } from "@/types/startup"

interface OfferingsProps {
  profile: StartupProfileResponse | null | undefined
}

export default function Offerings({ profile }: OfferingsProps) {
  const products = profile?.data?.offerings?.products || []
  const services = profile?.data?.offerings?.services || []

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full">
      <h3 className="text-xl font-bold text-white mb-6">What do we Offer?</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
          <h4 className="font-semibold text-white mb-4">Products</h4>
          <div className="space-y-2 mb-4">
            {products.length > 0 ? (
              products.map((product: string, index: number) => (
                <div key={index} className="bg-gray-600/50 rounded-lg px-3 py-2 text-sm text-gray-300 border border-gray-500/50">
                  {product}
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No products listed.</p>
            )}
          </div>
          {products.length > 5 && (
            <button className="text-blue-400 text-sm font-medium hover:text-blue-300">View All</button>
          )}
        </div>

        <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
          <h4 className="font-semibold text-white mb-4">Services</h4>
          <div className="space-y-2 mb-4">
            {services.length > 0 ? (
              services.map((service: string, index: number) => (
                <div key={index} className="bg-gray-600/50 rounded-lg px-3 py-2 text-sm text-gray-300 border border-gray-500/50">
                  {service}
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No services listed.</p>
            )}
          </div>
          {services.length > 5 && (
            <button className="text-blue-400 text-sm font-medium hover:text-blue-300">View All</button>
          )}
        </div>

        <div className="bg-gray-700/50 rounded-xl p-4 relative border border-gray-600/50">
          <h4 className="font-semibold text-white mb-4">Others</h4>
          <div className="h-32 flex items-center justify-center">
            <ChevronRight className="h-8 w-8 text-gray-400" />
          </div>
          <button className="text-blue-400 text-sm font-medium hover:text-blue-300">View All</button>
        </div>
      </div>
    </div>
  )
}
