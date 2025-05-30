# EZ Estimator - AI Residential Concrete Estimator

An AI-powered web application for estimating residential concrete projects. This tool helps contractors quickly generate accurate estimates based on project type, square footage, and other factors.

## Features

* **Project Type Selection**: Different rates for:
  * Driveways
  * Patios
  * Sidewalks
  * Pool Decks
  * Foundations
  * Garage Floors
  * Decorative Concrete
  * Concrete Repairs

* **Concrete Specifications**:
  * Thickness options (4", 6", 8")
  * PSI strength options (2500, 3000, 3500, 4000)
  * Fiber mesh reinforcement
  * Wire mesh reinforcement
  * Rebar options

* **Surface Finish Options**:
  * Broom finish
  * Smooth finish
  * Exposed aggregate
  * Stamped patterns
  * Color options
  * Sealer application

* **Site Conditions**:
  * Slope calculation
  * Excavation needs
  * Soil type assessment
  * Access difficulty
  * Haul-away requirements
  * Form work complexity

* **Additional Services**:
  * Demolition of existing concrete
  * Grading
  * Drainage solutions
  * Base preparation
  * Expansion joints
  * Control joints

* **Smart Features**:
  * Material quantity calculations
  * Labor cost estimation
  * Equipment requirements
  * Project duration estimation
  * Weather considerations
  * Permit requirement checks
  * Profit margin calculator
  * Travel cost estimation

* **Professional Tools**:
  * PDF quote generation
  * Project visualization
  * Material ordering lists
  * Schedule planning
  * Contract templates
  * Photo documentation
  * Client communication portal

## Pricing Components

### Base Rates (per square foot):
* Standard Concrete Work: $8-12/sq ft
* Decorative Concrete: $12-18/sq ft
* Specialty Finishes: $15-25/sq ft
* Repairs: Custom pricing based on scope

### Additional Costs:
* Demolition: $3-5/sq ft
* Excavation: $2-4/sq ft
* Premium Finishes: +15-30%
* Reinforcement: $0.50-1.50/sq ft
* Sealer Application: $0.75-1.25/sq ft
* Site Preparation: Based on conditions

### Adjustments:
* Slope Difficulty: +10-30%
* Access Difficulty: +5-20%
* Weather Considerations: +5-15%
* Urgent Timeline: +10-25%
* Permit Fees: Local rates
* Travel Costs: Based on distance

## Getting Started

### Prerequisites
* Node.js 14.x or higher
* npm or yarn
* OpenAI API key (for AI recommendations)

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd ez-estimator
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file with:
```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used
* Next.js
* React
* TypeScript
* Tailwind CSS
* React Hook Form
* OpenAI API
* PDF Generation
* Material Calculation Engine
* Weather API Integration
* Geolocation Services

## License
MIT
