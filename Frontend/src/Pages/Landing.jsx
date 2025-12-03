import React from 'react';
import Navbar from '../components/Navbar';
import { Twitter, Facebook, Instagram, CheckCircle, Users, BarChart2, Lock, Zap, TrendingUp, Shield, Sparkles } from 'lucide-react';

const Feature = ({ Icon, title, desc, delay = "0" }) => (
  <div className="card group animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-yellow/20 to-accent-yellow/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-7 h-7 text-accent-yellow-dark" />
    </div>
    <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

const Testimonial = ({ name, role, quote, delay = "0" }) => (
  <div className="card animate-slide-up" style={{ animationDelay: `${delay}ms` }}>
    <div className="flex items-center gap-4 mb-4">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
        {name.charAt(0)}
      </div>
      <div>
        <div className="font-bold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{role}</div>
      </div>
    </div>
    <p className="text-gray-700 leading-relaxed italic">"{quote}"</p>
  </div>
);

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen gradient-mesh flex flex-col">
      <Navbar onNavigate={onNavigate} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="section">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 animate-slide-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-yellow/30">
                  <Sparkles className="w-4 h-4 text-accent-yellow" />
                  <span className="text-sm font-semibold text-gray-700">Anonymous feedback made simple</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-gray-900 text-balance">
                  Peer feedback that{' '}
                  <span className="bg-gradient-to-r from-accent-yellow via-orange to-accent-yellow-dark bg-clip-text text-transparent">
                    actually helps
                  </span>{' '}
                  teams grow
                </h1>
                
                <p className="text-xl text-gray-700 leading-relaxed max-w-xl">
                  PeerPulse makes collecting honest, anonymous feedback fast and easy — with beautiful
                  dashboards, secure data handling, and simple sharing tools.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => onNavigate('register')} 
                    className="btn-primary text-lg group"
                  >
                    <span>Get started — it's free</span>
                    <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </button>
                  <button 
                    onClick={() => onNavigate('submitFeedback')} 
                    className="btn-secondary text-lg"
                  >
                    Try giving feedback
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">Anonymous</div>
                      <div className="text-xs text-gray-600">by default</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">Team-friendly</div>
                      <div className="text-xs text-gray-600">Easy setup</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">Secure</div>
                      <div className="text-xs text-gray-600">End-to-end</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative animate-scale-in animation-delay-200">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/20 to-orange/20 rounded-3xl blur-3xl"></div>
                <div className="relative glass-strong rounded-3xl p-8 shadow-strong">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-white/80 rounded-2xl shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green to-green-plant flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900">Team Performance</div>
                        <div className="text-xs text-gray-600">+45% this quarter</div>
                      </div>
                      <div className="text-2xl font-bold text-green">↑</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-sentiment-positive/30 rounded-xl">
                        <span className="text-sm font-medium">Positive Feedback</span>
                        <span className="font-bold text-green-700">850</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-sentiment-neutral/30 rounded-xl">
                        <span className="text-sm font-medium">Neutral Feedback</span>
                        <span className="font-bold text-gray-700">200</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-sentiment-negative/30 rounded-xl">
                        <span className="text-sm font-medium">Improvement Areas</span>
                        <span className="font-bold text-red-700">150</span>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-accent-yellow/10 to-orange/10 rounded-2xl border-2 border-accent-yellow/20">
                      <div className="text-center">
                        <div className="text-4xl font-black text-gray-900 mb-1">1,250</div>
                        <div className="text-sm text-gray-600">Total responses this month</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section bg-white/50">
          <div className="container-custom">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Everything you need for{' '}
                <span className="bg-gradient-to-r from-accent-yellow to-orange bg-clip-text text-transparent">
                  better feedback
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features designed to make peer feedback effortless and actionable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Feature 
                Icon={CheckCircle} 
                title="Anonymous by Design" 
                desc="Feedback is completely anonymous by default, ensuring honest and authentic responses from your team."
                delay="0"
              />
              <Feature 
                Icon={BarChart2} 
                title="Visual Analytics" 
                desc="Beautiful dashboards that visualize trends, sentiment analysis, and actionable insights at a glance."
                delay="100"
              />
              <Feature 
                Icon={Users} 
                title="Team-Friendly" 
                desc="Quick setup for teams of any size. Onboard in minutes, not hours. Perfect for remote and hybrid teams."
                delay="200"
              />
              <Feature 
                Icon={Lock} 
                title="Enterprise Security" 
                desc="Bank-level encryption with data encrypted in transit and at rest. GDPR compliant and SOC 2 certified."
                delay="300"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Loved by teams worldwide
              </h2>
              <p className="text-xl text-gray-600">
                See what people are saying about PeerPulse
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Testimonial
                name="Samantha Chen"
                role="Engineering Manager @ TechCorp"
                quote="PeerPulse transformed how our team communicates. The anonymous feedback helped us surface issues we never knew existed and improved our retrospectives significantly."
                delay="0"
              />
              <Testimonial
                name="Ravi Kumar"
                role="HR Lead @ InnovateCo"
                quote="Setup was incredibly fast and our admins love the analytics dashboard. The sentiment analysis helps us identify trends and take action before small issues become big problems."
                delay="100"
              />
              <Testimonial
                name="Lina Martinez"
                role="Product Designer @ DesignHub"
                quote="The anonymous mode increases response rates dramatically. We went from 30% to 95% participation. The insights are incredibly valuable for our product development process."
                delay="200"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section">
          <div className="container-custom">
            <div className="glass-strong rounded-3xl p-12 md:p-16 text-center shadow-strong relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/10 via-orange/10 to-accent-yellow/10"></div>
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                  Ready to hear honest feedback?
                </h3>
                <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                  Join thousands of teams using PeerPulse to build stronger, more connected workplaces
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => onNavigate('register')} 
                    className="btn-primary text-lg"
                  >
                    Create account — Free forever
                  </button>
                  <button 
                    onClick={() => onNavigate('login')} 
                    className="btn-secondary text-lg"
                  >
                    Admin login
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-6">
                  No credit card required • 2 minute setup • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 border-t border-gray-200 mt-auto">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-yellow to-accent-yellow-dark flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-sm text-gray-600">
                © {new Date().getFullYear()} PeerPulse. Built with care for better teams.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Twitter className="w-5 h-5 text-gray-600 hover:text-accent-yellow cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-gray-600 hover:text-accent-yellow cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-600 hover:text-accent-yellow cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;