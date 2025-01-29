import nodemailer from 'nodemailer';


export default function BlogForm() {

  async function handleForm(formData) {
    'use server';
    const name = formData.get("name");
    const email = formData.get("email");
    const suggestions = formData.get("suggestions");

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Suggestions:", suggestions);

    try {
      const res = await fetch('http://localhost:3000/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, suggestions }),
      });

     
      const contentType = res.headers.get('Content-Type');

      let result;

      if (contentType && contentType.includes('application/json')) {
        result = await res.json();
      } else {
        result = await res.text();
        console.error('Non-JSON response:', result);
      }

      if (res.ok) {
        console.log('Email sent successfully:', result);
      } else {
        console.log('Error sending email:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-lg p-8 bg-white shadow-xl rounded-3xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Submit Your Suggestions</h2>
        <p className="text-center text-gray-600 mb-8">We value your feedback! Let us know what you think.</p>
        <form className="space-y-8" action={handleForm}>
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-gray-700">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            />
          </div>
          <div>
            <label htmlFor="suggestions" className="block text-lg font-semibold text-gray-700">
              Your Suggestions
            </label>
            <textarea
              id="suggestions"
              name="suggestions"
              placeholder="Write your suggestions here..."
              rows={6}
              className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
