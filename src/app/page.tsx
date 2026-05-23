import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { modules } from '@/lib/modules'

export default function Home() {
  const moduleList = Object.values(modules)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Nav */}
      <nav className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">☁️</span>
          <span className="font-bold text-white text-lg">Azure Decision Helper</span>
        </div>
        <span className="text-slate-500 text-sm">Beta</span>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700 rounded-full px-4 py-1.5 text-blue-300 text-sm mb-8">
          <Zap size={14} />
          Powered by Azure CAF + Claude AI
        </div>

        <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
          Make the right Azure
          <br />
          <span className="text-blue-400">architecture decisions</span>
          <br />
          before you build
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Answer a few questions about your organisation, workload, and goals. Get a concrete, opinionated recommendation — backed by the Microsoft Cloud Adoption Framework and real-world Azure expertise.
        </p>

        <Link
          href={`/assess/${moduleList[0].id}`}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg transition-colors"
        >
          Start your assessment
          <ArrowRight size={20} />
        </Link>
      </section>

      {/* Feature pills */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { icon: '⏱️', label: '< 5 minutes', sub: 'per assessment' },
            { icon: '🏗️', label: 'CAF-aligned', sub: 'recommendations' },
            { icon: '📄', label: 'Export to Markdown', sub: 'or ADR format' },
          ].map((f) => (
            <div key={f.label} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="font-semibold text-white text-sm">{f.label}</div>
              <div className="text-slate-500 text-xs">{f.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-white mb-2">Choose an assessment</h2>
        <p className="text-slate-400 mb-8">Each module covers a distinct architectural decision area.</p>

        <div className="grid md:grid-cols-2 gap-5">
          {moduleList.map((module) => (
            <Link
              key={module.id}
              href={`/assess/${module.id}`}
              className="group bg-slate-800/60 border border-slate-700 hover:border-blue-500 rounded-2xl p-6 transition-all hover:bg-slate-800"
            >
              <div className="text-4xl mb-4">{module.emoji}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {module.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{module.tagline}</p>
              <div className="flex items-center gap-1.5 text-blue-400 text-sm font-medium">
                Start assessment
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-6 text-center text-slate-600 text-sm">
        Built for Azure architects and platform engineers. Not affiliated with Microsoft.
      </footer>
    </div>
  )
}
