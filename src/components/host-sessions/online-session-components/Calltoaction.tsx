
import { Button } from "@/components/ui/button"


function Calltoaction() {
  return (
 <>      {/* Call to Action Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r bg-black text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative w-full px-8 md:px-12 lg:px-20 xl:px-32 py-16">
          <div className="text-center w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Startup Journey?</h2>
            <p className="text-xl mb-8 text-purple-100">
              Join thousands of entrepreneurs who are already connecting, learning, and growing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
                Sign Up Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3 text-lg bg-transparent"
              >
                Explore Sessions
              </Button>
            </div>
            <div className="mt-8 flex justify-center space-x-8 text-sm text-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div>Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div>Sessions Monthly</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div>Connections Made</div>
              </div>
            </div>
          </div>
        </div>
      </section>
   
    </>

  )
}

export default Calltoaction