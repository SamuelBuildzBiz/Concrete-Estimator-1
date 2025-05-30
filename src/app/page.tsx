import EstimationForm from './components/EstimationForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            EZ Estimator
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Generate accurate concrete project estimates in minutes
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
          <EstimationForm />
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Powered by advanced AI technology to provide accurate estimates for your concrete projects.
          </p>
        </div>
      </div>
    </main>
  );
}
