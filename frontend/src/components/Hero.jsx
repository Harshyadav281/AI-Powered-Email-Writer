import { useState } from "react";

function Hero() {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("Formal");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setEmail(text);
  };

  const generateEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type }),
      });

      const data = await res.json();
      setResponse(data.generatedEmail);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* HERO SECTION */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">
            ✨ AI-Powered Email Writer
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Craft Perfect Emails{" "}
            <span className="text-indigo-500">Instantly</span>
          </h1>

          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Transform your ideas into polished, professional emails with the
            power of AI. Choose your tone, paste your content, and let magic
            happen.
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">⚡ Instant Generation</h3>
            <p className="text-gray-500 text-sm">
              Generate high-quality emails in seconds using AI.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">🎯 Tone Selection</h3>
            <p className="text-gray-500 text-sm">
              Pick Formal, Casual, or Persuasive tone effortlessly.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">📋 Clipboard Support</h3>
            <p className="text-gray-500 text-sm">
              Paste content directly and save time instantly.
            </p>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* TONE SELECTION */}
          <h3 className="font-semibold mb-3">Select Email Tone</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {["Formal", "Casual", "Persuasive"].map((tone) => (
              <div
                key={tone}
                onClick={() => setType(tone)}
                className={`cursor-pointer border rounded-xl p-4 text-center transition
                  ${
                    type === tone
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
              >
                <h4 className="font-semibold">{tone}</h4>
                <p className="text-sm text-gray-500">
                  {tone === "Formal" && "Professional & business-ready"}
                  {tone === "Casual" && "Friendly & relaxed tone"}
                  {tone === "Persuasive" && "Convincing & impactful"}
                </p>
              </div>
            ))}
          </div>

          {/* EMAIL INPUT */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Your Email Content</h3>
            <button
              type="button"
              onClick={handlePaste}
              className="text-sm px-3 py-1 border rounded-lg hover:bg-gray-100"
            >
              📋 Paste from Clipboard
            </button>
          </div>

          <form onSubmit={generateEmail}>
            <textarea
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email content or idea here..."
              className="w-full h-40 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-6 resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Generating..." : "✨ Generate Email"}
            </button>
          </form>

          {/* RESPONSE */}
          {response && (
            <div className="mt-10 bg-gray-50 p-6 rounded-xl border">
              <h3 className="font-semibold mb-2">Generated Email</h3>
              <pre className="whitespace-pre-wrap text-gray-700">
                {response}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
