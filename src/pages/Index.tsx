
import PizzaDoughCalculator from '@/components/PizzaDoughCalculator';
import { Pizza } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pizza-light">
      <header className="py-8 bg-pizza-red text-white shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
            <Pizza className="h-8 w-8" />
            Pizza Dough Calculator
          </h1>
          <p className="mt-2 text-pizza-cream">Perfect proportions for perfect pizza</p>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <PizzaDoughCalculator />
      </main>

      <footer className="py-6 text-center text-pizza-brown border-t border-pizza-cream">
        <div className="container mx-auto">
          <p>🍕 Crafted with love for pizza enthusiasts everywhere</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
