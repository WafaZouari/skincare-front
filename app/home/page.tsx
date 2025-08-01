"use client";

import { useState, FormEvent, useEffect } from "react";
import Head from "next/head";
import "../globals.css";
type Product = {
  name: string;
  targetConcerns: string;
  price: string;
  link: string;
};
// Helper function to parse products from markdown table
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.targetConcerns}</p>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-blue-600">{product.price}</span>
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition-colors"
          >
            View Product
          </a>
        </div>
      </div>
    </div>
  );
};
const parseProductsFromResponse = (response: string) => {
  if (!response) return [];

  // Find the markdown table in the response
  const tableRegex = /\|.*?\n\|.*?\n(\|.*?\n)*/g;
  const tableMatch = response.match(tableRegex);

  if (!tableMatch) return [];

  const table = tableMatch[0];
  const rows = table.split('\n').filter(row => row.startsWith('|'));

  // Skip header and separator rows
  const productRows = rows.slice(2);

  return productRows.map(row => {
    const columns = row.split('|').map(col => col.trim()).filter(Boolean);
    return {
      name: columns[0],
      targetConcerns: columns[1],
      price: columns[2],
      link: columns[3]
    };
  });
};
export default function Home() {
  const [skinConcern, setSkinConcern] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  //const [hasProducts, setHasProducts] = useState<boolean>(false);
  const [textResponse, setTextResponse] = useState<string>("");
  useEffect(() => {
    const parsedProducts = parseProductsFromResponse(response);
    setProducts(parsedProducts);
    //setHasProducts(parsedProducts.length > 0);

    const cleanedText = parsedProducts.length > 0
      ? response.split('\n').filter(line => !line.startsWith('|')).join('\n')
      : response;

    setTextResponse(cleanedText);
  }, [response]);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      // Replace with your actual API endpoint
      //https://skincare-api-iknz.onrender.com/ask if deployed
      //"http://127.0.0.1:8000/ask" if running locally
      const res = await fetch("https://skincare-api-iknz.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skin_concern: skinConcern, question }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setResponse("Error fetching response. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <Head>
        <title>Skincare Advisor | Personalized Recommendations</title>
        <meta name="description" content="Get expert skincare advice tailored to your concerns" />
        <link rel="icon" href="./favicon.ico" />
      </Head>

      <main className="px-4 py-8 md:py-12 w-full h-full">
        {/* Hero Section */}
        <section className="text-center mb-10 animate-fade-in">
          <div className="inline-block bg-gradient-to-r from-blue-100 to-pink-100 rounded-full p-2 mb-4">
            <div className="bg-white rounded-full p-3">
              <span className="text-3xl">✨</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Your Personal Skincare Advisor
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            Get customized recommendations for your unique skin needs
          </p>
        </section>

        {/* Consultation Form */}
        <section className="mb-10 animate-fade-in-up">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Skin Concern Input */}
                <div className="space-y-3">
                  <label htmlFor="skinConcern" className="block text-sm font-medium text-gray-700 m-2">
                    what is your primary skin concern?
                  </label>

                  <div className="relative">
                    <input
                      id="skinConcern"
                      type="text"
                      value={skinConcern}
                      onChange={(e) => setSkinConcern(e.target.value)}
                      placeholder="Acne, dryness, aging, sensitivity..."
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-400">💆‍♀️</span>
                    </div>
                  </div>
                </div>

                {/* Question Input */}
                <div className="space-y-3">
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                    Your specific question
                  </label>
                  <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={4}
                    placeholder="What products would help with hydration? How can I reduce redness?..."
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center ${loading ? "cursor-not-allowed" : "hover:-translate-y-0.5"
                    }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Analyzing Your Skin...
                    </>
                  ) : (
                    "Get Personalized Advice"
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {response && (
          <section className="animate-fade-in-up">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-pink-500 p-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Your Skincare Recommendation
                </h2>
              </div>
              <div className="p-6">
                {/*  <div className="prose max-w-none text-gray-700">
                  {response.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                  ))}
                </div> */}
                <div className="p-6">

                  <h3 className="font-bold text-lg text-gray-800 mb-4">Recommended Products</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {products?.map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))}
                  </div>


                  <div className="prose max-w-none text-gray-700">
                    {textResponse.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-500 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Remember to patch test new products and consult a dermatologist for serious concerns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}