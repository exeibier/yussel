'use client'

import React from 'react';
import { MessageCircle, Mail, MapPin } from 'lucide-react';

const ContactSection = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+5215587791879', '_blank');
  };

  const handleEmailClick = () => {
    window.open('mailto:yussel.estrada@gmail.com', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to capture your special moments? Get in touch and let&apos;s discuss your 
            photography needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* WhatsApp */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">WhatsApp</h3>
                <p className="text-gray-600">Quick response guaranteed</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                <button 
                  onClick={handleEmailClick}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  yussel.estrada@gmail.com
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Location</h3>
                <p className="text-gray-600">Available worldwide</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Call to Action */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Start a Conversation
              </h3>
              
              <p className="text-gray-600 mb-8">
                Send me a message on WhatsApp and I&apos;ll get back to you within a few hours.
              </p>
              
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Message on WhatsApp</span>
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                Usually responds within a few hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
