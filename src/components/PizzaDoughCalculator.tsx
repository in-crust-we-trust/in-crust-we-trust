
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dough, Pizza, Salt, Wheat, Droplet } from "lucide-react";

interface CalculatorOutput {
  totalDoughBalls: number;
  totalSalt: number;
  totalWater: number;
  totalDryYeast: number;
  totalFlour: number;
}

const PizzaDoughCalculator = () => {
  const [doughBalls, setDoughBalls] = useState<number>(4);
  const [weightPerBall, setWeightPerBall] = useState<number>(250);
  const [output, setOutput] = useState<CalculatorOutput>({
    totalDoughBalls: 4,
    totalSalt: 0,
    totalWater: 0,
    totalDryYeast: 0,
    totalFlour: 0
  });

  // Constants based on the formula
  const WATER_PERCENTAGE = 62.5; // Hydration percentage
  const SALT_PERCENTAGE = 2.55; // Salt percentage
  const YEAST_PERCENTAGE = 0.204; // Dry yeast percentage
  const TOTAL_PERCENTAGE = 100 + WATER_PERCENTAGE + SALT_PERCENTAGE + YEAST_PERCENTAGE; // 165.254%

  useEffect(() => {
    // Calculate total dough weight
    const totalDoughWeight = doughBalls * weightPerBall;

    // Calculate flour amount based on the formula
    const totalFlour = totalDoughWeight / (TOTAL_PERCENTAGE / 100);

    // Calculate other ingredients based on percentages
    const totalWater = totalFlour * (WATER_PERCENTAGE / 100);
    const totalSalt = totalFlour * (SALT_PERCENTAGE / 100);
    const totalDryYeast = totalFlour * (YEAST_PERCENTAGE / 100);

    setOutput({
      totalDoughBalls: doughBalls,
      totalSalt: parseFloat(totalSalt.toFixed(1)),
      totalWater: parseFloat(totalWater.toFixed(1)),
      totalDryYeast: parseFloat(totalDryYeast.toFixed(1)),
      totalFlour: parseFloat(totalFlour.toFixed(1))
    });
  }, [doughBalls, weightPerBall]);

  const handleDoughBallsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0 && value <= 20) {
      setDoughBalls(value);
    }
  };

  const handleDoughBallsSlider = (value: number[]) => {
    setDoughBalls(value[0]);
  };

  const handleWeightPerBallChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0 && value <= 1000) {
      setWeightPerBall(value);
    }
  };

  const handleWeightSlider = (value: number[]) => {
    setWeightPerBall(value[0]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Alert className="mb-6 bg-pizza-cream border-pizza-red">
        <AlertDescription className="text-pizza-brown">
          <strong>Heads up!</strong> This calculator is dialed in for flour with 12.5g-13g protein (like typical 'All-Purpose' in some regions, or 'Strong Bread Flour' in others). Results may vary with different flour types.
        </AlertDescription>
      </Alert>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-md border-pizza-cream">
          <CardHeader className="bg-pizza-red text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Pizza className="h-5 w-5" />
              Input Parameters
            </CardTitle>
            <CardDescription className="text-pizza-cream">
              Set the amount and size of your pizza dough balls
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="doughBalls" className="text-pizza-brown font-medium">
                    Number of Dough Balls
                  </Label>
                  <span className="text-pizza-red font-semibold">{doughBalls}</span>
                </div>
                <Input 
                  id="doughBalls" 
                  type="number" 
                  min={1} 
                  max={20} 
                  value={doughBalls} 
                  onChange={handleDoughBallsChange}
                  className="border-pizza-olive focus:ring-pizza-red"
                />
                <Slider 
                  value={[doughBalls]} 
                  min={1} 
                  max={20} 
                  step={1} 
                  onValueChange={handleDoughBallsSlider}
                  className="mt-2"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="weightPerBall" className="text-pizza-brown font-medium">
                    Weight per Dough Ball (g)
                  </Label>
                  <span className="text-pizza-red font-semibold">{weightPerBall}g</span>
                </div>
                <Input 
                  id="weightPerBall" 
                  type="number" 
                  min={100} 
                  max={1000} 
                  value={weightPerBall} 
                  onChange={handleWeightPerBallChange}
                  className="border-pizza-olive focus:ring-pizza-red"
                />
                <Slider 
                  value={[weightPerBall]} 
                  min={100} 
                  max={600} 
                  step={10} 
                  onValueChange={handleWeightSlider}
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-pizza-light text-sm text-pizza-brown italic rounded-b-lg">
            Adjusted for perfect Neapolitan-style pizza dough
          </CardFooter>
        </Card>
        
        <Card className="shadow-md border-pizza-cream">
          <CardHeader className="bg-pizza-olive text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Dough className="h-5 w-5" />
              Calculated Ingredients
            </CardTitle>
            <CardDescription className="text-pizza-light">
              Your pizza dough recipe for {doughBalls} dough balls
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-dashed border-pizza-cream pb-2">
                <div className="flex items-center gap-2">
                  <Pizza className="h-5 w-5 text-pizza-red" />
                  <span className="text-pizza-brown">Total Dough Balls</span>
                </div>
                <strong className="text-pizza-red">{output.totalDoughBalls}</strong>
              </div>
              
              <div className="flex items-center justify-between border-b border-dashed border-pizza-cream pb-2">
                <div className="flex items-center gap-2">
                  <Salt className="h-5 w-5 text-pizza-red" />
                  <span className="text-pizza-brown">Total Salt</span>
                </div>
                <strong className="text-pizza-red">{output.totalSalt}g</strong>
              </div>
              
              <div className="flex items-center justify-between border-b border-dashed border-pizza-cream pb-2">
                <div className="flex items-center gap-2">
                  <Droplet className="h-5 w-5 text-pizza-red" />
                  <span className="text-pizza-brown">Total Water</span>
                </div>
                <strong className="text-pizza-red">{output.totalWater}g</strong>
              </div>
              
              <div className="flex items-center justify-between border-b border-dashed border-pizza-cream pb-2">
                <div className="flex items-center gap-2">
                  <Dough className="h-5 w-5 text-pizza-red" />
                  <span className="text-pizza-brown">Total Dry Yeast</span>
                </div>
                <strong className="text-pizza-red">{output.totalDryYeast}g</strong>
              </div>
              
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <Wheat className="h-5 w-5 text-pizza-red" />
                  <span className="text-pizza-brown">Total Flour</span>
                </div>
                <strong className="text-pizza-red">{output.totalFlour}g</strong>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-pizza-light text-sm text-pizza-brown italic rounded-b-lg">
            Total dough weight: {(output.totalDoughBalls * weightPerBall).toFixed(1)}g
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PizzaDoughCalculator;
