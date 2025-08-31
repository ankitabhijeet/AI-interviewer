import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (<div className="grid min-h-svh lg:grid-cols-2">
        
          
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
             <SignUp />
  
            </div>
          
        </div>
        <div className="bg-muted relative hidden lg:block">
          
          <img
            src="https://images.unsplash.com/photo-1684369175833-4b445ad6bfb5?q=80&w=1396&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
             {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
  
          {/* Overlay text */}
          <div className="absolute bottom-8 right-20 text-center">
            <h1 className="text-2xl md:text-5xl font-light text-white">
              Crack Interviews with AI practice
            </h1>
            <p className="mt-2 text-gray-300 text-sm md:text-base font-extralight">
              Prep smarter, perform better
            </p>
          </div>
        </div>
        
      </div>)
}